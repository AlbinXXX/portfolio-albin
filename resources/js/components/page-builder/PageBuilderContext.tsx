import React, { createContext, useContext, useState, useCallback } from 'react';
import { PageData, BlockData, PageBuilderContextType } from './types';

const PageBuilderContext = createContext<PageBuilderContextType | null>(null);

export const usePageBuilder = () => {
  const context = useContext(PageBuilderContext);
  if (!context) {
    throw new Error('usePageBuilder must be used within a PageBuilderProvider');
  }
  return context;
};

interface PageBuilderProviderProps {
  children: React.ReactNode;
  initialData?: PageData;
  pageId?: number;
}

export const PageBuilderProvider: React.FC<PageBuilderProviderProps> = ({
  children,
  initialData,
  pageId,
}) => {
  const [pageData, setPageData] = useState<PageData>(
    initialData || {
      title: 'New Page',
      slug: 'new-page',
      blocks: [],
      meta: {},
      settings: {
        layout: 'default',
        theme: 'auto',
      },
    }
  );

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const generateId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addBlock = useCallback((blockType: string, afterIndex?: number) => {
    const newBlock: BlockData = {
      id: generateId(),
      type: blockType,
      content: {},
      settings: {},
      order: afterIndex !== undefined ? afterIndex + 1 : pageData.blocks.length,
    };

    setPageData(prev => {
      const newBlocks = [...prev.blocks];
      if (afterIndex !== undefined) {
        newBlocks.splice(afterIndex + 1, 0, newBlock);
        // Reorder subsequent blocks
        newBlocks.forEach((block, index) => {
          block.order = index;
        });
      } else {
        newBlocks.push(newBlock);
      }

      return {
        ...prev,
        blocks: newBlocks,
      };
    });

    setSelectedBlockId(newBlock.id);
  }, [pageData.blocks.length]);

  const updateBlock = useCallback((id: string, data: Partial<BlockData>) => {
    setPageData(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === id ? { ...block, ...data } : block
      ),
    }));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setPageData(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== id).map((block, index) => ({
        ...block,
        order: index,
      })),
    }));
    
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const duplicateBlock = useCallback((id: string) => {
    const blockToDuplicate = pageData.blocks.find(block => block.id === id);
    if (!blockToDuplicate) return;

    const duplicatedBlock: BlockData = {
      ...blockToDuplicate,
      id: generateId(),
      order: blockToDuplicate.order + 1,
    };

    setPageData(prev => {
      const newBlocks = [...prev.blocks];
      const insertIndex = newBlocks.findIndex(block => block.id === id) + 1;
      newBlocks.splice(insertIndex, 0, duplicatedBlock);
      
      // Reorder subsequent blocks
      newBlocks.forEach((block, index) => {
        block.order = index;
      });

      return {
        ...prev,
        blocks: newBlocks,
      };
    });

    setSelectedBlockId(duplicatedBlock.id);
  }, [pageData.blocks]);

  const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
    setPageData(prev => {
      const blocks = [...prev.blocks];
      const currentIndex = blocks.findIndex(block => block.id === id);
      
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0 || newIndex >= blocks.length) return prev;
      
      // Swap blocks
      [blocks[currentIndex], blocks[newIndex]] = [blocks[newIndex], blocks[currentIndex]];
      
      // Update order
      blocks.forEach((block, index) => {
        block.order = index;
      });

      return {
        ...prev,
        blocks,
      };
    });
  }, []);

  const reorderBlocks = useCallback((blocks: BlockData[]) => {
    setPageData(prev => ({
      ...prev,
      blocks: blocks.map((block, index) => ({
        ...block,
        order: index,
      })),
    }));
  }, []);

  const value: PageBuilderContextType = {
    pageData,
    selectedBlockId,
    isEditing,
    pageId,
    setPageData,
    setSelectedBlockId,
    setIsEditing,
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    moveBlock,
    reorderBlocks,
  };

  return (
    <PageBuilderContext.Provider value={value}>
      {children}
    </PageBuilderContext.Provider>
  );
};