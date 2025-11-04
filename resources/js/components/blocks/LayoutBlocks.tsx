import React from 'react';
import { BlockProps } from '../page-builder/types';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const ColumnsBlock: React.FC<BlockProps> = ({ 
  data, 
  isEditing, 
  isSelected, 
  onUpdate 
}) => {
  const {
    columns = [
      { content: 'First column content', heading: 'Column 1' },
      { content: 'Second column content', heading: 'Column 2' },
    ],
  } = data.content;

  const {
    columnCount = 2,
    gap = 'md',
    verticalAlignment = 'top',
  } = data.settings;

  const handleContentUpdate = (field: string, value: any) => {
    onUpdate?.({
      content: {
        ...data.content,
        [field]: value,
      },
    });
  };

  const handleSettingUpdate = (field: string, value: any) => {
    onUpdate?.({
      settings: {
        ...data.settings,
        [field]: value,
      },
    });
  };

  const updateColumn = (index: number, field: string, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    handleContentUpdate('columns', newColumns);
  };

  const addColumn = () => {
    const newColumns = [...columns, { content: 'New column content', heading: `Column ${columns.length + 1}` }];
    handleContentUpdate('columns', newColumns);
    handleSettingUpdate('columnCount', newColumns.length);
  };

  const removeColumn = (index: number) => {
    if (columns.length <= 1) return;
    const newColumns = columns.filter((_: any, i: number) => i !== index);
    handleContentUpdate('columns', newColumns);
    handleSettingUpdate('columnCount', newColumns.length);
  };

  if (isEditing && isSelected) {
    return (
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Edit Columns Block</h3>
            <Button onClick={addColumn} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Column
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="gap">Column Gap</Label>
              <select
                id="gap"
                value={gap}
                onChange={(e) => handleSettingUpdate('gap', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            <div>
              <Label htmlFor="verticalAlignment">Vertical Alignment</Label>
              <select
                id="verticalAlignment"
                value={verticalAlignment}
                onChange={(e) => handleSettingUpdate('verticalAlignment', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
                <option value="stretch">Stretch</option>
              </select>
            </div>

            <div className="flex items-end">
              <span className="text-sm text-muted-foreground">
                {columns.length} column{columns.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {columns.map((column: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Column {index + 1}</h4>
                  {columns.length > 1 && (
                    <Button 
                      onClick={() => removeColumn(index)} 
                      size="sm" 
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`heading-${index}`}>Heading</Label>
                    <input
                      id={`heading-${index}`}
                      value={column.heading}
                      onChange={(e) => updateColumn(index, 'heading', e.target.value)}
                      placeholder="Column heading"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`content-${index}`}>Content</Label>
                    <Textarea
                      id={`content-${index}`}
                      value={column.content}
                      onChange={(e) => updateColumn(index, 'content', e.target.value)}
                      placeholder="Column content"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const alignmentClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
    stretch: 'items-stretch',
  };

  return (
    <section className={`py-8 px-6 ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <div className="container mx-auto max-w-6xl">
        <div className={`grid md:grid-cols-${Math.min(columns.length, 4)} ${gapClasses[gap as keyof typeof gapClasses]} ${alignmentClasses[verticalAlignment as keyof typeof alignmentClasses]}`}>
          {columns.map((column: any, index: number) => (
            <div key={index} className="space-y-4">
              {column.heading && (
                <h3 className="text-xl font-semibold">{column.heading}</h3>
              )}
              
              <div className="text-base leading-relaxed">
                {column.content.split('\n').map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SpacerBlock: React.FC<BlockProps> = ({ 
  data, 
  isEditing, 
  isSelected, 
  onUpdate 
}) => {
  const {
    height = 'md',
    showDivider = false,
  } = data.settings;

  const handleSettingUpdate = (field: string, value: any) => {
    onUpdate?.({
      settings: {
        ...data.settings,
        [field]: value,
      },
    });
  };

  if (isEditing && isSelected) {
    return (
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Edit Spacer Block</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height</Label>
              <select
                id="height"
                value={height}
                onChange={(e) => handleSettingUpdate('height', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="xs">Extra Small (1rem)</option>
                <option value="sm">Small (2rem)</option>
                <option value="md">Medium (4rem)</option>
                <option value="lg">Large (6rem)</option>
                <option value="xl">Extra Large (8rem)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="showDivider"
                type="checkbox"
                checked={showDivider}
                onChange={(e) => handleSettingUpdate('showDivider', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="showDivider">Show Divider</Label>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const heightClasses = {
    xs: 'h-4',
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24',
    xl: 'h-32',
  };

  return (
    <section className={`${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <div className={`w-full ${heightClasses[height as keyof typeof heightClasses]} flex items-center justify-center`}>
        {showDivider && (
          <div className="w-full max-w-4xl mx-auto px-6">
            <hr className="border-border" />
          </div>
        )}
      </div>
    </section>
  );
};