import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePageBuilder } from './PageBuilderContext';
import { BlockRenderer } from './BlockRenderer';
import { BlockToolbar } from './BlockToolbar';
import { BlockSidebar } from './BlockSidebar';
import { PageSettings } from './PageSettings';
import { PageMetadata } from './PageMetadata';
import { Button } from '@/components/ui/button';
import { Save, Eye, Settings, Plus, ArrowLeft, Globe } from 'lucide-react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface PageBuilderProps {}

export const PageBuilder: React.FC<PageBuilderProps> = () => {
  const {
    pageData,
    selectedBlockId,
    isEditing,
    pageId,
    setIsEditing,
    reorderBlocks,
    addBlock,
  } = usePageBuilder();

  const [isSaving, setIsSaving] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  const handleSave = async () => {
    if (!pageData.title.trim()) {
      toast.error('Please enter a page title');
      return;
    }

    if (!pageData.slug.trim()) {
      toast.error('Please enter a page slug');
      return;
    }

    setIsSaving(true);

    // Prepare the data to send
    const saveData: any = {
      title: pageData.title,
      slug: pageData.slug,
      meta_description: pageData.meta.description,
      content: JSON.stringify(pageData.blocks),
      settings: JSON.stringify(pageData.settings),
      seo_data: JSON.stringify({
        keywords: pageData.meta.keywords,
        image: pageData.meta.image,
      }),
      status: pageData.settings.status || 'draft',
    };

    // Only add id if we're updating an existing page
    if (pageId) {
      saveData.id = pageId;
    }

    // Use Inertia router for API calls to handle CSRF automatically
    router.post('/admin/pages/api/save', saveData, {
      preserveState: false,
      preserveScroll: false,
      onSuccess: () => {
        toast.success('Page saved successfully!');
      },
      onError: (errors) => {
        console.error('Save errors:', errors);
        toast.error('Failed to save page. Please check your input.');
      },
      onFinish: () => {
        setIsSaving(false);
      }
    });
  };

  const handlePreview = () => {
    if (pageId) {
      window.open(`/preview/page/${pageId}`, '_blank');
    } else if (pageData.slug) {
      window.open(`/${pageData.slug}`, '_blank');
    } else {
      toast.error('Please save the page first to preview it');
    }
  };

  const handleBackToAdmin = () => {
    router.visit('/admin/pages');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pageData.blocks.findIndex(block => block.id === active.id);
      const newIndex = pageData.blocks.findIndex(block => block.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = [...pageData.blocks];
        const [movedBlock] = newBlocks.splice(oldIndex, 1);
        newBlocks.splice(newIndex, 0, movedBlock);
        reorderBlocks(newBlocks);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic if needed
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Block Library */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Page Builder</h2>
          <p className="text-sm text-muted-foreground">
            Drag blocks to build your page
          </p>
        </div>
        <BlockSidebar />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleBackToAdmin}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{pageData.title}</h1>
                <span className="text-sm text-muted-foreground">
                  {pageData.blocks.length} block{pageData.blocks.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMetadata(!showMetadata)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Page Settings
              </Button>

              <Button
                variant={isEditing ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>

              <Button 
                size="sm" 
                variant="outline"
                onClick={handlePreview}
                disabled={!pageData.slug}
              >
                <Globe className="w-4 h-4 mr-2" />
                View Live
              </Button>

              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {pageData.blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="bg-muted/50 rounded-full p-6 mb-4">
                  <Plus className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Building Your Page</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Drag blocks from the sidebar to create your page layout. 
                  You can add text, images, columns, and more.
                </p>
                <Button onClick={() => addBlock('hero')}>
                  Add Hero Section
                </Button>
              </div>
            ) : (
              <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
              >
                <SortableContext
                  items={pageData.blocks.map(block => block.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-0">
                    {pageData.blocks
                      .sort((a, b) => a.order - b.order)
                      .map((block) => (
                        <div key={block.id} className="relative group">
                          <BlockRenderer
                            block={block}
                            isEditing={isEditing}
                            isSelected={selectedBlockId === block.id}
                          />
                          
                          {isEditing && (
                            <BlockToolbar
                              block={block}
                              isSelected={selectedBlockId === block.id}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Block Settings or Page Metadata */}
      {isEditing && (selectedBlockId || showMetadata) && (
        <div className="w-80 border-l bg-card">
          {showMetadata ? (
            <PageMetadata onClose={() => setShowMetadata(false)} />
          ) : (
            <PageSettings />
          )}
        </div>
      )}
    </div>
  );
};