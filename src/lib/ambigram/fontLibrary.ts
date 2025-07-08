import { FontStyle, LetterMapping } from './types';

export class FontLibrary {
  private fonts: Map<string, FontStyle> = new Map();

  constructor() {
    this.initializeFonts();
  }

  /**
   * Initialize font library
   * Curated 5 unique styles of high-quality fonts
   */
  private initializeFonts() {
    // 📝 Default - Default font without effects
    this.fonts.set('default', {
      name: 'Default',
      category: 'default',
      file: 'Arial, sans-serif',
      letterMappings: this.createBasicLetterMappings()
    });

    // 🌈 Arial - Super tech neon style
    this.fonts.set('arial', {
      name: 'Arial',
      category: 'tech',
      file: 'Arial, sans-serif',
      letterMappings: this.createBasicLetterMappings()
    });

    // 👑 Times - Royal golden luxury style
    this.fonts.set('times', {
      name: 'Times New Roman',
      category: 'royal',
      file: 'Times New Roman, serif',
      letterMappings: this.createBasicLetterMappings()
    });

    // 💎 Georgia - Elegant emerald green style
    this.fonts.set('georgia', {
      name: 'Georgia',
      category: 'elegant',
      file: 'Georgia, serif',
      letterMappings: this.createBasicLetterMappings()
    });

    // ⚡ Impact - Intense flame red style
    this.fonts.set('impact', {
      name: 'Impact',
      category: 'explosive',
      file: 'Impact, fantasy',
      letterMappings: this.createBasicLetterMappings()
    });

    // 🖥️ Courier - Retro terminal green style
    this.fonts.set('courier', {
      name: 'Courier New',
      category: 'cyberpunk',
      file: 'Courier New, monospace',
      letterMappings: this.createBasicLetterMappings()
    });
  }

  /**
   * Create basic letter mappings
   * Define basic properties and compatibility for each letter
   */
  private createBasicLetterMappings(): Record<string, LetterMapping> {
    const mappings: Record<string, LetterMapping> = {};

    // Define basic letter mapping rules
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    letters.forEach(letter => {
      mappings[letter] = {
        paths: [`M0,0 L10,0 L10,10 L0,10 Z`], // Simplified path, should be actual letter path in practice
        width: 10,
        height: 10,
        baseline: 8,
        reversible: this.isLetterReversible(letter),
        compatibleWith: this.getCompatibleLetters(letter)
      };
    });

    return mappings;
  }

  /**
   * Determine if letter can be directly rotated 180 degrees
   */
  private isLetterReversible(letter: string): boolean {
    // These letters remain readable or similar when rotated 180 degrees
    const reversibleLetters = ['o', 'x', 'i', 'l', 's', 'z', 'n', 'u'];
    return reversibleLetters.includes(letter.toLowerCase());
  }

  /**
   * Get list of letters compatible with specified letter
   * Used for intelligent pairing suggestions
   */
  private getCompatibleLetters(letter: string): string[] {
    const compatibilityMap: Record<string, string[]> = {
      'a': ['e', 'o', 'u'],
      'b': ['d', 'p', 'q'],
      'c': ['e', 'o'],
      'd': ['b', 'p', 'q'],
      'e': ['a', 'c', 'o'],
      'f': ['t'],
      'g': ['q', 'p'],
      'h': ['n', 'u'],
      'i': ['l', 'j'],
      'j': ['i'],
      'k': ['x'],
      'l': ['i', 't'],
      'm': ['w'],
      'n': ['h', 'u'],
      'o': ['a', 'c', 'e'],
      'p': ['b', 'd', 'q'],
      'q': ['b', 'd', 'p'],
      'r': ['n'],
      's': ['z'],
      't': ['f', 'l'],
      'u': ['n', 'h'],
      'v': ['w'],
      'w': ['m', 'v'],
      'x': ['k'],
      'y': ['v'],
      'z': ['s']
    };

    return compatibilityMap[letter.toLowerCase()] || [];
  }

