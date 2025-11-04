import React from 'react';
import { BlockProps } from '../page-builder/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const HeroBlock: React.FC<BlockProps> = ({ 
  data, 
  isEditing, 
  isSelected, 
  onUpdate 
}) => {
  const {
    title = 'Your Hero Title',
    subtitle = 'Your compelling subtitle goes here',
    buttonText = 'Get Started',
    buttonLink = '#',
    backgroundImage = '',
  } = data.content;

  const {
    alignment = 'center',
    theme = 'dark',
    showButton = true,
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
          <h3 className="text-lg font-semibold">Edit Hero Block</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                placeholder="Hero title"
              />
            </div>
            
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={subtitle}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                placeholder="Hero subtitle"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={buttonText}
                onChange={(e) => handleContentUpdate('buttonText', e.target.value)}
                placeholder="Button text"
              />
            </div>
            
            <div>
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input
                id="buttonLink"
                value={buttonLink}
                onChange={(e) => handleContentUpdate('buttonLink', e.target.value)}
                placeholder="Button URL"
              />
            </div>

            <div>
              <Label htmlFor="alignment">Text Alignment</Label>
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

            <div>
              <Label htmlFor="theme">Theme</Label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => handleSettingUpdate('theme', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <section 
      className={`py-20 px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`container mx-auto text-${alignment} max-w-4xl`}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {subtitle}
        </p>
        
        {showButton && buttonText && (
          <Button 
            size="lg"
            className={theme === 'dark' ? 'bg-white text-black hover:bg-gray-100' : ''}
            asChild
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>
        )}
      </div>
    </section>
  );
};

export const TextBlock: React.FC<BlockProps> = ({ 
  data, 
  isEditing, 
  isSelected, 
  onUpdate 
}) => {
  const {
    content = 'Your text content goes here. You can edit this to add any text content you need.',
    heading = '',
  } = data.content;

  const {
    textSize = 'base',
    alignment = 'left',
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
          <h3 className="text-lg font-semibold">Edit Text Block</h3>
          
          <div>
            <Label htmlFor="heading">Heading (optional)</Label>
            <Input
              id="heading"
              value={heading}
              onChange={(e) => handleContentUpdate('heading', e.target.value)}
              placeholder="Optional heading"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => handleContentUpdate('content', e.target.value)}
              placeholder="Your text content"
              rows={6}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="textSize">Text Size</Label>
              <select
                id="textSize"
                value={textSize}
                onChange={(e) => handleSettingUpdate('textSize', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="sm">Small</option>
                <option value="base">Base</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
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
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <section className={`py-8 px-6 ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
      <div className={`container mx-auto text-${alignment} max-w-4xl`}>
        {heading && (
          <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        )}
        
        <div className={`${sizeClasses[textSize as keyof typeof sizeClasses]} leading-relaxed`}>
          {content.split('\n').map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};