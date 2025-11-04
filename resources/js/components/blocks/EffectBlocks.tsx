import React from 'react';
import { BlockProps } from '../page-builder/types';
import LiquidEther from '../effects/LiquidEther';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function LiquidEtherBlock({ data, isEditing, isSelected, onUpdate }: BlockProps) {
  const { content, settings } = data;

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...(content.colors || ['#5227FF', '#FF9FFC', '#B19EEF'])];
    newColors[index] = color;
    onUpdate?.({ content: { ...content, colors: newColors } });
  };

  const addColor = () => {
    const newColors = [...(content.colors || ['#5227FF', '#FF9FFC', '#B19EEF']), '#000000'];
    onUpdate?.({ content: { ...content, colors: newColors } });
  };

  const removeColor = (index: number) => {
    const newColors = [...(content.colors || ['#5227FF', '#FF9FFC', '#B19EEF'])];
    newColors.splice(index, 1);
    onUpdate?.({ content: { ...content, colors: newColors } });
  };

  if (isEditing && isSelected) {
    return (
      <Card className="p-6 border-2 border-primary">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Edit Liquid Ether Effect</h3>
            <span className="text-sm text-gray-500">Interactive Fluid Simulation</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Settings */}
            <div className="space-y-3">
              <h4 className="font-medium">Basic Settings</h4>
              
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.height || 600}
                  onChange={(e) => onUpdate?.({ settings: { ...settings, height: parseInt(e.target.value) } })}
                  min="200"
                  max="1000"
                />
              </div>
              
              <div>
                <Label htmlFor="mouseForce">Mouse Force</Label>
                <Input
                  id="mouseForce"
                  type="number"
                  value={content.mouseForce || 20}
                  onChange={(e) => onUpdate?.({ content: { ...content, mouseForce: parseFloat(e.target.value) } })}
                  min="1"
                  max="100"
                  step="1"
                />
              </div>
              
              <div>
                <Label htmlFor="cursorSize">Cursor Size</Label>
                <Input
                  id="cursorSize"
                  type="number"
                  value={content.cursorSize || 100}
                  onChange={(e) => onUpdate?.({ content: { ...content, cursorSize: parseFloat(e.target.value) } })}
                  min="10"
                  max="500"
                  step="10"
                />
              </div>
              
              <div>
                <Label htmlFor="resolution">Resolution</Label>
                <Select
                  value={content.resolution?.toString() || '0.5'}
                  onValueChange={(value) => onUpdate?.({ content: { ...content, resolution: parseFloat(value) } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.25">Low (0.25)</SelectItem>
                    <SelectItem value="0.5">Medium (0.5)</SelectItem>
                    <SelectItem value="0.75">High (0.75)</SelectItem>
                    <SelectItem value="1.0">Ultra (1.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-3">
              <h4 className="font-medium">Advanced Settings</h4>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={content.autoDemo || true}
                  onCheckedChange={(checked: boolean) => onUpdate?.({ content: { ...content, autoDemo: checked } })}
                />
                <Label>Auto Demo Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={content.isViscous || false}
                  onCheckedChange={(checked: boolean) => onUpdate?.({ content: { ...content, isViscous: checked } })}
                />
                <Label>Enable Viscosity</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={content.isBounce || false}
                  onCheckedChange={(checked: boolean) => onUpdate?.({ content: { ...content, isBounce: checked } })}
                />
                <Label>Boundary Bounce</Label>
              </div>
              
              {content.autoDemo && (
                <>
                  <div>
                    <Label htmlFor="autoSpeed">Auto Speed</Label>
                    <Input
                      id="autoSpeed"
                      type="number"
                      value={content.autoSpeed || 0.5}
                      onChange={(e) => onUpdate?.({ content: { ...content, autoSpeed: parseFloat(e.target.value) } })}
                      min="0.1"
                      max="2"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="autoIntensity">Auto Intensity</Label>
                    <Input
                      id="autoIntensity"
                      type="number"
                      value={content.autoIntensity || 2.2}
                      onChange={(e) => onUpdate?.({ content: { ...content, autoIntensity: parseFloat(e.target.value) } })}
                      min="0.5"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </>
              )}
              
              {content.isViscous && (
                <div>
                  <Label htmlFor="viscous">Viscosity</Label>
                  <Input
                    id="viscous"
                    type="number"
                    value={content.viscous || 30}
                    onChange={(e) => onUpdate?.({ content: { ...content, viscous: parseFloat(e.target.value) } })}
                    min="1"
                    max="100"
                    step="1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-3">
            <h4 className="font-medium">Color Palette</h4>
            <div className="space-y-2">
              {(content.colors || ['#5227FF', '#FF9FFC', '#B19EEF']).map((color: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="w-10 h-8 rounded border"
                  />
                  <Input
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                  />
                  {(content.colors || []).length > 1 && (
                    <button
                      onClick={() => removeColor(index)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addColor}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
              >
                Add Color
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h4 className="font-medium">Preview</h4>
            <div 
              className="border rounded overflow-hidden"
              style={{ height: `${Math.min(settings.height || 600, 300)}px` }}
            >
              <LiquidEther
                mouseForce={content.mouseForce || 20}
                cursorSize={content.cursorSize || 100}
                isViscous={content.isViscous || false}
                viscous={content.viscous || 30}
                resolution={content.resolution || 0.5}
                isBounce={content.isBounce || false}
                colors={content.colors || ['#5227FF', '#FF9FFC', '#B19EEF']}
                autoDemo={content.autoDemo || true}
                autoSpeed={content.autoSpeed || 0.5}
                autoIntensity={content.autoIntensity || 2.2}
                takeoverDuration={content.takeoverDuration || 0.25}
                autoResumeDelay={content.autoResumeDelay || 3000}
                autoRampDuration={content.autoRampDuration || 0.6}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Editing preview (when in editing mode but not selected)
  if (isEditing) {
    return (
      <div 
        className={`relative ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
        style={{ width: '100%', height: settings.height || 600, position: 'relative' }}
      >
        <div className="absolute inset-0 border-2 border-dashed border-gray-300 bg-gray-50/20 flex items-center justify-center">
          <div className="text-center p-4 bg-white/90 rounded-lg shadow-sm">
            <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Liquid Ether Effect</h3>
            <p className="text-sm text-gray-500">Interactive Fluid Simulation</p>
            <p className="text-xs text-gray-400 mt-1">Click to configure</p>
          </div>
        </div>
      </div>
    );
  }

  // Production render
  return (
    <div style={{ width: '100%', height: settings.height || 600, position: 'relative' }}>
      <LiquidEther
        mouseForce={content.mouseForce || 20}
        cursorSize={content.cursorSize || 100}
        isViscous={content.isViscous || false}
        viscous={content.viscous || 30}
        iterationsViscous={content.iterationsViscous || 32}
        iterationsPoisson={content.iterationsPoisson || 32}
        resolution={content.resolution || 0.5}
        isBounce={content.isBounce || false}
        colors={content.colors || ['#5227FF', '#FF9FFC', '#B19EEF']}
        autoDemo={content.autoDemo || true}
        autoSpeed={content.autoSpeed || 0.5}
        autoIntensity={content.autoIntensity || 2.2}
        takeoverDuration={content.takeoverDuration || 0.25}
        autoResumeDelay={content.autoResumeDelay || 3000}
        autoRampDuration={content.autoRampDuration || 0.6}
        className="w-full h-full"
      />
    </div>
  );
}