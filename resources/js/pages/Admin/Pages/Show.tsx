import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Eye, ExternalLink, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Page {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  content: any[];
  settings: any;
  seo_data: any;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  published_at?: string;
  creator?: {
    name: string;
  };
  updater?: {
    name: string;
  };
}

interface Props {
  page: Page;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'draft':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'archived':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function Show({ page }: Props) {
  return (
    <AdminLayout>
      <Head title={`${page.title} - View Page`} />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/pages">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Pages
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{page.title}</h1>
                <p className="text-sm text-gray-500">/{page.slug}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getStatusColor(page.status)}>
                {page.status}
              </Badge>
              
              <Link href={`/preview/page/${page.id}`} target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </Link>
              
              {page.status === 'published' && (
                <Link href={`/${page.slug}`} target="_blank">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                </Link>
              )}
              
              <Link href={`/admin/pages/${page.id}/edit`}>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Page
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Page Content Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Page Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {page.content && page.content.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        This page contains {page.content.length} block{page.content.length !== 1 ? 's' : ''}:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {page.content.map((block, index) => (
                          <div key={block.id || index} className="p-2 bg-gray-50 rounded text-sm">
                            <span className="font-medium capitalize">{block.type}</span>
                            {block.content?.title && (
                              <div className="text-gray-500 truncate">
                                {block.content.title}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>This page has no content blocks yet.</p>
                      <Link href={`/admin/pages/${page.id}/edit`}>
                        <Button variant="outline" size="sm" className="mt-2">
                          Add Content
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SEO & Meta */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO & Meta Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Meta Description</label>
                      <p className="mt-1 text-sm text-gray-600">
                        {page.meta_description || 'No meta description set'}
                      </p>
                    </div>
                    
                    {page.seo_data?.keywords && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Keywords</label>
                        <p className="mt-1 text-sm text-gray-600">{page.seo_data.keywords}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Publishing */}
              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">
                        <Badge variant="outline" className={getStatusColor(page.status)}>
                          {page.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {page.published_at && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Published</label>
                        <div className="mt-1 text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDistanceToNow(new Date(page.published_at), { addSuffix: true })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Page Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Page Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created</label>
                      <div className="mt-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDistanceToNow(new Date(page.created_at), { addSuffix: true })}
                        </div>
                        {page.creator && (
                          <div className="flex items-center mt-1">
                            <User className="w-4 h-4 mr-1" />
                            {page.creator.name}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Updated</label>
                      <div className="mt-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDistanceToNow(new Date(page.updated_at), { addSuffix: true })}
                        </div>
                        {page.updater && (
                          <div className="flex items-center mt-1">
                            <User className="w-4 h-4 mr-1" />
                            {page.updater.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Layout</label>
                      <p className="mt-1 text-sm text-gray-600 capitalize">
                        {page.settings?.layout || 'Default'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Theme</label>
                      <p className="mt-1 text-sm text-gray-600 capitalize">
                        {page.settings?.theme || 'Auto'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}