  /**
   * Get font style
   */
  getFontStyle(fontName: string): FontStyle | null {
    return this.fonts.get(fontName) || null;
  }

  /**
   * Get all available fonts
   */
  getAllFonts(): FontStyle[] {
    return Array.from(this.fonts.values());
  }

  /**
   * Recommend best font based on word content
   */
  recommendFont(word1: string, word2: string): string[] {
    const recommendations: string[] = [];
    
    // Recommend fonts based on word characteristics
    const combinedText = (word1 + word2).toLowerCase();

    // Recommend default font if contains simplicity-related words
    const simpleWords = ['simple', 'clean', 'basic', 'plain', 'minimal', 'pure', 'clear'];
    if (simpleWords.some(word => combinedText.includes(word))) {
      recommendations.push('default', 'arial');
    }
    
    // Recommend elegant font if contains love-related words
    const loveWords = ['love', 'heart', 'forever', 'always', 'romance', 'soul', 'eternal'];
    if (loveWords.some(word => combinedText.includes(word))) {
      recommendations.push('georgia', 'times');
    }
    
    // Recommend modern font if contains family-related words
    const familyWords = ['family', 'mom', 'dad', 'son', 'daughter', 'home', 'parent', 'child'];
    if (familyWords.some(word => combinedText.includes(word))) {
      recommendations.push('default', 'arial', 'georgia');
    }
    
    // Recommend strong font if contains strength-related words
    const strengthWords = ['strong', 'power', 'warrior', 'fight', 'force', 'mighty', 'brave'];
    if (strengthWords.some(word => combinedText.includes(word))) {
      recommendations.push('impact', 'times');
    }
    
    // Recommend tech font if contains technology-related words
    const techWords = ['tech', 'future', 'digital', 'cyber', 'code', 'matrix', 'virtual'];
    if (techWords.some(word => combinedText.includes(word))) {
      recommendations.push('courier', 'arial');
    }
    
    // Recommend artistic font if contains art-related words
    const artWords = ['art', 'creative', 'design', 'artistic', 'beauty', 'elegant', 'style'];
    if (artWords.some(word => combinedText.includes(word))) {
      recommendations.push('georgia', 'impact');
    }
    
    // Default recommendation
    if (recommendations.length === 0) {
      recommendations.push('default', 'arial', 'times');
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  }

  /**
   * Check if font supports specified characters
   */
  supportsCharacters(fontName: string, text: string): boolean {
    const font = this.fonts.get(fontName);
    if (!font) return false;
    
    // Simplified check: assume all fonts support basic Latin letters and common Chinese characters
    const supportedChars = /^[a-zA-Z\u4e00-\u9fa5\s]+$/;
    return supportedChars.test(text);
  }

  /**
   * Get font display name
   */
  getFontDisplayName(fontName: string): string {
    const displayNames: Record<string, string> = {
      'default': '📝 Default Clean Font',
      'arial': '🌈 Super Tech Neon',
      'times': '👑 Royal Golden Luxury',
      'georgia': '💎 Elegant Emerald',
      'impact': '⚡ Intense Flame Red',
      'courier': '🖥️ Retro Terminal Green'
    };
    
    return displayNames[fontName] || fontName;
  }

  /**
   * Get web-safe font list
   * Used for actual rendering font selection
   */
  getWebSafeFonts(): Array<{id: string, name: string, family: string, category: string}> {
    return [
      // 📝 Default clean font
      {
        id: 'default',
        name: 'Default',
        family: 'Arial, sans-serif',
        category: 'default'
      },
      // 🌈 Super tech neon
      {
        id: 'arial',
        name: 'Arial',
        family: 'Arial, sans-serif',
        category: 'tech'
      },
      // 👑 Royal golden luxury
      {
        id: 'times',
        name: 'Times New Roman',
        family: 'Times New Roman, serif',
        category: 'royal'
      },
      // 💎 Elegant emerald
      {
        id: 'georgia',
        name: 'Georgia',
        family: 'Georgia, serif',
        category: 'elegant'
      },
      // ⚡ Intense flame red
      {
        id: 'impact',
        name: 'Impact',
        family: 'Impact, fantasy',
        category: 'explosive'
      },
      // 🖥️ Retro terminal green
      {
        id: 'courier',
        name: 'Courier New',
        family: 'Courier New, monospace',
        category: 'cyberpunk'
      }
    ];
  }

  /**
   * Intelligent font recommendation system
   * Recommend most suitable fonts based on text content and language features
   */
  getSmartFontRecommendations(word1: string, word2: string): Array<{id: string, name: string, family: string, score: number, reason: string}> {
    const combinedText = word1 + word2;
    const webFonts = this.getWebSafeFonts();
    const recommendations = [];

    // Detect text characteristics
    const hasEnglish = /[a-zA-Z]/.test(combinedText);
    const isShort = word1.length <= 4 && word2.length <= 4;
    const isLong = word1.length > 8 || word2.length > 8;

    for (const font of webFonts) {
      let score = 60; // Base score
      let reason = '';

      // Score based on font characteristics
      switch (font.id) {
        case 'default':
          score += 10;
          reason = 'Default clean style, suitable for simple clear text';
          if (combinedText.toLowerCase().includes('simple') || combinedText.toLowerCase().includes('clean')) {
            score += 10;
            reason += ', bonus for simplicity theme';
          }
          break;
          
        case 'arial':
          score += 20;
          reason = 'Tech neon effect, suitable for modern text';
          if (combinedText.toLowerCase().includes('tech') || combinedText.toLowerCase().includes('future')) {
            score += 15;
            reason += ', bonus for tech theme';
          }
          break;
          
        case 'times':
          score += 15;
          reason = 'Royal golden luxury, suitable for formal elegant text';
          if (combinedText.toLowerCase().includes('love') || combinedText.toLowerCase().includes('royal')) {
            score += 15;
            reason += ', bonus for elegance theme';
          }
          break;
          
        case 'georgia':
          score += 18;
          reason = 'Elegant emerald green, suitable for artistic creative text';
          if (combinedText.toLowerCase().includes('art') || combinedText.toLowerCase().includes('creative')) {
            score += 15;
            reason += ', bonus for art theme';
          }
          break;
          
        case 'impact':
          score += 25;
          reason = 'Intense flame red, suitable for powerful impact text';
          if (combinedText.toLowerCase().includes('power') || combinedText.toLowerCase().includes('strong')) {
            score += 20;
            reason += ', bonus for power theme';
          }
          break;
          
        case 'courier':
          score += 12;
          reason = 'Retro terminal green, suitable for code tech text';
          if (combinedText.toLowerCase().includes('code') || combinedText.toLowerCase().includes('cyber')) {
            score += 18;
            reason += ', bonus for code theme';
          }
          break;
      }

      // Length adaptation
      if (isShort && font.category === 'explosive') {
        score += 15;
        reason += ', suitable for short word impact effect';
      } else if (isLong && ['royal', 'elegant'].includes(font.category)) {
        score += 10;
        reason += ', suitable for long text elegant display';
      }

      // Ambigram optimization
      if (['arial', 'impact', 'georgia'].includes(font.id)) {
        score += 10;
        reason += ', ambigram effect optimized';
      }

      recommendations.push({
        ...font,
        score,
        reason
      });
    }

    // Sort by score and return all 5 fonts
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  /**
   * Get font preview style
   */
  getFontPreviewStyle(fontId: string): React.CSSProperties {
    const webFonts = this.getWebSafeFonts();
    const font = webFonts.find(f => f.id === fontId);
    
    if (!font) return {};
    
    return {
      fontFamily: font.family,
      fontWeight: font.category === 'display' ? 'bold' : 'normal',
    };
  }
}