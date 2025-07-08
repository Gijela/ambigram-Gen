// Core type definitions for ambigram generator

export interface LetterPair {
  letter1: string;
  letter2: string;
  mappingType: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'ambigram' | 'true_ambigram';
  sharedStrokes?: string[];
  transformations?: {
    rotation?: number;
    scale?: number;
    offset?: { x: number; y: number };
  };
  designInfo?: {
    position: number;
    isForwardPrimary: boolean;
    isReversePrimary: boolean;
    elementType: string;
  };
}

export interface AmbigramConfig {
  inputText: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  strokeWidth: number;
  letterSpacing: number;
  style: FontStyle;
}

export interface FontStyle {
  name: string;
  category: 'default' | 'tech' | 'royal' | 'explosive' | 'cyberpunk' | 'elegant' | 'modern' | 'chinese' | 'calligraphy' | 'artistic' | 'ancient' | 'cartoon' | 'chalk' | 'gothic' | 'script' | 'bold';
  file: string;
  letterMappings: Record<string, LetterMapping>;
}

export interface LetterMapping {
  paths: string[];
  width: number;
  height: number;
  baseline: number;
  reversible: boolean;
  compatibleWith: string[];
}

export interface GenerationResult {
  svg: string;
  success: boolean;
  error?: string;
  metadata: {
    word1: string;
    word2: string;
    fontUsed: string;
    generatedAt: Date;
    mappings: LetterPair[];
  };
}

export interface ExportOptions {
  format?: 'png' | 'svg' | 'pdf';
  resolution?: number;
  transparent?: boolean;
  quality?: number;
}