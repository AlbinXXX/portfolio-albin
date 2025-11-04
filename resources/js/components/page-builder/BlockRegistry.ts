import { BlockType } from './types';
import { HeroBlock, TextBlock } from '../blocks/ContentBlocks';
import { ColumnsBlock, SpacerBlock } from '../blocks/LayoutBlocks';
import { ImageBlock, GalleryBlock } from '../blocks/MediaBlocks';
import { LiquidEtherBlock } from '../blocks/EffectBlocks';

export const blockRegistry: Record<string, BlockType> = {
  hero: {
    id: 'hero',
    name: 'Hero Section',
    description: 'Large banner section with title, subtitle, and call-to-action',
    category: 'content',
    icon: 'star',
    component: HeroBlock,
    defaultContent: {
      title: 'Your Hero Title',
      subtitle: 'Your compelling subtitle goes here',
      buttonText: 'Get Started',
      buttonLink: '#',
      backgroundImage: '',
    },
    defaultSettings: {
      alignment: 'center',
      theme: 'dark',
      showButton: true,
    },
    settingsSchema: {
      alignment: { type: 'select', options: ['left', 'center', 'right'] },
      theme: { type: 'select', options: ['light', 'dark'] },
      showButton: { type: 'boolean' },
    },
  },

  text: {
    id: 'text',
    name: 'Text Block',
    description: 'Rich text content with formatting options',
    category: 'content',
    icon: 'type',
    component: TextBlock,
    defaultContent: {
      content: 'Your text content goes here. You can edit this to add any text content you need.',
      heading: '',
    },
    defaultSettings: {
      textSize: 'base',
      alignment: 'left',
    },
    settingsSchema: {
      textSize: { type: 'select', options: ['sm', 'base', 'lg', 'xl'] },
      alignment: { type: 'select', options: ['left', 'center', 'right', 'justify'] },
    },
  },

  columns: {
    id: 'columns',
    name: 'Columns',
    description: 'Multi-column layout for organizing content',
    category: 'layout',
    icon: 'columns',
    component: ColumnsBlock,
    defaultContent: {
      columns: [
        { content: 'First column content', heading: 'Column 1' },
        { content: 'Second column content', heading: 'Column 2' },
      ],
    },
    defaultSettings: {
      columnCount: 2,
      gap: 'md',
      verticalAlignment: 'top',
    },
    settingsSchema: {
      gap: { type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
      verticalAlignment: { type: 'select', options: ['top', 'center', 'bottom', 'stretch'] },
    },
  },

  spacer: {
    id: 'spacer',
    name: 'Spacer',
    description: 'Add vertical spacing between content blocks',
    category: 'layout',
    icon: 'minus',
    component: SpacerBlock,
    defaultContent: {},
    defaultSettings: {
      height: 'md',
      showDivider: false,
    },
    settingsSchema: {
      height: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      showDivider: { type: 'boolean' },
    },
  },

  image: {
    id: 'image',
    name: 'Image',
    description: 'Single image with caption and link options',
    category: 'media',
    icon: 'image',
    component: ImageBlock,
    defaultContent: {
      src: '',
      alt: '',
      caption: '',
      link: '',
    },
    defaultSettings: {
      size: 'full',
      alignment: 'center',
      rounded: false,
      shadow: false,
    },
    settingsSchema: {
      size: { type: 'select', options: ['small', 'medium', 'large', 'full'] },
      alignment: { type: 'select', options: ['left', 'center', 'right'] },
      rounded: { type: 'boolean' },
      shadow: { type: 'boolean' },
    },
  },

  gallery: {
    id: 'gallery',
    name: 'Image Gallery',
    description: 'Grid layout for displaying multiple images',
    category: 'media',
    icon: 'grid',
    component: GalleryBlock,
    defaultContent: {
      images: [],
    },
    defaultSettings: {
      columns: 3,
      gap: 'md',
      aspectRatio: 'square',
    },
    settingsSchema: {
      columns: { type: 'select', options: [1, 2, 3, 4, 6] },
      gap: { type: 'select', options: ['sm', 'md', 'lg'] },
      aspectRatio: { type: 'select', options: ['square', 'landscape', 'portrait', 'auto'] },
    },
  },

  liquidEther: {
    id: 'liquidEther',
    name: 'Liquid Ether',
    description: 'Interactive fluid simulation with customizable colors and physics',
    category: 'interactive',
    icon: 'waves',
    component: LiquidEtherBlock,
    defaultContent: {
      mouseForce: 20,
      cursorSize: 100,
      isViscous: false,
      viscous: 30,
      iterationsViscous: 32,
      iterationsPoisson: 32,
      resolution: 0.5,
      isBounce: false,
      colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
      autoDemo: true,
      autoSpeed: 0.5,
      autoIntensity: 2.2,
      takeoverDuration: 0.25,
      autoResumeDelay: 3000,
      autoRampDuration: 0.6,
    },
    defaultSettings: {
      height: 600,
    },
    settingsSchema: {
      height: { type: 'number', min: 200, max: 1000 },
    },
  },
};

export const getBlockType = (id: string): BlockType | null => {
  return blockRegistry[id] || null;
};

export const getBlocksByCategory = (category: string): BlockType[] => {
  return Object.values(blockRegistry).filter(block => block.category === category);
};

export const getAllBlocks = (): BlockType[] => {
  return Object.values(blockRegistry);
};