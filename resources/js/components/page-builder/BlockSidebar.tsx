import React from 'react';
import { usePageBuilder } from './PageBuilderContext';
import { blockRegistry } from './BlockRegistry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  FileText, 
  Image, 
  Layout,
  Type,
  Columns,
  Space,
  Images,
  Waves,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryIcons = {
  content: FileText,
  layout: Layout,
  media: Image,
  interactive: Zap,
};

const blockIcons = {
  hero: Type,
  text: FileText,
  columns: Columns,
  spacer: Space,
  image: Image,
  gallery: Images,
  liquidEther: Waves,
};

export const BlockSidebar: React.FC = () => {
  const { addBlock } = usePageBuilder();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(Object.values(blockRegistry).map(block => block.category))
  );

  // Filter blocks
  const filteredBlocks = Object.entries(blockRegistry).filter(([key, block]) => {
    const matchesSearch = !searchTerm || 
      block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || block.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddBlock = (blockType: string) => {
    addBlock(blockType);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                {category}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-2">
          {filteredBlocks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blocks found</p>
            </div>
          ) : (
            filteredBlocks.map(([blockType, blockInfo]) => {
              const IconComponent = blockIcons[blockType as keyof typeof blockIcons] || Plus;
              
              return (
                <div
                  key={blockType}
                  className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleAddBlock(blockType)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{blockInfo.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {blockInfo.category}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {blockInfo.description}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddBlock(blockType);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-muted/20">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Add</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddBlock('hero')}
              className="justify-start"
            >
              <Type className="w-4 h-4 mr-2" />
              Hero
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddBlock('text')}
              className="justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddBlock('image')}
              className="justify-start"
            >
              <Image className="w-4 h-4 mr-2" />
              Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddBlock('columns')}
              className="justify-start"
            >
              <Columns className="w-4 h-4 mr-2" />
              Columns
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};