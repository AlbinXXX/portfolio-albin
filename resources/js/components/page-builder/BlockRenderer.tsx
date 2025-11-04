import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BlockData } from './types';
import { usePageBuilder } from './PageBuilderContext';
import { cn } from '@/lib/utils';

// Import block components
import { HeroBlock, TextBlock } from '../blocks/ContentBlocks';
import { ColumnsBlock, SpacerBlock } from '../blocks/LayoutBlocks';
import { ImageBlock, GalleryBlock } from '../blocks/MediaBlocks';
import { LiquidEtherBlock } from '../blocks/EffectBlocks';

interface BlockRendererProps {
  block: BlockData;
  isEditing: boolean;
  isSelected: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isEditing,
  isSelected,
}) => {
  const { setSelectedBlockId, updateBlock } = usePageBuilder();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.stopPropagation();
      setSelectedBlockId(block.id);
    }
  };

  const handleUpdate = (updates: Partial<BlockData>) => {
    updateBlock(block.id, updates);
  };

  const renderBlock = () => {
    const commonProps = {
      data: block,
      isEditing,
      isSelected,
      onUpdate: handleUpdate,
    };

    switch (block.type) {
      case 'hero':
        return <HeroBlock {...commonProps} />;
      case 'text':
        return <TextBlock {...commonProps} />;
      case 'columns':
        return <ColumnsBlock {...commonProps} />;
      case 'spacer':
        return <SpacerBlock {...commonProps} />;
      case 'image':
        return <ImageBlock {...commonProps} />;
      case 'gallery':
        return <GalleryBlock {...commonProps} />;
      case 'liquidEther':
        return <LiquidEtherBlock {...commonProps} />;
      default:
        return (
          <div className="p-4 bg-muted/20 border-2 border-dashed border-muted">
            <p className="text-center text-muted-foreground">
              Unknown block type: {block.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEditing ? listeners : {})}
      onClick={handleClick}
      className={cn(
        'relative',
        isEditing && 'cursor-pointer',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isDragging && 'opacity-50 z-50',
        isEditing && 'hover:ring-2 hover:ring-muted hover:ring-offset-1'
      )}
    >
      {/* Drag Handle */}
      {isEditing && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-primary text-primary-foreground p-1 rounded text-xs flex items-center gap-1">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </div>
      )}

      {/* Block Content */}
      <div className={cn(
        'min-h-[20px]',
        isEditing && 'border-2 border-transparent',
        isSelected && 'border-primary'
      )}>
        {renderBlock()}
      </div>

      {/* Block Label */}
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
            {block.type}
          </div>
        </div>
      )}
    </div>
  );
};