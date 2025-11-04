import React, { useState } from 'react';
import { BlockProps } from '../page-builder/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const ImageBlock: React.FC<BlockProps> = ({ 
  data, 
  isEditing, 
  isSelected, 
  onUpdate 
}) => {
  const {
    src = '',
    alt = '',
    caption = '',
    link = '',
  } = data.content;

  const {
    size = 'full',
    alignment = 'center',
    rounded = false,
    shadow = false,
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

  if (isEditing && isSelected) {
    return (
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Edit Image Block</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={src}
                onChange={(e) => handleContentUpdate('src', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={alt}
                onChange={(e) => handleContentUpdate('alt', e.target.value)}
                placeholder="Describe the image"
              />
            </div>
            
            <div>
              <Label htmlFor="link">Link (optional)</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => handleContentUpdate('link', e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => handleContentUpdate('caption', e.target.value)}
                placeholder="Image caption"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="size">Size</Label>
              <select
                id="size"
                value={size}
                onChange={(e) => handleSettingUpdate('size', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="full">Full Width</option>
              </select>
            </div>

            <div>
              <Label htmlFor="alignment">Alignment</Label>
              <select
                id="alignment"
                value={alignment}
                onChange={(e) => handleSettingUpdate('alignment', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  id="rounded"
                  type="checkbox"
                  checked={rounded}
                  onChange={(e) => handleSettingUpdate('rounded', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="rounded">Rounded</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="shadow"
                  type="checkbox"
                  checked={shadow}
                  onChange={(e) => handleSettingUpdate('shadow', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="shadow">Shadow</Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-2xl',
    full: 'w-full',
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const imageClasses = [
    sizeClasses[size as keyof typeof sizeClasses],
    rounded ? 'rounded-lg' : '',
    shadow ? 'shadow-lg' : '',
  ].filter(Boolean).join(' ');

  if (!src) {
    return (
      <section className={`py-8 px-6 ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
        <div className={`container mx-auto ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}>
          <div className={`${sizeClasses[size as keyof typeof sizeClasses]} mx-auto bg-muted border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center py-12`}>
            <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No image selected</p>
          </div>
        </div>
      </section>
    );
  }

  const imageElement = (
    <img
      src={src}
      alt={alt}
      className={imageClasses}
    />
  );

  return (
    <section className={`py-8 px-6 ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <div className={`container mx-auto ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}>
        <div className={size !== 'full' ? 'inline-block' : ''}>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {imageElement}
            </a>
          ) : (
            imageElement
          )}
          
          {caption && (
            <p className="mt-2 text-sm text-muted-foreground italic">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export const GalleryBlock: React.FC<BlockProps> = ({ 
  data, 
  isEditing, 
  isSelected, 
  onUpdate 
}) => {
  const {
    images = [],
  } = data.content;

  const {
    columns = 3,
    gap = 'md',
    aspectRatio = 'square',
  } = data.settings;

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

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

  const addImage = () => {
    if (!newImageUrl.trim()) return;
    
    const newImage = {
      src: newImageUrl,
      alt: newImageAlt || 'Gallery image',
      caption: '',
    };
    
    handleContentUpdate('images', [...images, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    handleContentUpdate('images', newImages);
  };

  const updateImage = (index: number, field: string, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    handleContentUpdate('images', newImages);
  };

  if (isEditing && isSelected) {
    return (
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Edit Gallery Block</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="columns">Columns</Label>
              <select
                id="columns"
                value={columns}
                onChange={(e) => handleSettingUpdate('columns', parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
              </select>
            </div>

            <div>
              <Label htmlFor="gap">Gap</Label>
              <select
                id="gap"
                value={gap}
                onChange={(e) => handleSettingUpdate('gap', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div>
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <select
                id="aspectRatio"
                value={aspectRatio}
                onChange={(e) => handleSettingUpdate('aspectRatio', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="square">Square</option>
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Add New Image</h4>
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Image URL"
                className="flex-1"
              />
              <Input
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="Alt text"
                className="flex-1"
              />
              <Button onClick={addImage} size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {images.map((image: any, index: number) => (
              <Card key={index} className="p-3">
                <div className="flex gap-2 items-start">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-16 h-16 object-cover rounded" 
                  />
                  <div className="flex-1 space-y-2">
                    <Input
                      value={image.alt}
                      onChange={(e) => updateImage(index, 'alt', e.target.value)}
                      placeholder="Alt text"
                      size={1}
                    />
                    <Input
                      value={image.caption || ''}
                      onChange={(e) => updateImage(index, 'caption', e.target.value)}
                      placeholder="Caption (optional)"
                      size={1}
                    />
                  </div>
                  <Button 
                    onClick={() => removeImage(index)} 
                    size="sm" 
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (images.length === 0) {
    return (
      <section className={`py-8 px-6 ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
        <div className="container mx-auto text-center">
          <div className="bg-muted border-2 border-dashed border-border rounded-lg py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No images in gallery</p>
          </div>
        </div>
      </section>
    );
  }

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <section className={`py-8 px-6 ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <div className="container mx-auto">
        <div className={`grid grid-cols-${columns} ${gapClasses[gap as keyof typeof gapClasses]}`}>
          {images.map((image: any, index: number) => (
            <div key={index} className="group">
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover rounded-lg ${aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses]}`}
              />
              {image.caption && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};