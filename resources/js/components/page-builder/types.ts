export interface BlockData {
  id: string;
  type: string;
  content: Record<string, any>;
  settings: Record<string, any>;
  order: number;
}

export interface PageData {
  id?: string;
  title: string;
  slug: string;
  blocks: BlockData[];
  meta: {
    description?: string;
    keywords?: string;
    image?: string;
  };
  settings: {
    layout?: 'default' | 'full-width' | 'centered';
    theme?: 'light' | 'dark' | 'auto';
    status?: 'draft' | 'published' | 'archived';
  };
}

export interface BlockType {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'layout' | 'media' | 'interactive';
  icon: string;
  component: React.ComponentType<BlockProps>;
  defaultContent: Record<string, any>;
  defaultSettings: Record<string, any>;
  settingsSchema: Record<string, any>;
}

export interface BlockProps {
  data: BlockData;
  isEditing?: boolean;
  isSelected?: boolean;
  onUpdate?: (data: Partial<BlockData>) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
}

export interface DragItem {
  id: string;
  type: string;
  blockType?: string;
  index?: number;
}

export interface PageBuilderContextType {
  pageData: PageData;
  selectedBlockId: string | null;
  isEditing: boolean;
  pageId?: number;
  setPageData: (data: PageData | ((prev: PageData) => PageData)) => void;
  setSelectedBlockId: (id: string | null) => void;
  setIsEditing: (editing: boolean) => void;
  addBlock: (type: string, afterIndex?: number) => void;
  updateBlock: (id: string, data: Partial<BlockData>) => void;
  deleteBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  reorderBlocks: (blocks: BlockData[]) => void;
}