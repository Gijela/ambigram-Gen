// Web Worker for ambigram generation
// Used to handle complex ambigram generation tasks, avoiding blocking the main thread

import { AmbigramConfig, GenerationResult, LetterPair } from '../ambigram/types';

// Worker message type definitions
interface WorkerMessage {
  type: 'GENERATE_AMBIGRAM' | 'VALIDATE_INPUT' | 'GET_STATS';
  payload: any;
  id: string;
}

interface WorkerResponse {
  type: 'SUCCESS' | 'ERROR';
  payload: any;
  id: string;
}

// Simplified AmbigramEngine (for Worker)
class WorkerAmbigramEngine {
  /**
   * Generate ambigram
   */
  async generateAmbigram(config: AmbigramConfig): Promise<GenerationResult> {
    try {
      // Parse input text to get word1 and word2
      const { word1, word2 } = this.parseInputText(config.inputText);
      
      // Create letter mappings
      const letterPairs = this.createLetterMappings(word1, word2);

      // Generate SVG
      const svg = this.renderToSVG(letterPairs, config);
      
      return {
        svg,
        success: true,
        metadata: {
          word1: word1,
          word2: word2,
          fontUsed: config.fontFamily,
          generatedAt: new Date(),
          mappings: letterPairs
        }
      };
    } catch (error) {
      return {
        svg: '',
        success: false,
        error: error instanceof Error ? error.message : 'Generation failed',
        metadata: {
          word1: word1,
          word2: word2,
          fontUsed: config.fontFamily,
          generatedAt: new Date(),
          mappings: []
        }
      };
    }
  }

  /**
   * Parse input text to extract word1 and word2
   */
  private parseInputText(inputText: string): { word1: string; word2: string } {
    // Support multiple separators: space, comma, slash, pipe, etc.
    const separators = [' / ', '/', ' | ', '|', ', ', ',', '  ', ' '];
    
    for (const separator of separators) {
      if (inputText.includes(separator)) {
        const parts = inputText.split(separator).map(part => part.trim());
        if (parts.length >= 2) {
          return { word1: parts[0], word2: parts[1] };
        }
      }
    }
    
    // If no separator found, treat as single word (symmetric ambigram)
    const trimmed = inputText.trim();
    return { word1: trimmed, word2: trimmed };
  }

  /**
   * Create letter mappings
   */
  private createLetterMappings(word1: string, word2: string): LetterPair[] {
    const len1 = word1.length;
    const len2 = word2.length;

    if (len1 === len2) {
      return this.oneToOneMapping(word1, word2);
    } else if (len1 > len2) {
      return this.oneToManyMapping(word1, word2);
    } else {
      return this.manyToOneMapping(word1, word2);
    }
  }

  /**
   * One-to-one mapping
   */
  private oneToOneMapping(word1: string, word2: string): LetterPair[] {
    const pairs: LetterPair[] = [];
    
    for (let i = 0; i < word1.length; i++) {
      pairs.push({
        letter1: word1[i],
        letter2: word2[word2.length - 1 - i],
        mappingType: 'oneToOne'
      });
    }

    return pairs;
  }

  /**
   * One-to-many mapping
   */
  private oneToManyMapping(longerWord: string, shorterWord: string): LetterPair[] {
    const pairs: LetterPair[] = [];
    const ratio = longerWord.length / shorterWord.length;
    
    for (let i = 0; i < shorterWord.length; i++) {
      const startIdx = Math.floor(i * ratio);
      const endIdx = Math.floor((i + 1) * ratio);
      const combinedLetters = longerWord.slice(startIdx, endIdx);
      
      pairs.push({
        letter1: combinedLetters,
        letter2: shorterWord[shorterWord.length - 1 - i],
        mappingType: 'oneToMany',
        transformations: {
          scale: 1 / combinedLetters.length,
          offset: { x: 0, y: 0 }
        }
      });
    }

    return pairs;
  }

  /**
   * Many-to-one mapping
   */
  private manyToOneMapping(shorterWord: string, longerWord: string): LetterPair[] {
    const pairs: LetterPair[] = [];
    const ratio = longerWord.length / shorterWord.length;
    
    for (let i = 0; i < longerWord.length; i++) {
      const sourceIdx = Math.floor(i / ratio);
      const sourceLetter = shorterWord[Math.min(sourceIdx, shorterWord.length - 1)];
      
      pairs.push({
        letter1: longerWord[i],
        letter2: sourceLetter,
        mappingType: 'manyToOne',
        transformations: {
          scale: ratio > 2 ? 0.8 : 1,
          offset: { x: 0, y: 0 }
        }
      });
    }

    return pairs;
  }

