import React from 'react';
import { BlockData } from './types';
import { usePageBuilder } from './PageBuilderContext';
import { Button } from '@/components/ui/button';
import { 
  Move, 
  Copy, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Settings,
  GripVertical 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockToolbarProps {
  block: BlockData;
  isSelected: boolean;
}

export const BlockToolbar: React.FC<BlockToolbarProps> = ({
  block,
  isSelected,
}) => {
  const { 
    deleteBlock, 
    duplicateBlock, 
    moveBlock, 
    setSelectedBlockId,
    pageData 
  } = usePageBuilder();

  const blockIndex = pageData.blocks.findIndex(b => b.id === block.id);
  const isFirst = blockIndex === 0;
  const isLast = blockIndex === pageData.blocks.length - 1;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBlock(block.id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBlock(block.id);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    moveBlock(block.id, 'up');
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    moveBlock(block.id, 'down');
  };

  const handleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBlockId(block.id);
  };

  return (
    <div className={cn(
      'absolute top-2 left-2 flex items-center gap-1 opacity-0 transition-opacity',
      'group-hover:opacity-100',
      isSelected && 'opacity-100'
    )}>
      <div className="flex items-center bg-background border rounded-md shadow-lg">
        {/* Drag Handle */}
        <div className="p-1 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Move Up */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMoveUp}
          disabled={isFirst}
          className="h-8 w-8 p-0"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>

        {/* Move Down */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMoveDown}
          disabled={isLast}
          className="h-8 w-8 p-0"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSettings}
          className={cn(
            'h-8 w-8 p-0',
            isSelected && 'bg-primary text-primary-foreground'
          )}
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* Duplicate */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDuplicate}
          className="h-8 w-8 p-0"
        >
          <Copy className="w-4 h-4" />
        </Button>

        {/* Delete */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};