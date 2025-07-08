// Font assets index file
export const fontAssets = {
  // English fonts
  english: {
    serif: {
      name: 'Times New Roman',
      family: 'serif',
      weight: [400, 700],
      style: ['normal', 'italic'],
      features: ['elegant', 'classic', 'readable']
    },
    sansSerif: {
      name: 'Arial',
      family: 'sans-serif',
      weight: [400, 700],
      style: ['normal', 'italic'],
      features: ['modern', 'clean', 'versatile']
    },
    display: {
      name: 'Impact',
      family: 'fantasy',
      weight: [400, 700],
      style: ['normal'],
      features: ['bold', 'strong', 'attention-grabbing']
    },
    script: {
      name: 'Brush Script MT',
      family: 'cursive',
      weight: [400],
      style: ['normal'],
      features: ['artistic', 'flowing', 'decorative']
    }
  },
  
  // Chinese fonts
  chinese: {
    songti: {
      name: 'SimSun',
      family: 'serif',
      weight: [400, 700],
      style: ['normal'],
      features: ['traditional', 'readable', 'formal']
    },
    heiti: {
      name: 'SimHei',
      family: 'sans-serif',
      weight: [400, 700],
      style: ['normal'],
      features: ['modern', 'clean', 'bold']
    },
    kaiti: {
      name: 'KaiTi',
      family: 'cursive',
      weight: [400],
      style: ['normal'],
      features: ['calligraphy', 'artistic', 'elegant']
    },
    fangsong: {
      name: 'FangSong',
      family: 'serif',
      weight: [400],
      style: ['normal'],
      features: ['traditional', 'scholarly', 'refined']
    }
  },

  // Special ambigram fonts
  ambigram: {
    symmetric: {
      name: 'Ambigram Symmetric',
      family: 'fantasy',
      weight: [400, 700],
      style: ['normal'],
      features: ['symmetric', 'rotatable', 'ambigram-optimized']
    },
    flowing: {
      name: 'Ambigram Flow',
      family: 'cursive',
      weight: [400],
      style: ['normal'],
      features: ['flowing', 'connected', 'artistic']
    }
  }
};

// Font recommendation algorithm
export const getFontRecommendations = (word1: string, word2: string, language: 'en' | 'zh' | 'mixed') => {
  const recommendations = [];
  
  if (language === 'en') {
    // English font recommendations
    recommendations.push(
      fontAssets.english.sansSerif,
      fontAssets.english.serif,
      fontAssets.ambigram.symmetric
    );
  } else if (language === 'zh') {
    // Chinese font recommendations
    recommendations.push(
      fontAssets.chinese.heiti,
      fontAssets.chinese.songti,
      fontAssets.chinese.kaiti
    );
  } else {
    // Mixed language recommendations
    recommendations.push(
      fontAssets.english.sansSerif,
      fontAssets.chinese.heiti,
      fontAssets.ambigram.symmetric
    );
  }
  
  return recommendations;
};