  /**
   * Render SVG
   */
  private renderToSVG(letterPairs: LetterPair[], config: AmbigramConfig): string {
    const width = 400;
    const height = 200;
    const centerY = height / 2;
    
    let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add gradient definitions
    svgContent += `
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${config.color};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${this.adjustColor(config.color, 20)};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${config.color};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;
    
    // Add background
    svgContent += `<rect width="100%" height="100%" fill="transparent"/>`;

    // Render letter pairs
    const letterWidth = width / letterPairs.length;
    letterPairs.forEach((pair, index) => {
      const x = index * letterWidth + letterWidth / 2;
      
      // Forward letter
      svgContent += `<text x="${x}" y="${centerY - 20}"
        text-anchor="middle" 
        font-family="${config.fontFamily}" 
        font-size="${config.fontSize}" 
        fill="url(#textGradient)" 
        stroke-width="${config.strokeWidth}"
        filter="url(#glow)">
        ${pair.letter1}
      </text>`;
      
      // Reverse letter (rotated 180 degrees)
      svgContent += `<text x="${x}" y="${centerY + 40}"
        text-anchor="middle" 
        font-family="${config.fontFamily}" 
        font-size="${config.fontSize}" 
        fill="url(#textGradient)" 
        stroke-width="${config.strokeWidth}"
        filter="url(#glow)"
        transform="rotate(180 ${x} ${centerY + 40})">
        ${pair.letter2}
      </text>`;
    });
    
    svgContent += '</svg>';
    return svgContent;
  }

  /**
   * Adjust color brightness
   */
  private adjustColor(color: string, amount: number): string {
    // Simple color adjustment logic
    if (color.startsWith('#')) {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * amount);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    return color;
  }

  /**
   * Validate input
   */
  validateInput(word1: string, word2: string): { valid: boolean; error?: string } {
    if (!word1 || !word2) {
      return { valid: false, error: 'Please enter two words' };
    }
    
    if (word1.length > 20 || word2.length > 20) {
      return { valid: false, error: 'Word length cannot exceed 20 characters' };
    }
    
    const validChars = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if (!validChars.test(word1) || !validChars.test(word2)) {
      return { valid: false, error: 'Only English letters and Chinese characters are supported' };
    }
    
    return { valid: true };
  }

  /**
   * Get generation statistics
   */
  getGenerationStats(word1: string, word2: string) {
    const lengthDiff = Math.abs(word1.length - word2.length);
    const totalLength = word1.length + word2.length;
    const uniqueChars = new Set((word1 + word2).toLowerCase()).size;
    const complexity = (totalLength * 0.3) + (lengthDiff * 0.4) + (uniqueChars * 0.3);
    
    return {
      complexity,
      strategy: lengthDiff === 0 ? 'direct' : lengthDiff <= 2 ? 'padding' : 'compression',
      estimatedTime: Math.max(1, Math.ceil(complexity / 2)),
      qualityScore: Math.max(60, 100 - lengthDiff * 5)
    };
  }
}

// Worker instance
const workerEngine = new WorkerAmbigramEngine();

// Listen to main thread messages
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { type, payload, id } = event.data;
  
  try {
    let result: any;
    
    switch (type) {
      case 'GENERATE_AMBIGRAM':
        result = await workerEngine.generateAmbigram(payload);
        break;
        
      case 'VALIDATE_INPUT':
        result = workerEngine.validateInput(payload.word1, payload.word2);
        break;
        
      case 'GET_STATS':
        result = workerEngine.getGenerationStats(payload.word1, payload.word2);
        break;
        
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
    
    // Send success response
    const response: WorkerResponse = {
      type: 'SUCCESS',
      payload: result,
      id
    };
    
    self.postMessage(response);
    
  } catch (error) {
    // Send error response
    const response: WorkerResponse = {
      type: 'ERROR',
      payload: {
        error: error instanceof Error ? error.message : 'Processing failed'
      },
      id
    };
    
    self.postMessage(response);
  }
});

// Export types (for TypeScript)
export type { WorkerMessage, WorkerResponse };