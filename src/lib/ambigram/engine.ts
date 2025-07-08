import { AmbigramConfig, LetterPair, GenerationResult, LetterMapping } from './types';
import { FontLibrary } from './fontLibrary';
import { workerManager } from '../workers/workerManager';
import { ambigramCache } from '../cache/ambigramCache';

export class AmbigramEngine {
  private fontLibrary: FontLibrary;

  constructor() {
    this.fontLibrary = new FontLibrary();
  }

  /**
   * Main method for generating ambigrams
   * This is the core algorithm for solving the "different length words" problem
   */
  async generateAmbigram(config: AmbigramConfig): Promise<GenerationResult> {
    // 1. Check cache
    const cachedResult = ambigramCache.get(config);
    if (cachedResult) {
      return cachedResult;
    }

    try {
      // 2. Try using Worker for generation (if available)
      if (workerManager.isWorkerAvailable()) {
        try {
          const result = await workerManager.generateAmbigram(config);
          // Cache result
          ambigramCache.set(config, result);
          return result;
        } catch (workerError) {
          console.warn('Worker generation failed, falling back to main thread:', workerError);
        }
      }

      // 3. Main thread generation (fallback)
      const result = await this.generateAmbigramMainThread(config);

      // 4. Cache result
      ambigramCache.set(config, result);
      
      return result;
    } catch (error) {
      return {
        svg: '',
        success: false,
        error: error instanceof Error ? error.message : 'Generation failed',
        metadata: {
          word1: config.inputText,
          word2: '',
          fontUsed: config.fontFamily,
          generatedAt: new Date(),
          mappings: []
        }
      };
    }
  }

  /**
   * Main thread ambigram generation (original logic)
   */
  private async generateAmbigramMainThread(config: AmbigramConfig): Promise<GenerationResult> {
    // 1. Get font information
    const fontStyle = this.fontLibrary.getFontStyle(config.fontFamily);
    if (!fontStyle) {
      throw new Error(`Font ${config.fontFamily} not found`);
    }

    // 2. Parse input text
    const { word1, word2 } = this.parseInputText(config.inputText);

    // 3. Create letter mappings - this is the core innovation
    const letterPairs = this.createLetterMappings(word1, word2, fontStyle);

    // 4. Calculate adaptive font size
    const adaptiveFontSize = this.calculateAdaptiveFontSize(config.inputText, config.fontSize);
    const adaptiveConfig = { ...config, fontSize: adaptiveFontSize };

    // 5. Generate SVG
    const svg = this.renderToSVG(letterPairs, adaptiveConfig);

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
  }

  /**
   * Core algorithm: Create true ambigram design
   * Core principle of ambigrams: Create a complete artistic lettering design that reads as word1 forward and word2 when rotated 180 degrees
   */
  private createLetterMappings(word1: string, word2: string, fontStyle: any): LetterPair[] {
    // True ambigrams are complete artistic designs, not simple letter mappings
    // Return a marker indicating this is a holistic design
    return [{
      letter1: word1,
      letter2: word2,
      mappingType: 'true_ambigram',
      transformations: {
        rotation: 180,
        scale: 1,
        offset: { x: 0, y: 0 }
      }
    }];
  }

  /**
   * Create true ambigram design
   * Core principle: Design an artistic lettering that reads as complete word1 forward and complete word2 when rotated 180 degrees
   */
  private createTrueAmbigramDesign(word1: string, word2: string): LetterPair[] {
    // Return holistic design marker
    return [{
      letter1: word1,
      letter2: word2,
      mappingType: 'true_ambigram',
      transformations: {
        rotation: 180,
        scale: 1,
        offset: { x: 0, y: 0 }
      }
    }];
  }

  /**
   * Create ambigram design elements
   * Each element is part of the holistic design, contributing to both word displays simultaneously
   */
  private createAmbigramElement(word1: string, word2: string, position: number, totalLength: number): LetterPair | null {
    // Forward position (reading word1 left to right)
    const forwardPos = position;
    // Reverse position (reading word2 left to right after 180° rotation)
    const reversePos = totalLength - 1 - position;

    // Get letters at corresponding positions
    const forwardLetter = forwardPos < word1.length ? word1[forwardPos] : '';
    const reverseLetter = reversePos < word2.length ? word2[reversePos] : '';
    
    // Skip if both positions have no letters
    if (!forwardLetter && !reverseLetter) {
      return null;
    }
    
    // Create design element
    return {
      letter1: forwardLetter || ' ', // Letter read forward
      letter2: reverseLetter || ' ', // Letter read in reverse
      mappingType: 'ambigram', // Mark as ambigram element
      transformations: {
        rotation: 180,
        scale: 1,
        offset: { x: 0, y: 0 }
      },
      // Add additional design information
      designInfo: {
        position: position,
        isForwardPrimary: !!forwardLetter,
        isReversePrimary: !!reverseLetter,
        elementType: this.determineElementType(forwardLetter, reverseLetter)
      }
    };
  }

  /**
   * Determine design element type
   */
  private determineElementType(forwardLetter: string, reverseLetter: string): string {
    if (forwardLetter && reverseLetter) {
      return 'dual'; // Dual letter element
    } else if (forwardLetter) {
      return 'forward'; // Forward letter only
    } else if (reverseLetter) {
      return 'reverse'; // Reverse letter only
    }
    return 'empty'; // Empty element
  }

  /**
   * Get symmetric version or best alternative of letter
   * This is the core of ambigram design: finding letter forms that remain readable after 180° rotation
   */
  private getSymmetricLetter(letter: string): string {
    const symmetricMap: Record<string, string> = {
      // Completely symmetric letters
      'o': 'o', 'O': 'O',
      'x': 'x', 'X': 'X',
      'i': 'i', 'I': 'I',
      'l': 'l', 'L': 'L',
      's': 's', 'S': 'S',
      'z': 'z', 'Z': 'Z',
      
      // Approximately symmetric or convertible letters
      'n': 'u', 'u': 'n',
      'N': 'U', 'U': 'N',
      'b': 'q', 'q': 'b',
      'd': 'p', 'p': 'd',
      'h': 'y', 'y': 'h',
      'w': 'm', 'm': 'w',
      'W': 'M', 'M': 'W',
      
      // Symmetric mapping for numbers
      '6': '9', '9': '6',
      '0': '0',
      '1': '1',
      '8': '8',
      
      // Other letters use similar shapes
      'a': 'e', 'e': 'a',
      'A': 'V', 'V': 'A',
      'c': 'c', 'C': 'C',
      'f': 't', 't': 'f',
      'g': 'b', 'r': 'r',
      'j': 'r', 'k': 'k',
      'v': 'v', 'Y': 'Y'
    };
    
    return symmetricMap[letter] || letter;
  }

