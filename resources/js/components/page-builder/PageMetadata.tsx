import React from 'react';
import { usePageBuilder } from './PageBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface PageMetadataProps {
  onClose?: () => void;
}

export const PageMetadata: React.FC<PageMetadataProps> = ({ onClose }) => {
  const { pageData, setPageData } = usePageBuilder();

  const handleUpdateTitle = (title: string) => {
    setPageData(prev => ({
      ...prev,
      title,
    }));
  };

  const handleUpdateSlug = (slug: string) => {
    setPageData(prev => ({
      ...prev,
      slug,
    }));
  };

  const handleUpdateMeta = (field: string, value: string) => {
    setPageData(prev => ({
      ...prev,
      meta: {
        ...prev.meta,
        [field]: value,
      },
    }));
  };

  const handleUpdateSettings = (field: string, value: any) => {
    setPageData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Page Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure page metadata and settings
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Page Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="page-title">Page Title</Label>
            <Input
              id="page-title"
              value={pageData.title}
              onChange={(e) => handleUpdateTitle(e.target.value)}
              placeholder="Enter page title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="page-slug">URL Slug</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                /
              </span>
              <Input
                id="page-slug"
                value={pageData.slug}
                onChange={(e) => handleUpdateSlug(e.target.value)}
                placeholder="page-url"
                className="rounded-l-none"
              />
            </div>
            <p className="text-xs text-gray-500">
              This will be the URL of your page: /{pageData.slug}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">SEO & Meta Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              value={pageData.meta.description || ''}
              onChange={(e) => handleUpdateMeta('description', e.target.value)}
              placeholder="A brief description of this page for search engines"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-gray-500">
              {pageData.meta.description?.length || 0}/160 characters
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meta-keywords">Keywords</Label>
            <Input
              id="meta-keywords"
              value={pageData.meta.keywords || ''}
              onChange={(e) => handleUpdateMeta('keywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500">
              Comma-separated keywords for SEO
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Page Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="page-status">Status</Label>
            <select
              id="page-status"
              value={pageData.settings.status || 'draft'}
              onChange={(e) => handleUpdateSettings('status', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="page-layout">Layout</Label>
            <select
              id="page-layout"
              value={pageData.settings.layout || 'default'}
              onChange={(e) => handleUpdateSettings('layout', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="default">Default</option>
              <option value="full-width">Full Width</option>
              <option value="centered">Centered</option>
            </select>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
};