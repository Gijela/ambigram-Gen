import { create } from 'zustand';
import { AmbigramConfig, GenerationResult } from '../ambigram/types';
import { AmbigramEngine } from '../ambigram/engine';

interface AmbigramState {
  // Input state
  inputText: string;
  inputText2: string; // Added second input field
  selectedFont: string;
  fontSize: number;
  color: string;
  strokeWidth: number;
  letterSpacing: number;
  
  // Generation state
  isGenerating: boolean;
  generationResult: GenerationResult | null;
  error: string | null;
  
  // UI state
  showPreview: boolean;
  showCustomization: boolean;
  previewRotated: boolean;
  
  // History
  history: GenerationResult[];
  
  // Actions
  setInputText: (text: string) => void;
  setInputText2: (text: string) => void; // Added setter for second input field
  setSelectedFont: (font: string) => void;
  setFontSize: (size: number) => void;
  setColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setLetterSpacing: (spacing: number) => void;
  
  generateAmbigram: () => Promise<void>;
  clearResult: () => void;
  togglePreview: () => void;
  toggleCustomization: () => void;
  toggleRotation: () => void;
  
  addToHistory: (result: GenerationResult) => void;
  clearHistory: () => void;
  
  // Preset configurations
  applyPreset: (preset: string) => void;
  resetToDefaults: () => void;
}

const engine = new AmbigramEngine();

export const useAmbigramStore = create<AmbigramState>((set, get) => ({
  // Initial state
  inputText: '',
  inputText2: '', // Added initial state for second input field
  selectedFont: 'default',
  fontSize: 48,
  color: '#000000',
  strokeWidth: 1,
  letterSpacing: 0,
  
  isGenerating: false,
  generationResult: null,
  error: null,
  
  showPreview: true,
  showCustomization: false,
  previewRotated: false,
  
  history: [],
  
  // Input Actions
  setInputText: (text) => set({ inputText: text, error: null }),
  setInputText2: (text) => set({ inputText2: text, error: null }), // Added setter for second input field
  setSelectedFont: (font) => set({ selectedFont: font }),
  setFontSize: (size) => set({ fontSize: size }),
  setColor: (color) => set({ color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
  
  // Generation Action
  generateAmbigram: async () => {
    const state = get();
    
    // Validate input
    const validation = engine.validateInput(state.inputText);
    if (!validation.valid) {
      set({ error: validation.error });
      return;
    }
    
    set({ isGenerating: true, error: null });
    
    try {
      // Add minimum delay to ensure user can see Loading state
      const startTime = Date.now();

      // 🔥 Modified: Always use vertical ambigram mode, even if second input field is empty
      const finalInputText = `${state.inputText.trim()}|${state.inputText2.trim()}`;
      
      const config: AmbigramConfig = {
        inputText: finalInputText,
        fontFamily: state.selectedFont,
        fontSize: state.fontSize,
        color: state.color,
        strokeWidth: state.strokeWidth,
        letterSpacing: state.letterSpacing,
        style: {
          name: state.selectedFont,
          category: 'modern' as any,
          file: '',
          letterMappings: {}
        }
      };
      
      const result = await engine.generateAmbigram(config);
      
      
      // Ensure Loading state is shown for at least 1.5 seconds, let user feel the generation process
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 1500; // 1.5 seconds
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
      }
      
      if (result.success) {
        set({
          generationResult: result,
          showPreview: true
        });
        
        // Add to history
        get().addToHistory(result);
      } else {
        set({ error: result.error });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Generation failed, please try again'
      });
    } finally {
      set({ isGenerating: false });
    }
  },
  
  // UI Actions
  clearResult: () => set({ 
    generationResult: null, 
    error: null,
    showPreview: false 
  }),
  
  togglePreview: () => set((state) => ({ 
    showPreview: !state.showPreview 
  })),
  
  toggleCustomization: () => set((state) => ({ 
    showCustomization: !state.showCustomization 
  })),
  
  toggleRotation: () => set((state) => ({ 
    previewRotated: !state.previewRotated 
  })),
  
  // History Actions
  addToHistory: (result) => set((state) => ({
    history: [result, ...state.history.slice(0, 9)] // Keep latest 10
  })),
  
  clearHistory: () => set({ history: [] }),
  
  // Preset configurations
  applyPreset: (preset) => {
    const presets: Record<string, Partial<AmbigramState>> = {
      romantic: {
        selectedFont: 'script',
        color: '#ff69b4',
        fontSize: 52,
        strokeWidth: 1.5
      },
      family: {
        selectedFont: 'modern',
        color: '#2c3e50',
        fontSize: 48,
        strokeWidth: 2
      },
      gothic: {
        selectedFont: 'gothic',
        color: '#000000',
        fontSize: 56,
        strokeWidth: 2.5
      },
      elegant: {
        selectedFont: 'elegant',
        color: '#8b4513',
        fontSize: 50,
        strokeWidth: 1
      },
      bold: {
        selectedFont: 'bold',
        color: '#1a1a1a',
        fontSize: 54,
        strokeWidth: 3
      }
    };
    
    const presetConfig = presets[preset];
    if (presetConfig) {
      set(presetConfig);
    }
  },
  
  resetToDefaults: () => set({
    selectedFont: 'modern',
    fontSize: 48,
    color: '#000000',
    strokeWidth: 1,
    letterSpacing: 0,
    showCustomization: false,
    previewRotated: false
  })
}));

// Selector functions for performance optimization
export const selectInputState = (state: AmbigramState) => ({
  inputText: state.inputText,
  selectedFont: state.selectedFont,
  fontSize: state.fontSize,
  color: state.color,
  strokeWidth: state.strokeWidth,
  letterSpacing: state.letterSpacing
});

export const selectGenerationState = (state: AmbigramState) => ({
  isGenerating: state.isGenerating,
  generationResult: state.generationResult,
  error: state.error
});

export const selectUIState = (state: AmbigramState) => ({
  showPreview: state.showPreview,
  showCustomization: state.showCustomization,
  previewRotated: state.previewRotated
});