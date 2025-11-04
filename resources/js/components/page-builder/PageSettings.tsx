import React from 'react';
import { usePageBuilder } from './PageBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

export const PageSettings: React.FC = () => {
  const { 
    selectedBlockId, 
    pageData, 
    updateBlock, 
    setSelectedBlockId,
    deleteBlock 
  } = usePageBuilder();

  const selectedBlock = pageData.blocks.find(block => block.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Select a block to edit its settings</p>
        </div>
      </div>
    );
  }

  const handleContentUpdate = (field: string, value: any) => {
    updateBlock(selectedBlock.id, {
      content: {
        ...selectedBlock.content,
        [field]: value,
      },
    });
  };

  const handleSettingsUpdate = (field: string, value: any) => {
    updateBlock(selectedBlock.id, {
      settings: {
        ...selectedBlock.settings,
        [field]: value,
      },
    });
  };

  const handleDelete = () => {
    deleteBlock(selectedBlock.id);
  };

  // Get common content fields based on block type
  const getContentFields = () => {
    switch (selectedBlock.type) {
      case 'hero':
        return [
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Enter hero title' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Enter subtitle' },
          { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Button text' },
          { key: 'buttonLink', label: 'Button Link', type: 'url', placeholder: 'https://...' },
        ];
      case 'text':
        return [
          { key: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter your text content' },
        ];
      case 'image':
        return [
          { key: 'src', label: 'Image URL', type: 'url', placeholder: 'https://...' },
          { key: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Describe the image' },
          { key: 'caption', label: 'Caption', type: 'text', placeholder: 'Optional caption' },
        ];
      case 'spacer':
        return [
          { key: 'height', label: 'Height (px)', type: 'number', placeholder: '40' },
        ];
      default:
        return [];
    }
  };

  const contentFields = getContentFields();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold capitalize">{selectedBlock.type} Block</h3>
            <p className="text-sm text-muted-foreground">
              Configure block settings
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedBlockId(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Content Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contentFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={`content-${field.key}`}>{field.label}</Label>
                
                {field.type === 'text' && (
                  <Input
                    id={`content-${field.key}`}
                    value={selectedBlock.content[field.key] || ''}
                    onChange={(e) => handleContentUpdate(field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
                
                {field.type === 'textarea' && (
                  <Textarea
                    id={`content-${field.key}`}
                    value={selectedBlock.content[field.key] || ''}
                    onChange={(e) => handleContentUpdate(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                )}
                
                {field.type === 'url' && (
                  <Input
                    id={`content-${field.key}`}
                    type="url"
                    value={selectedBlock.content[field.key] || ''}
                    onChange={(e) => handleContentUpdate(field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
                
                {field.type === 'number' && (
                  <Input
                    id={`content-${field.key}`}
                    type="number"
                    value={selectedBlock.content[field.key] || ''}
                    onChange={(e) => handleContentUpdate(field.key, Number(e.target.value))}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            
            {contentFields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                This block type doesn't have configurable content settings.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Style Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Style</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <select
                id="padding"
                value={selectedBlock.settings.padding || 'medium'}
                onChange={(e) => handleSettingsUpdate('padding', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alignment">Text Alignment</Label>
              <select
                id="alignment"
                value={selectedBlock.settings.alignment || 'left'}
                onChange={(e) => handleSettingsUpdate('alignment', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <Separator />
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="w-full"
          >
            Delete Block
          </Button>
        </div>
      </div>
    </div>
  );
};