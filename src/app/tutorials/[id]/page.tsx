'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  image?: string;
  tips?: string[];
  code?: string;
}

interface TutorialDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  author: string;
  publishDate: string;
  tags: string[];
  prerequisites?: string[];
  learningObjectives: string[];
  steps: TutorialStep[];
}

const tutorialData: { [key: string]: TutorialDetail } = {
  '1': {
    id: '1',
    title: 'Ambigram Basics Tutorial',
    description: 'Learn the basic concepts and creation methods of ambigrams from scratch, and master the core principles of ambigram design.',
    category: 'Basic Tutorial',
    difficulty: 'beginner',
    duration: '10 minutes',
    author: 'AmbigramGen Team',
    publishDate: '2025-06-15',
    tags: ['Beginner', 'Basics', 'Concepts'],
    prerequisites: ['No prerequisites'],
    learningObjectives: [
      'Understand the basic concepts and principles of ambigrams',
      'Master the ambigram creation process',
      'Learn to use basic tools and features',
      'Create your first ambigram artwork'
    ],
    steps: [
      {
        id: 1,
        title: 'What is an Ambigram?',
        content: 'An ambigram is a special kind of text design that can be read from different angles (usually rotated 180 degrees) to present the same or different meanings. This art form combines principles of typography, geometry, and optical illusion.',
        tips: [
          'Ambigrams were first popularized by John Langdon in the 1970s.',
          'The most common type is the rotational ambigram, which can still be read after being rotated 180 degrees.',
          'Ambigrams are widely used in logo design, tattoo art, and decorative design.'
        ]
      },
      {
        id: 2,
        title: 'Types of Ambigrams',
        content: 'There are several types of ambigrams: rotational (most common), mirror, figure-ground, etc. Rotational ambigrams present the same or different words when rotated 180 degrees; mirror ambigrams are achieved through reflection; figure-ground ambigrams incorporate graphic elements.',
        tips: [
          'Rotational: Love ↔ Love (still Love after rotation)',
          'Mirror-image: Achieved through horizontal or vertical reflection',
          'Hybrid: Combines multiple transformation methods'
        ]
      },
      {
        id: 3,
        title: 'Using the AmbigramGen Tool',
        content: 'Open the AmbigramGen.com homepage, and you will see a clean input interface. Enter the word or phrase you want to create an ambigram for in the text box, then click the "Generate" button.',
        tips: [
          'It is recommended to start practicing with simple English words.',
          'Avoid using overly long sentences; words with 3-8 letters work best.',
          'You can try meaningful word combinations, like "Love & Life".'
        ]
      },
      {
        id: 4,
        title: 'Adjust and Optimize',
        content: 'After generating the initial ambigram, use the customization panel on the right to adjust parameters like font, size, and spacing. Observe the preview and keep adjusting until you are satisfied.',
        tips: [
          'Font selection is very important; serif fonts are often easier for creating ambigrams.',
          'Adjusting letter spacing appropriately can improve the visual effect.',
          'Using fonts with strong symmetry will yield better results.'
        ]
      },
      {
        id: 5,
        title: 'Save and Share',
        content: 'You can save your finished work as a high-quality image from the download panel. It supports various formats like PNG and SVG to meet different needs.',
        tips: [
          'PNG format is suitable for web sharing and printing.',
          'SVG format is suitable for further editing and scaling.',
          'You can adjust the output dimensions for different uses.'
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Ambigram Techniques for Words of Different Lengths',
    description: 'Master advanced techniques for handling word combinations of different lengths to create more complex and interesting ambigram artworks.',
    category: 'Advanced Techniques',
    difficulty: 'intermediate',
    duration: '15 minutes',
    author: 'AmbigramGen Team',
    publishDate: '2025-06-14',
    tags: ['Advanced', 'Algorithm', 'Techniques'],
    prerequisites: ['Completed Ambigram Basics Tutorial', 'Familiar with basic operations'],
    learningObjectives: [
      'Understand the principles of handling words of different lengths',
      'Master letter correspondence and substitution techniques',
      'Learn to use advanced adjustment features',
      'Create complex ambigram combinations'
    ],
    steps: [
      {
        id: 1,
        title: 'The Challenge of Unequal Lengths',
        content: 'When two words have different lengths, traditional one-to-one letter correspondence no longer applies. This requires more advanced techniques, such as letter combinations, ligatures, and partial overlaps.',
        tips: [
          'Shorter words can be stretched by elongating certain letters to match longer words.',
          'Longer words can be compressed or use ligatures to fit shorter words.',
          'Use letter similarities for clever substitutions.'
        ]
      },
      {
        id: 2,
        title: 'Letter Mapping Strategy',
        content: 'AmbigramGen uses an intelligent algorithm to analyze letter shape similarity and automatically suggest the best letter correspondences. You can also manually adjust these correspondences.',
        tips: [
          'b and q, d and p are natural rotational pairs.',
          'n and u, w and m also have good correspondence.',
          'The numbers 6 and 9 are a perfect rotational pair.'
        ]
      },
      {
        id: 3,
        title: 'Using Ligatures and Flourishes',
        content: 'A ligature is a technique of joining two or more letters into a single character. In ambigrams, clever use of ligatures can solve the problem of length mismatch.',
        tips: [
          'Traditional ligatures like fl, fi are very useful in ambigrams.',
          'Custom ligatures can be created to balance length.',
          'Decorative elements can fill empty spaces.'
        ]
      },
      {
        id: 4,
        title: 'Spatial Distribution Optimization',
        content: 'Adjust letter spacing, line spacing, and overall layout to achieve visual balance between words of different lengths. Using a grid system can help with precise layout control.',
        tips: [
          'Shorter words can use larger letter spacing.',
          'Vertical alignment is easier to handle length differences than horizontal alignment.',
          'Consider using different font sizes to balance visual weight.'
        ]
      },
      {
        id: 5,
        title: 'Application of Advanced Techniques',
        content: 'Combine advanced techniques like font deformation, perspective effects, and shadows to create more visually impactful ambigrams of unequal length.',
        tips: [
          'Gradient effects can enhance visual continuity.',
          'Shadows and 3D effects add a sense of depth.',
          'Color contrast can highlight important parts.'
        ]
      },
      {
        id: 6,
        title: 'Practical Exercise',
        content: 'Try creating an ambigram combination of "Hope" and "Faith". This is a classic exercise for words of unequal length.',
        tips: [
          'First, analyze the letter characteristics of both words.',
          'Identify possible correspondences.',
          'Adjust multiple times until the best effect is achieved.'
        ]
      },
      {
        id: 7,
        title: 'Common Problem Solving',
        content: 'Common issues when dealing with words of unequal length include: visual imbalance, poor readability, and lack of aesthetic appeal. Learn to identify and solve these problems.',
        tips: [
          'If one side is too empty, consider adding decorative elements.',
          'If readability is poor, try adjusting the font or spacing.',
          'Check the visual effect of the work from multiple angles.'
        ]
      },
      {
        id: 8,
        title: 'Finalizing and Exporting the Work',
        content: 'Finally, check all the details of the work to ensure it is clearly readable from both directions, then choose the appropriate format for export.',
        tips: [
          'Zoom in to check the details.',
          'Ask others to help verify readability.',
          'Choose the output format and size suitable for the intended use.'
        ]
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Ambigrams for Tattoo Design',
    description: 'Professional methods for optimizing ambigrams for tattoo design, considering body curves and special tattoo requirements.',
    category: 'Tattoo Design',
    difficulty: 'intermediate',
    duration: '20 minutes',
    author: 'Tattoo Artist Mike',
    publishDate: '2025-06-13',
    tags: ['Tattoo', 'Design', 'Professional'],
    prerequisites: ['Basic knowledge of ambigrams', 'Understanding of basic tattoo concepts'],
    learningObjectives: [
      'Understand the special requirements for tattoo ambigrams',
      'Master the selection of fonts and styles suitable for tattoos',
      'Learn to adjust designs considering body curves',
      'Create professional-grade tattoo ambigram designs'
    ],
    steps: [
      {
        id: 1,
        title: 'The Specifics of Tattoo Ambigrams',
        content: 'Tattoo ambigrams are different from regular ambigrams; they need to consider factors like skin texture, body curves, and long-term durability. Lines should be thicker and contrast stronger.',
        tips: [
          'Tattoos can blur slightly over time, so a margin for error is needed.',
          'Body curves can affect the visual appearance of the text.',
          'Black ink is the most stable; color should be used with caution.'
        ]
      },
      {
        id: 2,
        title: 'Font Selection Principles',
        content: 'For tattoo ambigrams, choose fonts with thicker strokes and clear structures. Avoid overly delicate decorative fonts, prioritizing readability and durability.',
        tips: [
          'Bold fonts look better on skin.',
          'Avoid overly thin lines; a minimum line width of 2-3mm is recommended.',
          'Simple sans-serif fonts are often more suitable.'
        ]
      },
      {
        id: 3,
        title: 'Size and Proportion Considerations',
        content: 'Determine the appropriate size based on the tattoo location. Smaller areas like wrists and ankles require more compact designs, while larger areas like the back and chest can accommodate more complex designs.',
        tips: [
          'Small area tattoos: letter height of 15-25mm is recommended.',
          'Medium area: letter height of 25-50mm.',
          'Large area: can exceed 50mm and include decorative elements.'
        ]
      },
      {
        id: 4,
        title: 'Adapting to Body Curves',
        content: 'Consider the body curves of the tattoo area and adjust the arc and angle of the text. Cylindrical areas like arms and legs require special treatment.',
        tips: [
          'Cylindrical areas: text needs to be slightly curved.',
          'Flat areas: a straight design can be maintained.',
          'Near joints: avoid overly complex designs.'
        ]
      },
      {
        id: 5,
        title: 'Line Thickness Optimization',
        content: 'Adjust line thickness to suit the tattooing process. Main strokes should be thick enough to ensure clarity, while details should be simplified.',
        tips: [
          'Main strokes: 3-5mm width.',
          'Secondary strokes: 2-3mm width.',
          'Decorative lines: 1-2mm width.'
        ]
      },
      {
        id: 6,
        title: 'Contrast and Readability',
        content: 'Enhance black and white contrast to ensure the readability of the ambigram on the skin. Avoid overly complex grayscale variations.',
        tips: [
          'Use pure black as the main color.',
          'Avoid gradient and shadow effects.',
          'Maintain sufficient negative space.'
        ]
      },
      {
        id: 7,
        title: 'Borders and Decorations',
        content: 'Adding borders or decorative elements can enhance the visual effect of the tattoo, but they should be kept simple so as not to affect the readability of the ambigram.',
        tips: [
          'Simple geometric borders work well.',
          'Avoid overly complex patterns.',
          'Decorative elements should coordinate with the main design.'
        ]
      },
      {
        id: 8,
        title: 'Communicating with the Tattoo Artist',
        content: 'When providing the design to the tattoo artist, explain the special requirements of the ambigram to ensure the artist understands the design intent.',
        tips: [
          'Provide a high-resolution design file.',
          'Indicate important size information.',
          'Explain how to read the ambigram.'
        ]
      },
      {
        id: 9,
        title: 'Aftercare Considerations',
        content: 'Consider the effect of the tattoo healing process on the ambigram and provide aftercare advice to maintain the best results.',
        tips: [
          'Avoid excessive stretching of the skin during healing.',
          'Regular moisturizing helps maintain clarity.',
          'Avoid prolonged sun exposure.'
        ]
      },
      {
        id: 10,
        title: 'Case Study and Practice',
        content: 'Analyze successful tattoo ambigram cases, summarize design points, and conduct practical design exercises.',
        tips: [
          'Study the ambigram works of famous tattoo artists.',
          'Analyze design differences for different body parts.',
          'Practice frequently to accumulate experience.'
        ]
      }
    ]
  },
  '4': {
    id: '4',
    title: 'Guide to Creating Chinese Ambigrams',
    description: 'Special handling methods and techniques for Chinese character ambigrams, mastering the essence of creating Hanzi ambigrams.',
    category: 'Chinese Tutorial',
    difficulty: 'advanced',
    duration: '25 minutes',
    author: 'Calligraphy Designer',
    publishDate: '2025-06-12',
    tags: ['Chinese', 'Hanzi', 'Calligraphy'],
    prerequisites: ['Basic knowledge of ambigrams', 'Understanding of Chinese font structures'],
    learningObjectives: [
      'Understand the structural characteristics of Chinese characters',
      'Master the principles of creating Hanzi ambigrams',
      'Learn to handle symmetrical design of complex Chinese characters',
      'Create Chinese ambigrams with cultural connotations'
    ],
    steps: [
      {
        id: 1,
        title: 'The Uniqueness of Chinese Ambigrams',
        content: 'Chinese ambigrams are fundamentally different from Latin alphabet ambigrams. Chinese characters are logograms with complex stroke structures and deep cultural connotations. Creating Chinese ambigrams requires consideration of character aesthetics, cultural meaning, and visual balance.',
        tips: [
          'The square structure of Chinese characters provides a natural advantage for ambigrams.',
          'A deep understanding of the construction principles of Chinese characters is required.',
          'Cultural connotation is an important feature of Chinese ambigrams.'
        ]
      },
      {
        id: 2,
        title: 'Analysis of Chinese Character Structure',
        content: 'Analyze the basic structures of Chinese characters: single-component characters, and compound characters (left-right, top-bottom, enclosing structures, etc.). Different structures have different handling methods in ambigram design.',
        tips: [
          'Single-component characters: e.g., "人" (rén), "大" (dà), are simple and easy to handle symmetrically.',
          'Left-right structure: e.g., "明" (míng), "好" (hǎo), can utilize structural features.',
          'Top-bottom structure: e.g., "思" (sī), "想" (xiǎng), require special balancing techniques.'
        ]
      },
      {
        id: 3,
        title: 'Principle of Stroke Symmetry',
        content: 'Master the symmetrical transformation rules of Chinese character strokes. The correspondence of basic strokes like horizontal, vertical, left-falling, right-falling, and dot after 180-degree rotation, and how to maintain the readability of the character.',
        tips: [
          'A horizontal stroke remains a horizontal stroke after rotation, but its relative position changes.',
          'Left-falling and right-falling strokes are symmetrical to each other, making them a natural rotational pair.',
          'The dot is the most flexible and can be used as a balancing element.'
        ]
      },
      {
        id: 4,
        title: 'Font Selection Strategy',
        content: 'Choose Chinese fonts suitable for ambigram creation. The influence of different font styles like KaiTi, LiSu, and ZhuanShu on the ambigram effect, and how to choose the appropriate font according to design requirements.',
        tips: [
          'KaiTi (Regular Script): Clear strokes, suitable for beginners.',
          'LiSu (Clerical Script): Longer horizontal strokes, conducive to symmetrical design.',
          'ZhuanShu (Seal Script): Symmetrical structure, naturally suitable for ambigram creation.'
        ]
      },
      {
        id: 5,
        title: 'Single-Character Ambigram Techniques',
        content: 'Start practicing with simple single Chinese characters. Choose characters with relatively simple structures and fewer strokes, such as "人" (rén), "大" (dà), "中" (zhōng), to master the basic creation methods.',
        tips: [
          'Start practicing with characters that have strong symmetry.',
          'Pay attention to maintaining the basic features of the character.',
          'Complex strokes can be appropriately simplified.'
        ]
      },
      {
        id: 6,
        title: 'Phrase Ambigram Design',
        content: 'Advance to creating ambigrams with two or more characters. Handle the coordination between different characters, maintaining overall visual balance and cultural connotation.',
        tips: [
          'Choose phrases with related meanings or antithetical parallelism.',
          'Pay attention to the spacing and proportion between characters.',
          'Maintain the overall cultural meaning.'
        ]
      },
      {
        id: 7,
        title: 'Integration of Cultural Connotation',
        content: 'Beyond the technical level, pay more attention to the cultural expression of Chinese ambigrams. Combine traditional Chinese cultural elements, such as Tai Chi, Yin-Yang, and symmetrical aesthetics.',
        tips: [
          'The Yin-Yang symmetrical concept of the Tai Chi diagram can guide the design.',
          'Traditional patterns can be used as decorative elements.',
          'Consider the cultural and symbolic meaning of the characters.'
        ]
      },
      {
        id: 8,
        title: 'Application of Calligraphic Aesthetics',
        content: 'Apply the aesthetic principles of Chinese calligraphy to ambigram design. The variation in stroke thickness, the density of the structure, and the overall dynamic vitality.',
        tips: [
          'Study the "Eight Principles of Yong" in calligraphy.',
          'Pay attention to the flow and connection of strokes.',
          'Pursue an overall rhythmic beauty.'
        ]
      },
      {
        id: 9,
        title: 'Fusion with Modern Design',
        content: 'Combine traditional Hanzi aesthetics with modern design concepts. Use modern design elements such as color, material, and typography to create contemporary Chinese ambigrams.',
        tips: [
          'You can try gradient color effects.',
          'Incorporate modern geometric elements.',
          'Consider the application needs of digital media.'
        ]
      },
      {
        id: 10,
        title: 'Practical Case Analysis',
        content: 'Analyze successful Chinese ambigram cases, such as the ambigram for "爱" (ài) and the phrase "和谐" (héxié), to summarize creation experience and techniques.',
        tips: [
          'Study master-level Chinese ambigram works.',
          'Analyze the design ideas of successful cases.',
          'Summarize reusable design patterns.'
        ]
      },
      {
        id: 11,
        title: 'Use of Tools and Technology',
        content: 'Master the professional tools and techniques for creating Chinese ambigrams, including the use of font design software and digital processing skills.',
        tips: [
          'Become proficient in using font design software.',
          'Master vector graphics processing techniques.',
          'Understand the technical standards for Chinese fonts.'
        ]
      },
      {
        id: 12,
        title: 'Finalizing and Applying the Work',
        content: 'Refine the Chinese ambigram work and consider its practical application scenarios, including print design, digital media applications, and cultural product development.',
        tips: [
          'Consider the display effect on different media.',
          'Pay attention to the market demand for cultural products.',
          'Protect the intellectual property of original designs.'
        ]
      }
    ]
  },
  '5': {
    id: '5',
    title: 'Font Selection and Pairing',
    description: 'How to choose the right font to enhance the ambigram effect, mastering font aesthetics and pairing principles.',
    category: 'Design Theory',
    difficulty: 'beginner',
    duration: '12 minutes',
    author: 'Font Designer',
    publishDate: '2025-06-11',
    tags: ['Font', 'Design', 'Aesthetics'],
    prerequisites: ['Basic Ambigram Concepts'],
    learningObjectives: [
      'Understand the impact of fonts on ambigram effects',
      'Master font classification and characteristics',
      'Learn to choose appropriate fonts based on needs',
      'Master the basic principles of font pairing'
    ],
    steps: [
      {
        id: 1,
        title: 'The Importance of Fonts',
        content: 'Fonts are the foundation of ambigram design. Different fonts produce completely different visual effects and emotional expressions. Choosing the right font is the crucial first step to creating a successful ambigram.',
        tips: [
          'The font determines the overall style of the ambigram.',
          'The readability of different fonts varies greatly.',
          'Font selection should consider the application scenario.'
        ]
      },
      {
        id: 2,
        title: 'Basics of Font Classification',
        content: 'Understand the main font classifications: Serif, Sans-serif, Monospace, Display, and their characteristics.',
        tips: [
          'Serif: traditional, formal, good readability.',
          'Sans-serif: modern, clean, good for screen display.',
          'Display: strong personality, but use with caution.'
        ]
      },
      {
        id: 3,
        title: 'Font Characteristics Suitable for Ambigrams',
        content: 'Analyze the font characteristics suitable for ambigram creation: strong symmetry, clear strokes, stable structure. The natural symmetry of certain letters (like b/q, d/p, n/u).',
        tips: [
          'Choose fonts with moderate stroke weight.',
          'Avoid overly decorative fonts.',
          'Consider the similarity and symmetry between letters.'
        ]
      },
      {
        id: 4,
        title: 'Classic Ambigram Font Recommendations',
        content: 'Introduce some classic fonts that perform well in ambigram creation, such as Times New Roman, Helvetica, Futura, and analyze their advantages.',
        tips: [
          'Times New Roman: a classic choice for serif fonts.',
          'Helvetica: the benchmark for sans-serif fonts.',
          'Futura: strong geometric sense, good symmetry.'
        ]
      },
      {
        id: 5,
        title: 'Font Size and Proportion',
        content: 'Master the principles of choosing font size. Consider factors like application scenario, viewing distance, and media characteristics to determine the appropriate font size and letter spacing.',
        tips: [
          'Small-sized applications require thicker strokes.',
          'Large sizes can show more detail.',
          'Letter spacing affects the overall visual effect.'
        ]
      },
      {
        id: 6,
        title: 'Font Pairing Principles',
        content: 'When multiple fonts are needed, learn the basic principles of font pairing: contrast and harmony, hierarchy and unity, and the balance between function and aesthetics.',
        tips: [
          'Different fonts can be used for main titles and subtitles.',
          'Maintain consistency in the overall style.',
          'Avoid using too many different fonts.'
        ]
      }
    ]
  },
  '6': {
    id: '6',
    title: 'Advanced Customization Techniques',
    description: 'Use advanced features to create unique ambigram artworks and master professional-level creation techniques.',
    category: 'Advanced Techniques',
    difficulty: 'advanced',
    duration: '30 minutes',
    author: 'Advanced Designer',
    publishDate: '2025-06-10',
    tags: ['Advanced', 'Customization', 'Creative'],
    prerequisites: ['Completed all basic and intermediate tutorials', 'Proficient in basic operations'],
    learningObjectives: [
      'Master the use of advanced customization features',
      'Learn to create complex ambigram effects',
      'Master professional-level design techniques',
      'Be able to create commercial-grade ambigram works'
    ],
    steps: [
      {
        id: 1,
        title: 'Overview of Advanced Features',
        content: 'Introduction to AmbigramGen\'s advanced features: custom letter mapping, path editing, effect stacking, batch processing, etc. These features provide professional designers with greater creative freedom.',
        tips: [
          'Advanced features require more design experience.',
          'It is recommended to master the basic functions first.',
          'Multiple advanced features can be combined in creation.'
        ]
      },
      {
        id: 2,
        title: 'Custom Letter Mapping',
        content: 'Learn to manually adjust the correspondence between letters. When the automatic algorithm fails to produce a satisfactory result, manual mapping can achieve more precise control.',
        tips: [
          'Analyze the shape characteristics of each letter.',
          'Consider the balance of visual weight.',
          'Maintain overall coordination.'
        ]
      },
      {
        id: 3,
        title: 'Path Editing Techniques',
        content: 'Use vector path editing functions to precisely adjust the shape and structure of letters. This is a key technique for creating high-quality ambigrams.',
        tips: [
          'Master the use of Bezier curves.',
          'Pay attention to maintaining the readability of the letters.',
          'Appropriate deformation can enhance the effect.'
        ]
      },
      {
        id: 4,
        title: 'Gradient and Texture Effects',
        content: 'Apply advanced visual effects: gradient fills, texture mapping, shadow effects, etc. These effects can greatly enhance the visual impact of the ambigram.',
        tips: [
          'The direction of the gradient should consider the symmetry of the ambigram.',
          'The texture should not be too complex to affect readability.',
          'Shadow effects should be consistent.'
        ]
      },
      {
        id: 5,
        title: '3D Stereoscopic Effects',
        content: 'Create ambigrams with a sense of three-dimensionality. Use techniques like perspective, lighting, and materials to give a flat ambigram a 3D visual effect.',
        tips: [
          'Maintain consistency in perspective.',
          'The direction of the light source should be reasonable.',
          'The 3D effect should not be overly exaggerated.'
        ]
      },
      {
        id: 6,
        title: 'Dynamic Ambigram Design',
        content: 'Explore the creation of dynamic ambigrams. Use animation effects to show the transformation process of the ambigram, increasing interactivity and fun.',
        tips: [
          'The animation rhythm should be moderate.',
          'Maintain the smoothness of the transformation.',
          'Consider the performance of different devices.'
        ]
      },
      {
        id: 7,
        title: 'Batch Processing Techniques',
        content: 'When you need to create a large number of ambigrams, learn to use the batch processing function. Set up templates, apply styles in bulk, automate output, etc.',
        tips: [
          'Establish standardized design templates.',
          'Set batch processing parameters reasonably.',
          'Pay attention to checking the results of batch processing.'
        ]
      },
      {
        id: 8,
        title: 'Application of Color Theory',
        content: 'Gain a deep understanding of the role of color in ambigrams. Advanced color techniques such as color psychology, color schemes, and brand color application.',
        tips: [
          'Understand the psychological effects of different colors.',
          'Master classic color schemes.',
          'Consider the cultural meaning of colors.'
        ]
      },
      {
        id: 9,
        title: 'Brand Application Design',
        content: 'Apply ambigrams to brand design. Consider commercial design requirements such as brand identity, application scenarios, and media adaptation.',
        tips: [
          'Deeply understand the core values of the brand.',
          'Consider the needs of different application scenarios.',
          'Maintain the consistency of the brand image.'
        ]
      },
      {
        id: 10,
        title: 'Technical Output Optimization',
        content: 'Master professional output techniques. Technical details such as choosing different formats, setting resolution, color management, and print adaptation.',
        tips: [
          'Choose the appropriate file format according to the purpose.',
          'Pay attention to color space conversion.',
          'Reserve bleed for printing.'
        ]
      },
      {
        id: 11,
        title: 'Creative Thinking Expansion',
        content: 'Break through traditional thinking and explore the innovative possibilities of ambigrams. Combine with other design elements, cross-disciplinary applications, conceptual innovation, etc.',
        tips: [
          'Observe innovations in other design fields.',
          'Try cross-disciplinary design thinking.',
          'Stay sensitive to new technologies.'
        ]
      },
      {
        id: 12,
        title: 'Portfolio Building',
        content: 'Build a professional ambigram portfolio. Professional requirements such as work selection, presentation methods, case descriptions, and technical documentation.',
        tips: [
          'Select the most representative works.',
          'Record the creation process in detail.',
          'Focus on the diversity of the works displayed.'
        ]
      },
      {
        id: 13,
        title: 'Industry Trend Analysis',
        content: 'Understand the industry trends in ambigram design. The application of new technologies, changes in market demand, future development directions, etc.',
        tips: [
          'Pay attention to the latest developments in the design industry.',
          'Analyze changes in market demand.',
          'Predict trends in technological development.'
        ]
      },
      {
        id: 14,
        title: 'Client Communication Skills',
        content: 'Master professional skills for communicating with clients. Business skills such as needs analysis, proposal presentation, revision suggestions, and project management.',
        tips: [
          'Learn to listen to the real needs of clients.',
          'Present design proposals in a professional manner.',
          'Build good client relationships.'
        ]
      },
      {
        id: 15,
        title: 'Continuous Learning and Improvement',
        content: 'Develop a continuous learning plan. Long-term development strategies such as skill improvement, knowledge updating, industry exchange, and personal brand building.',
        tips: [
          'Establish a systematic learning plan.',
          'Actively participate in industry exchanges.',
          'Constantly challenge your creative limits.'
        ]
      }
    ]
  }
};

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-300 border-red-500/30'
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

export default function TutorialDetailPage() {
  const params = useParams();
  const tutorialId = params.id as string;
  const tutorial = tutorialData[tutorialId];
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!tutorial) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Tutorial Not Found</h1>
          <Link href="/tutorials" className="text-purple-400 hover:text-purple-300">
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < tutorial.steps.length) {
      handleStepComplete(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = tutorial.steps.find(step => step.id === currentStep);
  const progress = (completedSteps.length / tutorial.steps.length) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            href="/tutorials"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tutorials
          </Link>
        </motion.div>

        {/* Tutorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColors[tutorial.difficulty]}`}>
                  {difficultyLabels[tutorial.difficulty]}
                </span>
                <span className="text-gray-400">{tutorial.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{tutorial.steps.length} steps</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {tutorial.title}
              </h1>
              <p className="text-gray-300 text-lg max-w-3xl">
                {tutorial.description}
              </p>
            </div>
          </div>

          {/* Tutorial Meta Info */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Author</h3>
              <p className="text-gray-300">{tutorial.author}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Publish Date</h3>
              <p className="text-gray-300">{tutorial.publishDate}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Category</h3>
              <p className="text-purple-300">{tutorial.category}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Progress</h3>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-700 rounded-full h-2 mr-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-gray-300 text-sm">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Learning Objectives</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {tutorial.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          {tutorial.prerequisites && (
            <div>
              <h3 className="text-white font-semibold mb-3">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {tutorial.prerequisites.map((prereq, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-white font-semibold mb-4">Tutorial Steps</h3>
              <div className="space-y-2">
                {tutorial.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : completedSteps.includes(step.id)
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mr-3">
                        {completedSteps.includes(step.id) ? '✓' : step.id}
                      </span>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              {currentStepData && (
                <>
                  {/* Step Title */}
                  <div className="flex items-center mb-6">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
                      {currentStep}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
                  </div>

                  {/* Step Content */}
                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {currentStepData.content}
                    </p>
                  </div>

                  {/* Code Example */}
                  {currentStepData.code && (
                    <div className="mb-8">
                      <h4 className="text-white font-semibold mb-3">Code Example</h4>
                      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-green-400">{currentStepData.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tips and Tricks */}
                  {currentStepData.tips && (
                    <div className="mb-8">
                      <h4 className="text-white font-semibold mb-3">💡 Tips and Tricks</h4>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <ul className="space-y-2">
                          {currentStepData.tips.map((tip, index) => (
                            <li key={index} className="flex items-start text-blue-200">
                              <svg className="w-4 h-4 text-blue-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        currentStep === 1
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous Step
                    </button>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleStepComplete(currentStep)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          completedSteps.includes(currentStep)
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30'
                        }`}
                      >
                        {completedSteps.includes(currentStep) ? 'Completed' : 'Mark as Complete'}
                      </button>

                      <button
                        onClick={handleNextStep}
                        disabled={currentStep === tutorial.steps.length}
                        className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          currentStep === tutorial.steps.length
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                        }`}
                      >
                        {currentStep === tutorial.steps.length ? 'Completed' : 'Next Step'}
                        {currentStep < tutorial.steps.length && (
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Related Tutorials</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(tutorialData)
              .filter(t => t.id !== tutorialId)
              .slice(0, 3)
              .map((relatedTutorial) => (
                <Link
                  key={relatedTutorial.id}
                  href={`/tutorials/${relatedTutorial.id}`}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20
                           hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[relatedTutorial.difficulty]}`}>
                      {difficultyLabels[relatedTutorial.difficulty]}
                    </span>
                    <span className="text-gray-400 text-sm">{relatedTutorial.duration}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {relatedTutorial.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {relatedTutorial.description}
                  </p>
                  <div className="flex items-center text-purple-300 text-sm">
                    <span>{relatedTutorial.steps.length} steps</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}