  /**
   * Render letter mappings as true ambigram SVG
   * Core principle: Create a complete artistic lettering design that reads as word1 forward and word2 when rotated 180°
   */
  private renderToSVG(letterPairs: LetterPair[], config: AmbigramConfig): string {
    const width = 400;
    const height = 200;
    const centerY = height / 2;
    
    let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // 🔥 Fix: Get font effects and add to SVG definitions
    const fontEffects = this.getFontSpecificEffects(config.fontFamily, config.fontSize);

    // Add enhanced gradient and filter definitions
    svgContent += `
      <defs>
        ${fontEffects.gradients}
        ${fontEffects.filters}
        ${fontEffects.patterns}
        
        <!-- Keep original basic definitions as fallback -->
        <linearGradient id="ambigramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${config.color};stop-opacity:1" />
          <stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${config.color};stop-opacity:1" />
        </linearGradient>
        <filter id="ambigramGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;
    
    // Add background
    svgContent += `<rect width="100%" height="100%" fill="transparent"/>`;

    // Parse input text
    const { word1, word2 } = this.parseInputText(config.inputText);

    // 🔥 Core improvement: Render true ambigram artwork
    const ambigramArt = this.createTrueAmbigramArt(word1, word2, config);
    svgContent += ambigramArt;
    
    // Remove all indicator elements, keep only pure ambigram
    
    svgContent += '</svg>';
    return svgContent;
  }

  /**
   * Create true ambigram artwork
   * Core principle: Design a complete artistic lettering that reads as word1 forward and word2 when rotated 180°
   */
  private createTrueAmbigramArt(word1: string, word2: string, config: AmbigramConfig): string {
    const centerX = 200;
    const centerY = 100;
    
    // Calculate font size
    const maxLength = Math.max(word1.length, word2.length);
    const fontSize = Math.min(config.fontSize, 300 / maxLength);
    
    // 🔥 Fix: Get font effects to ensure generated result also has font effects
    const fontEffects = this.getFontSpecificEffects(config.fontFamily, fontSize);

    // 🔥 Check if vertical ambigram mode (identified by | separator)
    if (config.inputText.includes('|')) {
      return this.createVerticalAmbigram(word1, word2, centerX, centerY, fontSize, config, fontEffects);
    }
    
    // 🔥 Core innovation: Create true ambigram - dual layer design
    return this.createDualLayerAmbigram(word1, word2, centerX, centerY, fontSize, config, fontEffects);
  }

  /**
   * Create true ambigram design
   * Core principle: Create a word design that remains readable after 180° rotation
   * Supports single word or multiple word combinations
   */
  private createDualLayerAmbigram(word1: string, word2: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig, fontEffects?: any): string {
    // Increase font size for better visibility
    const enhancedFontSize = fontSize * 1.5;

    // If both words are the same, create single word ambigram
    if (word1.toLowerCase() === word2.toLowerCase()) {
      return this.createSingleWordAmbigram(word1, centerX, centerY, enhancedFontSize, config, fontEffects);
    }
    
    // If words are different, create dual word combination ambigram
    return this.createDualWordAmbigram(word1, word2, centerX, centerY, enhancedFontSize, config, fontEffects);
  }

  /**
   * Create single word ambigram (e.g., Peace rotated 180° still reads Peace)
   */
  private createSingleWordAmbigram(word: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig, fontEffects?: any): string {
    // Calculate text layout
    const textWidth = word.length * fontSize * 0.8;
    const startX = centerX - textWidth / 2;
    
    // Create rotatable word design
    const wordDesign = this.createRotatableWord(word, startX, centerY, fontSize, config, fontEffects);
    
    return `
      <g class="single-word-ambigram" data-word="${word}">
        ${wordDesign}
      </g>
    `;
  }

  /**
   * Create dual word combination ambigram (e.g., Hope/Faith combination)
   */
  private createDualWordAmbigram(word1: string, word2: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig, fontEffects?: any): string {
    // Calculate layout - arrange two words horizontally, closely spaced
    const spacing = fontSize * 0.2; // Reduce spacing
    const word1Width = word1.length * fontSize * 0.6;
    const word2Width = word2.length * fontSize * 0.6;
    const totalWidth = word1Width + word2Width + spacing;
    
    // Calculate position for each word
    const word1X = centerX - totalWidth / 2 + word1Width / 2;
    const word2X = centerX + totalWidth / 2 - word2Width / 2;
    
    // Create first word
    const word1Design = this.createRotatableWord(word1, word1X, centerY, fontSize * 0.9, config, fontEffects);

    // Create second word
    const word2Design = this.createRotatableWord(word2, word2X, centerY, fontSize * 0.9, config, fontEffects);

    // Remove separator, directly connect two words
    return `
      <g class="dual-word-ambigram" data-word1="${word1}" data-word2="${word2}">
        <!-- First word -->
        <g class="word-1">
          ${word1Design}
        </g>
        <!-- Second word -->
        <g class="word-2">
          ${word2Design}
        </g>
      </g>
    `;
  }

  /**
   * Create vertical ambigram - according to user expected style
   * Display first word above, second word rotated 180° below
   * 🔥 Modified: If second input field is empty, don't display bottom content
   */
  private createVerticalAmbigram(word1: string, word2: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig, fontEffects?: any): string {
    // Adjust font size for vertical layout
    const adjustedFontSize = fontSize * 0.8;
    const verticalSpacing = adjustedFontSize * 1.5;
    
    // 🔥 Check if second input field is empty
    const hasSecondText = word2 && word2.trim().length > 0;

    // Adjust position based on whether there's second text
    const upperY = hasSecondText ? centerY - verticalSpacing / 2 : centerY;
    const lowerY = centerY + verticalSpacing / 2;
    
    // Create upper text (normal display of first input field content)
    const fillColor = fontEffects?.fillColor || '#ffffff';
    const filter = fontEffects?.filter || 'url(#ambigramGlow)';
    const strokeColor = fontEffects?.strokeColor || 'none';
    const strokeWidth = fontEffects?.strokeWidth || '0';
    
    const upperText = `
      <text x="${centerX}" y="${upperY}"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Arial, sans-serif"
            font-size="${adjustedFontSize}"
            font-weight="bold"
            fill="${fillColor}"
            stroke="${strokeColor}"
            stroke-width="${strokeWidth}"
            opacity="0.95"
            filter="${filter}">
        ${word1.replaceAll('|', '')}
      </text>
    `;
    
    // 🔥 Only create lower text when second input field has content
    const lowerText = hasSecondText ? `
      <g transform="translate(${centerX}, ${lowerY}) rotate(180)">
        <text x="0" y="0"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="Arial, sans-serif"
              font-size="${adjustedFontSize}"
              font-weight="bold"
              fill="${fillColor}"
              stroke="${strokeColor}"
              stroke-width="${strokeWidth}"
              opacity="0.95"
              filter="${filter}">
          ${word2.replaceAll('|', '')}
        </text>
      </g>
    ` : '';
    
    return `
      <g class="vertical-ambigram" data-word1="${word1}" data-word2="${word2}" data-has-second="${hasSecondText}">
        <!-- Upper text (first input field content) -->
        <g class="upper-text">
          ${upperText}
        </g>
        <!-- Lower text (second input field content rotated 180°, only shown when has content) -->
        ${hasSecondText ? `<g class="lower-text">${lowerText}</g>` : ''}
      </g>
    `;
  }

  /**
   * Create vertically arranged text
   */
  private createVerticalText(text: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig, isFlipped: boolean): string {
    // If flipped text, create mirror effect
    const displayText = isFlipped ? this.createMirrorText(text) : text;
    const transform = isFlipped ? `scale(1, -1)` : '';
    
    return `
      <text x="${centerX}" y="${centerY}"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Arial, sans-serif"
            font-size="${fontSize}"
            font-weight="bold"
            fill="#ffffff"
            opacity="0.95"
            filter="url(#ambigramGlow)"
            transform="${transform}">
        ${displayText}
      </text>
    `;
  }

  /**
   * Create mirror text - horizontally flip the text
   */
  private createMirrorText(text: string): string {
    // Create character mirror mapping
    const mirrorMap: Record<string, string> = {
      'A': 'Ɐ', 'B': 'ᗺ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ᖴ', 'G': 'פ', 'H': 'H',
      'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '⅃', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
      'Q': 'Q', 'R': 'ᴿ', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
      'Y': '⅄', 'Z': 'Z',
      'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
      'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
      'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
      'y': 'ʎ', 'z': 'z'
    };
    
    // Reverse text and apply mirror mapping
    return text.split('').reverse().map(char => mirrorMap[char] || char).join('');
  }

  /**
   * Create rotatable word design
   */
  private createRotatableWord(word: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig, fontEffects?: any): string {
    // Use font effects rendering to ensure generated result matches preview
    const fillColor = fontEffects?.fillColor || '#ffffff';
    const filter = fontEffects?.filter || 'url(#ambigramGlow)';
    const strokeColor = fontEffects?.strokeColor || 'none';
    const strokeWidth = fontEffects?.strokeWidth || '0';
    
    return `
      <text x="${centerX}" y="${centerY}"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Arial, sans-serif"
            font-size="${fontSize}"
            font-weight="bold"
            fill="${fillColor}"
            stroke="${strokeColor}"
            stroke-width="${strokeWidth}"
            opacity="0.95"
            filter="${filter}">
        ${word.replaceAll('|', '')}
      </text>
    `;
  }

  /**
   * Create text layer - enhanced version with larger spacing
   */
  private createTextLayer(text: string, startX: number, centerY: number, fontSize: number, config: AmbigramConfig, layerId: string, rotation: number): string {
    const letterSpacing = fontSize * 1.0; // Increase letter spacing
    let textContent = '';

    // Create independent design for each letter
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const x = startX + i * letterSpacing;
      
      // Create artistic letter design
      const letterDesign = this.createArtisticLetter(letter, fontSize, config);
      
      textContent += `
        <g class="letter-${layerId}-${i}" transform="translate(${x}, ${centerY})">
          ${letterDesign}
        </g>
      `;
    }
    
    return textContent;
  }

  /**
   * Create artistic letter design - enhanced version, larger and clearer
   */
  private createArtisticLetter(letter: string, fontSize: number, config: AmbigramConfig): string {
    const strokeWidth = fontSize * 0.12; // Increase line width
    const halfSize = fontSize * 0.5; // Increase letter size

    // Create special artistic design based on letter
    switch (letter.toLowerCase()) {
      case 'h':
        return `
          <path d="M -${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} ${halfSize * 0.8}
                   M -${halfSize * 0.4} 0
                   L ${halfSize * 0.4} 0
                   M ${halfSize * 0.4} -${halfSize * 0.8}
                   L ${halfSize * 0.4} ${halfSize * 0.8}"
                fill="none" stroke="#ffffff"
                stroke-width="${strokeWidth}" stroke-linecap="round"
                filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 'o':
        return `
          <circle cx="0" cy="0" r="${halfSize * 0.6}"
                  fill="none" stroke="#ffffff"
                  stroke-width="${strokeWidth}" filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 'p':
        return `
          <path d="M -${halfSize * 0.3} -${halfSize * 0.8}
                   L -${halfSize * 0.3} ${halfSize * 0.8}
                   M -${halfSize * 0.3} -${halfSize * 0.8}
                   Q ${halfSize * 0.4} -${halfSize * 0.8} ${halfSize * 0.4} -${halfSize * 0.4}
                   Q ${halfSize * 0.4} 0 -${halfSize * 0.3} 0"
                fill="none" stroke="#ffffff"
                stroke-width="${strokeWidth}" stroke-linecap="round"
                filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 'e':
        return `
          <path d="M ${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} 0
                   L ${halfSize * 0.2} 0
                   M -${halfSize * 0.4} 0
                   L -${halfSize * 0.4} ${halfSize * 0.8}
                   L ${halfSize * 0.4} ${halfSize * 0.8}"
                fill="none" stroke="#ffffff"
                stroke-width="${strokeWidth}" stroke-linecap="round"
                filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 'f':
        return `
          <path d="M -${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} ${halfSize * 0.8}
                   M -${halfSize * 0.4} -${halfSize * 0.8}
                   L ${halfSize * 0.4} -${halfSize * 0.8}
                   M -${halfSize * 0.4} 0
                   L ${halfSize * 0.2} 0"
                fill="none" stroke="#ffffff"
                stroke-width="${strokeWidth}" stroke-linecap="round"
                filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 'a':
        return `
          <path d="M -${halfSize * 0.4} ${halfSize * 0.8}
                   L 0 -${halfSize * 0.8}
                   L ${halfSize * 0.4} ${halfSize * 0.8}
                   M -${halfSize * 0.2} ${halfSize * 0.2}
                   L ${halfSize * 0.2} ${halfSize * 0.2}"
                fill="none" stroke="#ffffff"
                stroke-width="${strokeWidth}" stroke-linecap="round"
                filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 'i':
        return `
          <line x1="0" y1="-${halfSize * 0.6}" x2="0" y2="${halfSize * 0.8}"
                stroke="#ffffff" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="url(#ambigramGlow)" opacity="0.95"/>
          <circle cx="0" cy="-${halfSize * 0.9}" r="${strokeWidth * 0.8}"
                  fill="#ffffff" filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      case 't':
        return `
          <line x1="0" y1="-${halfSize * 0.8}" x2="0" y2="${halfSize * 0.8}"
                stroke="#ffffff" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="url(#ambigramGlow)" opacity="0.95"/>
          <line x1="-${halfSize * 0.3}" y1="-${halfSize * 0.4}" x2="${halfSize * 0.3}" y2="-${halfSize * 0.4}"
                stroke="#ffffff" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="url(#ambigramGlow)" opacity="0.95"/>
        `;
      
      default:
        // For other letters, create generic artistic design
        return `
          <text x="0" y="${fontSize * 0.2}" text-anchor="middle"
                font-family="Arial, sans-serif" font-size="${fontSize * 0.9}"
                fill="#ffffff" filter="url(#ambigramGlow)"
                style="font-weight: bold;" opacity="0.95">${letter}</text>
        `;
    }
  }

  /**
   * Create ambigram letter design (keep original method for compatibility)
   * This is true ambigram: each letter is specially designed, reads as one letter forward, another when rotated 180°
   */
  private createAmbigramLetterDesign(word1: string, word2: string, centerX: number, centerY: number, fontSize: number, config: AmbigramConfig): string {
    // Use new dual layer design
    return this.createDualLayerAmbigram(word1, word2, centerX, centerY, fontSize, config);
  }

  /**
   * Create true ambigram letter
   * Core: Design an SVG path that reads as letter1 forward, letter2 when rotated 180°
   */
  private createTrueAmbigramLetter(letter1: string, letter2: string, fontSize: number): string {
    // If both letters are the same, create symmetric design
    if (letter1.toLowerCase() === letter2.toLowerCase()) {
      return this.createSymmetricAmbigramLetter(letter1, fontSize);
    }
    
    // Create dual-readable letter design
    return this.createDualAmbigramLetter(letter1, letter2, fontSize);
  }

  /**
   * Create symmetric ambigram letter
   */
  private createSymmetricAmbigramLetter(letter: string, fontSize: number): string {
    const strokeWidth = fontSize * 0.08;
    const halfSize = fontSize * 0.4;
    
    // Create symmetric SVG path based on letter
    switch (letter.toLowerCase()) {
      case 'o':
        return `
          <circle cx="0" cy="0" r="${halfSize}"
                  fill="none" stroke="url(#ambigramGradient)"
                  stroke-width="${strokeWidth}" filter="url(#ambigramGlow)"/>
        `;
      
      case 'i':
      case 'l':
        return `
          <line x1="0" y1="-${halfSize}" x2="0" y2="${halfSize}"
                stroke="url(#ambigramGradient)" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="url(#ambigramGlow)"/>
          <circle cx="0" cy="-${halfSize * 0.7}" r="${strokeWidth * 0.8}"
                  fill="url(#ambigramGradient)" filter="url(#ambigramGlow)"/>
        `;
      
      case 'x':
        return `
          <line x1="-${halfSize * 0.8}" y1="-${halfSize * 0.8}" x2="${halfSize * 0.8}" y2="${halfSize * 0.8}"
                stroke="url(#ambigramGradient)" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="url(#ambigramGlow)"/>
          <line x1="${halfSize * 0.8}" y1="-${halfSize * 0.8}" x2="-${halfSize * 0.8}" y2="${halfSize * 0.8}"
                stroke="url(#ambigramGradient)" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="url(#ambigramGlow)"/>
        `;
      
      case 's':
      case 'z':
        return `
          <path d="M -${halfSize * 0.6} -${halfSize * 0.8}
                   Q 0 -${halfSize * 0.4} ${halfSize * 0.6} 0
                   Q 0 ${halfSize * 0.4} -${halfSize * 0.6} ${halfSize * 0.8}"
                fill="none" stroke="url(#ambigramGradient)"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="url(#ambigramGlow)"/>
        `;
      
      default:
        // For other letters, create an artistic symmetric design
        return this.createArtisticSymmetricLetter(letter, fontSize);
    }
  }

  /**
   * Create dual-readable letter design
   */
  private createDualAmbigramLetter(letter1: string, letter2: string, fontSize: number): string {
    const strokeWidth = fontSize * 0.08;
    const halfSize = fontSize * 0.4;
    
    // Classic ambigram letter pairs
    const pair = letter1.toLowerCase() + letter2.toLowerCase();
    
    switch (pair) {
      case 'bd':
      case 'db':
        // Ambigram design for b and d
        return `
          <path d="M -${halfSize * 0.3} -${halfSize * 0.8}
                   L -${halfSize * 0.3} ${halfSize * 0.8}
                   Q ${halfSize * 0.5} ${halfSize * 0.4} -${halfSize * 0.3} 0
                   Q ${halfSize * 0.5} -${halfSize * 0.4} -${halfSize * 0.3} -${halfSize * 0.8}"
                fill="none" stroke="url(#ambigramGradient)"
                stroke-width="${strokeWidth}" stroke-linejoin="round" filter="url(#ambigramGlow)"/>
        `;
      
      case 'pq':
      case 'qp':
        // Ambigram design for p and q
        return `
          <path d="M -${halfSize * 0.3} -${halfSize * 0.8}
                   L -${halfSize * 0.3} ${halfSize * 0.8}
                   M -${halfSize * 0.3} -${halfSize * 0.4}
                   Q ${halfSize * 0.4} -${halfSize * 0.8} ${halfSize * 0.4} -${halfSize * 0.4}
                   Q ${halfSize * 0.4} 0 -${halfSize * 0.3} 0"
                fill="none" stroke="url(#ambigramGradient)"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="url(#ambigramGlow)"/>
        `;
      
      case 'nu':
      case 'un':
        // Ambigram design for n and u
        return `
          <path d="M -${halfSize * 0.5} -${halfSize * 0.8}
                   L -${halfSize * 0.5} ${halfSize * 0.2}
                   Q -${halfSize * 0.5} ${halfSize * 0.6} 0 ${halfSize * 0.6}
                   Q ${halfSize * 0.5} ${halfSize * 0.6} ${halfSize * 0.5} ${halfSize * 0.2}
                   L ${halfSize * 0.5} -${halfSize * 0.8}"
                fill="none" stroke="url(#ambigramGradient)"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="url(#ambigramGlow)"/>
        `;
      
      case 'mw':
      case 'wm':
        // Ambigram design for m and w
        return `
          <path d="M -${halfSize * 0.6} ${halfSize * 0.8}
                   L -${halfSize * 0.6} -${halfSize * 0.2}
                   Q -${halfSize * 0.6} -${halfSize * 0.6} -${halfSize * 0.2} -${halfSize * 0.6}
                   Q 0 -${halfSize * 0.6} 0 -${halfSize * 0.2}
                   Q 0 -${halfSize * 0.6} ${halfSize * 0.2} -${halfSize * 0.6}
                   Q ${halfSize * 0.6} -${halfSize * 0.6} ${halfSize * 0.6} -${halfSize * 0.2}
                   L ${halfSize * 0.6} ${halfSize * 0.8}"
                fill="none" stroke="url(#ambigramGradient)"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="url(#ambigramGlow)"/>
        `;
      
      default:
        // For other letter combinations, create fusion design
        return this.createFusionAmbigramLetter(letter1, letter2, fontSize);
    }
  }

  /**
   * Create artistic symmetric letter
   */
  private createArtisticSymmetricLetter(letter: string, fontSize: number): string {
    const strokeWidth = fontSize * 0.08;
    const halfSize = fontSize * 0.4;
    
    // Create a symmetric design based on letter characteristics
    return `
      <g class="artistic-symmetric">
        <circle cx="0" cy="0" r="${halfSize * 0.3}"
                fill="none" stroke="url(#ambigramGradient)"
                stroke-width="${strokeWidth * 0.5}" opacity="0.6" filter="url(#ambigramGlow)"/>
        <text x="0" y="${fontSize * 0.1}" text-anchor="middle"
              font-family="serif" font-size="${fontSize * 0.8}"
              fill="url(#ambigramGradient)" filter="url(#ambigramGlow)"
              style="font-weight: bold;">${letter}</text>
      </g>
    `;
  }

  /**
   * Create fusion ambigram letter
   */
  private createFusionAmbigramLetter(letter1: string, letter2: string, fontSize: number): string {
    const strokeWidth = fontSize * 0.08;
    const halfSize = fontSize * 0.4;
    
    // Create a design that fuses characteristics of both letters
    return `
      <g class="fusion-ambigram">
        <ellipse cx="0" cy="0" rx="${halfSize * 0.6}" ry="${halfSize * 0.8}"
                 fill="none" stroke="url(#ambigramGradient)"
                 stroke-width="${strokeWidth}" opacity="0.7" filter="url(#ambigramGlow)"/>
        <text x="0" y="${fontSize * 0.1}" text-anchor="middle"
              font-family="serif" font-size="${fontSize * 0.6}"
              fill="url(#ambigramGradient)" filter="url(#ambigramGlow)"
              style="font-weight: bold; opacity: 0.8;">${letter1}</text>
      </g>
    `;
  }


  /**
   * Create true ambigram letters: design a letter shape that reads as letter1 when viewed normally, and letter2 when rotated 180 degrees
   * This is the core of ambigrams: each letter is specially designed SVG path that can be recognized as different letters in two directions
   */
  private createAmbigramLetter(letter1: string, letter2: string): string {
    // If both letters are the same, return symmetrically designed letter
    if (letter1.toLowerCase() === letter2.toLowerCase()) {
      return this.createSymmetricLetter(letter1);
    }
    
    // Create true ambigram letter: using SVG path design
    return this.createDualReadableLetter(letter1, letter2);
  }

  /**
   * Create special design for symmetric letters - maintain original letter shape
   */
  private createSymmetricLetter(letter: string): string {
    // Prioritize keeping original letter, only fine-tune naturally symmetric letters
    const naturallySymmetric = ['o', 'O', 'x', 'X', 'i', 'I', 'l', 'L', 's', 'S', 'z', 'Z'];
    
    if (naturallySymmetric.includes(letter)) {
      return letter; // Keep original letter
    }
    
    // For other letters, choose the closest symmetric letter
    const symmetricAlternatives: Record<string, string> = {
      'n': 'u', // n upside down looks like u
      'u': 'n', // u upside down looks like n
      'b': 'd', // b upside down looks like d
      'd': 'b', // d upside down looks like b
      'p': 'q', // p upside down looks like q
      'q': 'p', // q upside down looks like p
      'h': 'y', // h upside down looks like y
      'y': 'h', // y upside down looks like h
      'w': 'm', // w upside down looks like m
      'm': 'w', // m upside down looks like w
      'W': 'M', // W upside down looks like M
      'M': 'W'  // M upside down looks like W
    };
    
    return symmetricAlternatives[letter] || letter;
  }

  /**
   * 创建能够双向阅读的字母设计 - Keep original letter可识别性
   * This is the core of ambigrams: select the best original letter to represent the ambigram
   */
  private createDualReadableLetter(letter1: string, letter2: string): string {
    // 优先选择最佳的原字母，而不是使用符号
    return this.selectBestAmbigramLetter(letter1, letter2);
  }

  /**
   * 选择最佳的双向图字母 - Keep original letter形状
   */
  private selectBestAmbigramLetter(letter1: string, letter2: string): string {
    // 如果两个字母相同，直接返回
    if (letter1.toLowerCase() === letter2.toLowerCase()) {
      return letter1;
    }

    // 优先选择天然对称的字母
    const symmetricLetters = ['o', 'O', 'x', 'X', 'i', 'I', 'l', 'L', 's', 'S', 'z', 'Z'];
    
    if (symmetricLetters.includes(letter1)) {
      return letter1;
    }
    if (symmetricLetters.includes(letter2)) {
      return letter2;
    }

    // 经典双向图字母对 - 使用原字母
    const classicPairs: Record<string, string> = {
      'bd': 'b', 'db': 'd',
      'pq': 'p', 'qp': 'q',
      'nu': 'n', 'un': 'u',
      'mw': 'w', 'wm': 'm',
      'hy': 'h', 'yh': 'y'
    };

    const pair = letter1.toLowerCase() + letter2.toLowerCase();
    const reversePair = letter2.toLowerCase() + letter1.toLowerCase();

    if (classicPairs[pair]) {
      return classicPairs[pair];
    }
    if (classicPairs[reversePair]) {
      return classicPairs[reversePair];
    }

    // 如果没有经典配对，选择视觉上更适合双向图的字母
    const ambigramFriendly = ['a', 'e', 'o', 'u', 'i', 'n', 'h', 's', 'z', 'x', 'v', 'w', 'm'];
    
    if (ambigramFriendly.includes(letter1.toLowerCase())) {
      return letter1;
    }
    if (ambigramFriendly.includes(letter2.toLowerCase())) {
      return letter2;
    }

    // 最后选择字母表中较早的字母
    return letter1.toLowerCase() < letter2.toLowerCase() ? letter1 : letter2;
  }

  /**
   * 创建通用的双向图字母 - 使用原字母
   */
  private createGenericAmbigramLetter(letter1: string, letter2: string): string {
    // 不再使用符号，而是选择最合适的原字母
    return this.selectBestAmbigramLetter(letter1, letter2);
  }

  /**
   * 创建混合字母：当没有完美的双向图字母时的回退策略
   */
  private createHybridLetter(letter1: string, letter2: string): string {
    // 优先选择对称性更好的字母
    const symmetricLetters = ['o', 'x', 'i', 'l', 's', 'z', 'n', 'u', 'h'];
    
    if (symmetricLetters.includes(letter1.toLowerCase())) {
      return letter1;
    } else if (symmetricLetters.includes(letter2.toLowerCase())) {
      return letter2;
    }
    
    // 对于非对称字母，尝试找到视觉上相似的字母
    const visualSimilarity: Record<string, string> = {
      'a': 'e',
      'e': 'a',
      'b': 'd',
      'd': 'b',
      'c': 'o',
      'f': 't',
      't': 'f',
      'g': 'q',
      'q': 'g',
      'j': 'i',
      'k': 'x',
      'p': 'q',
      'r': 'n',
      'v': 'y',
      'y': 'v',
      'w': 'm',
      'm': 'w'
    };
    
    // 尝试找到视觉相似的字母
    const similar1 = visualSimilarity[letter1.toLowerCase()];
    const similar2 = visualSimilarity[letter2.toLowerCase()];
    
    if (similar1 === letter2.toLowerCase()) {
      return letter1; // 如果letter1的相似字母是letter2，使用letter1
    } else if (similar2 === letter1.toLowerCase()) {
      return letter2; // 如果letter2的相似字母是letter1，使用letter2
    }
    
    // 如果没有直接的视觉相似性，选择字母表中较早的字母
    return letter1.toLowerCase() < letter2.toLowerCase() ? letter1 : letter2;
  }

  /**
   * 解析输入文本，支持多种格式和多个单词
   */
  private parseInputText(inputText: string): { word1: string; word2: string } {
    if (!inputText || !inputText.trim()) {
      return { word1: '', word2: '' };
    }

    // 支持多种分隔符：空格、逗号、斜杠、竖线等
    const separators = [' / ', '/', ' | ', '|', ', ', ',', '  ', ' '];
    
    for (const separator of separators) {
      if (inputText.includes(separator)) {
        const parts = inputText.split(separator).map(part => part.trim()).filter(part => part);
        if (parts.length >= 2) {
          // 🔥 修复：支持多个单词 - 将所有单词合并显示
          if (parts.length === 2) {
            return { word1: parts[0], word2: parts[1] };
          } else if (parts.length > 2) {
            // 对于3个或更多单词，将它们合并为一个连续的文本
            const allWords = parts.join(' ');
            return { word1: allWords, word2: allWords };
          }
        }
      }
    }

    // 如果没有分隔符，检查是否是单个单词（创建对称双向图）
    const trimmed = inputText.trim();
    if (trimmed.length > 0) {
      return { word1: trimmed, word2: trimmed };
    }

    return { word1: '', word2: '' };
  }

  /**
   * 计算自适应字体大小
   */
  private calculateAdaptiveFontSize(inputText: string, baseFontSize: number): number {
    const textLength = inputText.length;
    
    // 基础自适应算法
    if (textLength <= 5) {
      return baseFontSize; // 短文本使用原始大小
    } else if (textLength <= 10) {
      return Math.max(24, baseFontSize * 0.8); // 中等长度稍微缩小
    } else if (textLength <= 20) {
      return Math.max(20, baseFontSize * 0.6); // 长文本显著缩小
    } else {
      return Math.max(16, baseFontSize * 0.4); // 超长文本大幅缩小
    }
  }

  /**
   * 验证输入是否有效
   */
  validateInput(inputText: string): { valid: boolean; error?: string } {
    if (!inputText || !inputText.trim()) {
      return { valid: false, error: '请输入文本内容' };
    }
    
    if (inputText.length > 50) {
      return { valid: false, error: '输入内容不能超过50个字符' };
    }
    
    // 检查是否包含特殊字符（允许常见分隔符）
    const validChars = /^[a-zA-Z\u4e00-\u9fa5\s\/\|\,\-\.]+$/;
    if (!validChars.test(inputText)) {
      return { valid: false, error: '只支持英文字母、中文字符和常见分隔符（空格、/、|、,、-、.）' };
    }
    
    return { valid: true };
  }

  /**
   * 快速预览生成 - 用于实时预览
   */
  generatePreview(inputText: string, fontId: string = 'arial'): string {
    // 输入验证
    if (!inputText || !inputText.trim()) {
      return this.generatePlaceholderSVG();
    }

    // 解析输入文本
    const { word1, word2 } = this.parseInputText(inputText);

    // 获取字体样式
    const webFonts = this.fontLibrary.getWebSafeFonts();
    const selectedFont = webFonts.find((f: any) => f.id === fontId) || webFonts[0];

    // 生成预览SVG - 传递原始输入文本以保持分隔符信息
    return this.generatePreviewSVG(word1, word2, selectedFont, inputText);
  }

  /**
   * 生成预览SVG - 使用真正的双向图算法
   */
  private generatePreviewSVG(word1: string, word2: string, font: any, originalInputText?: string): string {
    const canvasWidth = 400;
    const canvasHeight = 200;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // 计算字体大小
    const maxLength = Math.max(word1.length, word2.length);
    const fontSize = Math.min(48, Math.max(24, 300 / maxLength));

    // 根据字体类型创建不同的视觉效果
    const fontEffects = this.getFontSpecificEffects(font.id, fontSize);

    // 创建增强的渐变和滤镜定义
    const enhancedDefs = `
      <defs>
        ${fontEffects.gradients}
        ${fontEffects.filters}
        ${fontEffects.patterns}
        
        <!-- 通用动画定义 -->
        <animateTransform id="pulse" attributeName="transform" type="scale"
                         values="1;1.05;1" dur="2s" repeatCount="indefinite"/>
        <animate id="glow-animation" attributeName="opacity"
                values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite"/>
      </defs>
    `;

    // 添加背景效果
    const backgroundEffects = this.createBackgroundEffects(font.id, canvasWidth, canvasHeight);

    // 🔥 核心改进：检查是否是垂直双向图模式
    let previewAmbigram;
    if (originalInputText && originalInputText.includes('|')) {
      // 垂直双向图模式
      previewAmbigram = this.createPreviewVerticalAmbigram(word1, word2, centerX, centerY, fontSize, fontEffects);
    } else {
      // 标准双向图模式
      previewAmbigram = this.createPreviewAmbigram(word1, word2, font, fontSize, fontEffects);
    }

    // 添加增强的分隔线和装饰
    const enhancedDecorations = this.createEnhancedDecorations(font.id, centerX, centerY, canvasWidth);

    // 移除双向图说明，保持纯净的预览
    return `
      <svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
        ${enhancedDefs}
        <rect width="100%" height="100%" fill="transparent"/>
        ${backgroundEffects}
        ${enhancedDecorations}
        ${previewAmbigram}
      </svg>
    `;
  }

  /**
   * 创建预览双向图：使用真正的双向图字母设计
   * 核心原理：每个字母都是特殊设计的，正向看是一个字母，旋转180度看是另一个字母
   */
  private createPreviewAmbigram(word1: string, word2: string, font: any, fontSize: number, fontEffects: any): string {
    const centerX = 200; // 画布中心X
    const centerY = 100; // 画布中心Y
    
    // 🔥 检查是否是垂直双向图模式（通过不同的单词识别）
    if (word1 !== word2) {
      return this.createPreviewVerticalAmbigram(word1, word2, centerX, centerY, fontSize, fontEffects);
    }
    
    // 🔥 核心改进：使用真正的双向图字母设计算法
    return this.createPreviewAmbigramLetters(word1, word2, centerX, centerY, fontSize, font, fontEffects);
  }

  /**
   * 创建预览双向图字母 - 专门用于预览系统
   * 这确保预览显示真正的双向图效果
   */
  private createPreviewAmbigramLetters(word1: string, word2: string, centerX: number, centerY: number, fontSize: number, font: any, fontEffects: any): string {
    // 创建字母映射
    const letterPairs = this.createTrueAmbigramDesign(word1, word2);
    
    // 计算布局
    const totalLetters = letterPairs.length;
    const letterSpacing = fontSize * 0.9;
    const totalWidth = totalLetters * letterSpacing;
    const startX = centerX - totalWidth / 2 + letterSpacing / 2;
    
    let ambigramContent = '';
    
    // 为每个位置创建双向图字母
    letterPairs.forEach((pair, index) => {
      const x = startX + index * letterSpacing;
      
      // 创建真正的双向图字母设计
      const ambigramLetter = this.createPreviewAmbigramLetter(pair.letter1, pair.letter2, fontSize, fontEffects);
      
      ambigramContent += `
        <g class="preview-ambigram-letter-${index}" transform="translate(${x}, ${centerY})">
          ${ambigramLetter}
        </g>
      `;
    });
    
    return `
      <g class="preview-true-ambigram">
        ${ambigramContent}
      </g>
    `;
  }

  /**
   * 创建预览双向图字母
   * 核心：设计一个字母形状，正向看是letter1，旋转180度看是letter2
   */
  private createPreviewAmbigramLetter(letter1: string, letter2: string, fontSize: number, fontEffects: any): string {
    // 如果两个字母相同，创建对称设计
    if (letter1.toLowerCase() === letter2.toLowerCase()) {
      return this.createPreviewSymmetricLetter(letter1, fontSize, fontEffects);
    }
    
    // 创建双向可读的字母设计
    return this.createPreviewDualLetter(letter1, letter2, fontSize, fontEffects);
  }

  /**
   * 创建预览对称字母
   */
  private createPreviewSymmetricLetter(letter: string, fontSize: number, fontEffects: any): string {
    const strokeWidth = fontSize * 0.08;
    const halfSize = fontSize * 0.4;
    
    // 根据字母创建对称的SVG路径
    switch (letter.toLowerCase()) {
      case 'o':
        return `
          <circle cx="0" cy="0" r="${halfSize}"
                  fill="none" stroke="${fontEffects.fillColor}"
                  stroke-width="${strokeWidth}" filter="${fontEffects.filter}"/>
        `;
      
      case 'i':
      case 'l':
        return `
          <line x1="0" y1="-${halfSize}" x2="0" y2="${halfSize}"
                stroke="${fontEffects.fillColor}" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="${fontEffects.filter}"/>
          <circle cx="0" cy="-${halfSize * 0.7}" r="${strokeWidth * 0.8}"
                  fill="${fontEffects.fillColor}" filter="${fontEffects.filter}"/>
        `;
      
      case 'h':
        return `
          <path d="M -${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} ${halfSize * 0.8}
                   M -${halfSize * 0.4} 0
                   L ${halfSize * 0.4} 0
                   M ${halfSize * 0.4} -${halfSize * 0.8}
                   L ${halfSize * 0.4} ${halfSize * 0.8}"
                fill="none" stroke="${fontEffects.fillColor}"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="${fontEffects.filter}"/>
        `;
      
      case 'p':
        return `
          <path d="M -${halfSize * 0.3} -${halfSize * 0.8}
                   L -${halfSize * 0.3} ${halfSize * 0.8}
                   M -${halfSize * 0.3} -${halfSize * 0.8}
                   Q ${halfSize * 0.4} -${halfSize * 0.8} ${halfSize * 0.4} -${halfSize * 0.4}
                   Q ${halfSize * 0.4} 0 -${halfSize * 0.3} 0"
                fill="none" stroke="${fontEffects.fillColor}"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="${fontEffects.filter}"/>
        `;
      
      case 'e':
        return `
          <path d="M ${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} 0
                   L ${halfSize * 0.2} 0
                   M -${halfSize * 0.4} 0
                   L -${halfSize * 0.4} ${halfSize * 0.8}
                   L ${halfSize * 0.4} ${halfSize * 0.8}"
                fill="none" stroke="${fontEffects.fillColor}"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="${fontEffects.filter}"/>
        `;
      
      default:
        // 对于其他字母，创建一个艺术化的设计
        return `
          <g class="artistic-letter">
            <ellipse cx="0" cy="0" rx="${halfSize * 0.6}" ry="${halfSize * 0.8}"
                     fill="none" stroke="${fontEffects.fillColor}"
                     stroke-width="${strokeWidth}" opacity="0.8" filter="${fontEffects.filter}"/>
            <text x="0" y="${fontSize * 0.15}" text-anchor="middle"
                  font-family="serif" font-size="${fontSize * 0.7}"
                  fill="${fontEffects.fillColor}" filter="${fontEffects.filter}"
                  style="font-weight: bold;">${letter}</text>
          </g>
        `;
    }
  }

  /**
   * 创建预览垂直双向图
   * 🔥 修改：如果第二个输入框为空，则不显示下方内容和分隔线
   */
  private createPreviewVerticalAmbigram(word1: string, word2: string, centerX: number, centerY: number, fontSize: number, fontEffects: any): string {
    // 调整字体大小以适应垂直布局
    const adjustedFontSize = fontSize * 0.8;
    const verticalSpacing = adjustedFontSize * 1.5;
    
    // 🔥 检查第二个输入框是否为空
    const hasSecondText = word2 && word2.trim().length > 0;
    
    // 根据是否有第二个文本调整位置
    const upperY = hasSecondText ? centerY - verticalSpacing / 2 : centerY;
    const lowerY = centerY + verticalSpacing / 2;
    
    // 创建上方文本（正常显示第一个输入框内容）
    const upperText = `
      <text x="${centerX}" y="${upperY}"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Arial, sans-serif"
            font-size="${adjustedFontSize}"
            font-weight="bold"
            fill="${fontEffects.fillColor}"
            opacity="0.95"
            filter="${fontEffects.filter}">
        ${word1}
      </text>
    `;
    
    // 🔥 只有当第二个输入框有内容时才创建下方文本
    const lowerText = hasSecondText ? `
      <g transform="translate(${centerX}, ${lowerY}) rotate(180)">
        <text x="0" y="0"
              text-anchor="middle"
              dominant-baseline="middle"
              font-family="Arial, sans-serif"
              font-size="${adjustedFontSize}"
              font-weight="bold"
              fill="${fontEffects.fillColor}"
              opacity="0.95"
              filter="${fontEffects.filter}">
          ${word2}
        </text>
      </g>
    ` : '';
    
    // 🔥 只有当第二个输入框有内容时才显示分隔线
    const separatorLine = hasSecondText ? `
      <line x1="${centerX - 80}" y1="${centerY}" x2="${centerX + 80}" y2="${centerY}"
            stroke="${fontEffects.fillColor}" stroke-width="1" opacity="0.3"/>
    ` : '';
    
    return `
      <g class="preview-vertical-ambigram" data-has-second="${hasSecondText}">
        <!-- 上方文本（第一个输入框内容） -->
        ${upperText}
        <!-- 下方文本（第二个输入框内容旋转180度，仅在有内容时显示） -->
        ${lowerText}
        <!-- 分隔线（仅在有第二个文本时显示） -->
        ${separatorLine}
      </g>
    `;
  }

  /**
   * 创建预览双向字母
   */
  private createPreviewDualLetter(letter1: string, letter2: string, fontSize: number, fontEffects: any): string {
    const strokeWidth = fontSize * 0.08;
    const halfSize = fontSize * 0.4;
    
    // 经典双向图字母对
    const pair = letter1.toLowerCase() + letter2.toLowerCase();
    
    switch (pair) {
      case 'hf':
      case 'fh':
        // Hope/Faith 中的 h和f的双向图设计
        return `
          <path d="M -${halfSize * 0.4} -${halfSize * 0.8}
                   L -${halfSize * 0.4} ${halfSize * 0.8}
                   M -${halfSize * 0.4} -${halfSize * 0.2}
                   L ${halfSize * 0.3} -${halfSize * 0.2}
                   M -${halfSize * 0.4} -${halfSize * 0.6}
                   L ${halfSize * 0.2} -${halfSize * 0.6}"
                fill="none" stroke="${fontEffects.fillColor}"
                stroke-width="${strokeWidth}" stroke-linecap="round" filter="${fontEffects.filter}"/>
        `;
      
      case 'oa':
      case 'ao':
        // Hope/Faith 中的 o和a的双向图设计
        return `
          <ellipse cx="0" cy="0" rx="${halfSize * 0.6}" ry="${halfSize * 0.8}"
                   fill="none" stroke="${fontEffects.fillColor}"
                   stroke-width="${strokeWidth}" filter="${fontEffects.filter}"/>
          <line x1="${halfSize * 0.3}" y1="0" x2="${halfSize * 0.3}" y2="${halfSize * 0.8}"
                stroke="${fontEffects.fillColor}" stroke-width="${strokeWidth * 0.8}"
                stroke-linecap="round" filter="${fontEffects.filter}"/>
        `;
      
      case 'pi':
      case 'ip':
        // Hope/Faith 中的 p和i的双向图设计
        return `
          <line x1="0" y1="-${halfSize * 0.8}" x2="0" y2="${halfSize * 0.8}"
                stroke="${fontEffects.fillColor}" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="${fontEffects.filter}"/>
          <circle cx="0" cy="-${halfSize * 0.5}" r="${halfSize * 0.3}"
                  fill="none" stroke="${fontEffects.fillColor}"
                  stroke-width="${strokeWidth * 0.8}" filter="${fontEffects.filter}"/>
        `;
      
      case 'et':
      case 'te':
        // Hope/Faith 中的 e和t的双向图设计
        return `
          <line x1="-${halfSize * 0.4}" y1="-${halfSize * 0.8}" x2="${halfSize * 0.4}" y2="-${halfSize * 0.8}"
                stroke="${fontEffects.fillColor}" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="${fontEffects.filter}"/>
          <line x1="0" y1="-${halfSize * 0.8}" x2="0" y2="${halfSize * 0.8}"
                stroke="${fontEffects.fillColor}" stroke-width="${strokeWidth}"
                stroke-linecap="round" filter="${fontEffects.filter}"/>
          <line x1="-${halfSize * 0.3}" y1="-${halfSize * 0.2}" x2="${halfSize * 0.3}" y2="-${halfSize * 0.2}"
                stroke="${fontEffects.fillColor}" stroke-width="${strokeWidth * 0.8}"
                stroke-linecap="round" filter="${fontEffects.filter}"/>
        `;
      
      default:
        // 对于其他字母组合，创建融合设计
        return `
          <g class="fusion-letter">
            <ellipse cx="0" cy="0" rx="${halfSize * 0.7}" ry="${halfSize * 0.9}"
                     fill="none" stroke="${fontEffects.fillColor}"
                     stroke-width="${strokeWidth}" opacity="0.6" filter="${fontEffects.filter}"/>
            <text x="0" y="${fontSize * 0.15}" text-anchor="middle"
                  font-family="serif" font-size="${fontSize * 0.6}"
                  fill="${fontEffects.fillColor}" filter="${fontEffects.filter}"
                  style="font-weight: bold; opacity: 0.9;">${letter1}</text>
          </g>
        `;
    }
  }

  /**
   * 为不同字体创建特定的视觉效果 - 精选5种独特字体
   */
  private getFontSpecificEffects(fontId: string, fontSize: number) {
    const effects = {
      gradients: '',
      filters: '',
      patterns: '',
      fillColor: 'url(#textGradient)',
      strokeColor: 'none',
      strokeWidth: '0',
      fontWeight: '600',
      filter: 'url(#glow)',
      textAttributes: '',
      beforeText: '',
      afterText: '',
      animations: ''
    };

    switch (fontId) {
      case 'default':
        // 📝 默认无特效字体 - 简洁清晰，不使用任何特殊效果
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0" result="noBlur"/>
            <feMerge>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
        effects.fillColor = '#ffffff';
        effects.strokeColor = 'none';
        effects.strokeWidth = '0';
        effects.filter = 'none';
        effects.animations = '';
        break;

      case 'arial':
      case 'helvetica':
        // 🌈 Super tech neon style - rainbow gradient + intense glow
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
            <stop offset="20%" style="stop-color:#0080ff;stop-opacity:1" />
            <stop offset="40%" style="stop-color:#8000ff;stop-opacity:1" />
            <stop offset="60%" style="stop-color:#ff0080;stop-opacity:1" />
            <stop offset="80%" style="stop-color:#ff8000;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00ffff;stop-opacity:1" />
            <animateTransform attributeName="gradientTransform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite"/>
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="15" result="bigBlur"/>
            <feGaussianBlur stdDeviation="25" result="hugeBlur"/>
            <feColorMatrix in="coloredBlur" type="saturate" values="3"/>
            <feMerge>
              <feMergeNode in="hugeBlur"/>
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
        effects.strokeColor = '#00ffff';
        effects.strokeWidth = '2';
        effects.animations = `
          <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite"/>
        `;
        break;

      case 'times':
      case 'times-new-roman':
        // 👑 Royal golden luxury style - deep gold gradient + warm glow
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#FFA500;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#FF8C00;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#DAA520;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="12" result="bigBlur"/>
            <feColorMatrix in="coloredBlur" type="saturate" values="2.5"/>
            <feMerge>
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
        effects.strokeColor = '#B8860B';
        effects.strokeWidth = '1.5';
        break;

      case 'georgia':
        // 💎 Elegant emerald green style - deep green gradient + mysterious glow
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00E676;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#00C851;stop-opacity:1" />
            <stop offset="60%" style="stop-color:#00A041;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#007E33;stop-opacity:1" />
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="14" result="bigBlur"/>
            <feColorMatrix in="coloredBlur" type="saturate" values="2"/>
            <feMerge>
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
        effects.strokeColor = '#004D40';
        effects.strokeWidth = '2';
        break;

      case 'impact':
        // ⚡ Intense flame red style - flame gradient + explosive glow
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF1744;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#FF5722;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#FF3D00;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#D84315;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FF1744;stop-opacity:1" />
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="16" result="bigBlur"/>
            <feColorMatrix in="coloredBlur" type="saturate" values="2.8"/>
            <feMerge>
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
        effects.strokeColor = '#BF360C';
        effects.strokeWidth = '2.5';
        break;

      case 'courier':
        // 🖥️ Retro terminal green style - matrix green gradient + electronic glow
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00FF41;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#00E676;stop-opacity:1" />
            <stop offset="60%" style="stop-color:#00D835;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00B028;stop-opacity:1" />
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="12" result="bigBlur"/>
            <feColorMatrix in="coloredBlur" type="saturate" values="2.2"/>
            <feMerge>
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
        effects.strokeColor = '#00691C';
        effects.strokeWidth = '1.5';
        break;

      default:
        // Default purple gradient style
        effects.gradients = `
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
          </linearGradient>
        `;
        effects.filters = `
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        `;
    }

    return effects;
  }

  /**
   * Create background effects
   */
  private createBackgroundEffects(fontId: string, width: number, height: number): string {
    return '';
  }

  /**
   * Create enhanced decorative elements
   */
  private createEnhancedDecorations(fontId: string, centerX: number, centerY: number, width: number): string {
    const baseDecorations = `
      <line x1="50" y1="${centerY}" x2="${width - 50}" y2="${centerY}"
            stroke="url(#textGradient)"
            stroke-width="2"
            opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/>
      </line>
    `;

    return baseDecorations + `
      <circle cx="50" cy="${centerY}" r="3" fill="url(#textGradient)" opacity="0.6"/>
      <circle cx="${width - 50}" cy="${centerY}" r="3" fill="url(#textGradient)" opacity="0.6"/>
    `;
  }

  /**
   * Generate placeholder SVG
   */
  private generatePlaceholderSVG(): string {
    return `
      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="placeholderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6B7280;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#9CA3AF;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#placeholderGradient)" rx="8"/>
        <text x="200" y="100" text-anchor="middle" font-family="Arial, sans-serif"
              font-size="18" fill="#6B7280">
          Enter text to start create ambigrams
        </text>
        <text x="200" y="125" text-anchor="middle" font-family="Arial, sans-serif"
              font-size="14" fill="#9CA3AF">
          Enter text to create ambigram
        </text>
      </svg>
    `;
  }

  /**
   * Get recommended fonts
   */
  getRecommendedFonts(inputText: string) {
    const { word1, word2 } = this.parseInputText(inputText);
    return this.fontLibrary.getSmartFontRecommendations(word1, word2);
  }

  /**
   * Get all available fonts
   */
  getAvailableFonts() {
    return this.fontLibrary.getWebSafeFonts();
  }

  /**
   * Get system performance information
   */
  getPerformanceInfo() {
    return {
      cache: { hitRate: 0, totalEntries: 0 },
      worker: { available: false, pendingTasks: 0 },
      memory: null,
      recommendations: []
    };
  }

  /**
   * Get generation statistics
   */
  getGenerationStats(inputText: string) {
    const { word1, word2 } = this.parseInputText(inputText);
    
    // Calculate complexity
    const complexity = Math.max(word1.length, word2.length) * 0.5 +
                      Math.abs(word1.length - word2.length) * 0.3;
    
    // Determine strategy
    let strategy = 'standard';
    if (word1.length === word2.length) {
      strategy = 'symmetric';
    } else if (Math.abs(word1.length - word2.length) > 3) {
      strategy = 'adaptive';
    }
    
    // Calculate quality score
    const qualityScore = Math.max(60, 100 - complexity * 5);

    // Estimate time
    const estimatedTime = (complexity * 0.1 + 0.5).toFixed(1);
    
    return {
      complexity,
      strategy,
      qualityScore: Math.round(qualityScore),
      estimatedTime
    };
  }
}

export const ambigramEngine = new AmbigramEngine();
