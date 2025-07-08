// Worker Manager for handling Web Worker communication
// Manages Web Worker communication and task scheduling

import type { AmbigramConfig, GenerationResult } from '../ambigram/types';
import type { WorkerMessage, WorkerResponse } from './ambigramWorker';

interface PendingTask {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  timestamp: number;
}

export class WorkerManager {
  private worker: Worker | null = null;
  private pendingTasks = new Map<string, PendingTask>();
  private taskCounter = 0;
  private isInitialized = false;

  /**
   * Initialize Worker
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create Worker instance
      this.worker = new Worker(
        new URL('./ambigramWorker.ts', import.meta.url),
        { type: 'module' }
      );

      // Listen to Worker messages
      this.worker.addEventListener('message', this.handleWorkerMessage.bind(this));

      // Listen to Worker errors
      this.worker.addEventListener('error', this.handleWorkerError.bind(this));

      this.isInitialized = true;
      console.log('🚀 AmbigramWorker initialized successfully');
      
    } catch (error) {
      console.warn('⚠️ Failed to initialize Worker, falling back to main thread:', error);
      this.worker = null;
    }
  }

  /**
   * Handle Worker messages
   */
  private handleWorkerMessage(event: MessageEvent<WorkerResponse>) {
    const { type, payload, id } = event.data;
    const task = this.pendingTasks.get(id);
    
    if (!task) {
      console.warn('Received response for unknown task:', id);
      return;
    }

    this.pendingTasks.delete(id);

    if (type === 'SUCCESS') {
      task.resolve(payload);
    } else {
      task.reject(new Error(payload.error || 'Worker task failed'));
    }
  }

  /**
   * Handle Worker errors
   */
  private handleWorkerError(error: ErrorEvent) {
    console.error('Worker error:', error);
    
    // Clean up all pending tasks
    this.pendingTasks.forEach(task => {
      task.reject(new Error('Worker encountered an error'));
    });
    this.pendingTasks.clear();
  }

  /**
   * Send task to Worker
   */
  private async sendTask<T>(type: WorkerMessage['type'], payload: any): Promise<T> {
    if (!this.worker) {
      throw new Error('Worker not available');
    }

    const id = `task_${++this.taskCounter}_${Date.now()}`;
    
    return new Promise<T>((resolve, reject) => {
      // Set timeout
      const timeout = setTimeout(() => {
        this.pendingTasks.delete(id);
        reject(new Error('Worker task timeout'));
      }, 30000); // 30 seconds timeout

      // Store task
      this.pendingTasks.set(id, {
        resolve: (value) => {
          clearTimeout(timeout);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        },
        timestamp: Date.now()
      });

      // Send message to Worker
      const message: WorkerMessage = { type, payload, id };
      this.worker!.postMessage(message);
    });
  }

  /**
   * Generate ambigram (using Worker)
   */
  async generateAmbigram(config: AmbigramConfig): Promise<GenerationResult> {
    await this.initialize();
    
    if (!this.worker) {
      throw new Error('Worker not available');
    }

    return this.sendTask<GenerationResult>('GENERATE_AMBIGRAM', config);
  }

  /**
   * Validate input (using Worker)
   */
  async validateInput(word1: string, word2: string): Promise<{ valid: boolean; error?: string }> {
    await this.initialize();
    
    if (!this.worker) {
      throw new Error('Worker not available');
    }

    return this.sendTask('VALIDATE_INPUT', { word1, word2 });
  }

  /**
   * Get generation statistics (using Worker)
   */
  async getGenerationStats(word1: string, word2: string): Promise<any> {
    await this.initialize();
    
    if (!this.worker) {
      throw new Error('Worker not available');
    }

    return this.sendTask('GET_STATS', { word1, word2 });
  }

  /**
   * Check if Worker is available
   */
  isWorkerAvailable(): boolean {
    return this.worker !== null && this.isInitialized;
  }

  /**
   * Get pending tasks count
   */
  getPendingTaskCount(): number {
    return this.pendingTasks.size;
  }

  /**
   * Clean up timeout tasks
   */
  cleanupTimeoutTasks(): void {
    const now = Date.now();
    const timeout = 60000; // 1 minute timeout

    // Use Array.from to avoid iterator issues
    const entries = Array.from(this.pendingTasks.entries());
    for (const [id, task] of entries) {
      if (now - task.timestamp > timeout) {
        task.reject(new Error('Task timeout'));
        this.pendingTasks.delete(id);
      }
    }
  }

  /**
   * Destroy Worker
   */
  destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }

    // Clean up all pending tasks
    this.pendingTasks.forEach(task => {
      task.reject(new Error('Worker manager destroyed'));
    });
    this.pendingTasks.clear();
    
    this.isInitialized = false;
  }
}

// Singleton instance
export const workerManager = new WorkerManager();

// Cleanup timer
if (typeof window !== 'undefined') {
  setInterval(() => {
    workerManager.cleanupTimeoutTasks();
  }, 30000); // Clean every 30 seconds

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    workerManager.destroy();
  });
}