import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Copy, 
  ExternalLink,
  Calendar,
  User
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  meta_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  creator?: {
    name: string;
  };
  updater?: {
    name: string;
  };
}

interface PaginatedPages {
  data: Page[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: Array<{
    url?: string;
    label: string;
    active: boolean;
  }>;
}

interface Props {
  pages: PaginatedPages;
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

export default function Index({ pages }: Props) {
  const handleDelete = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      router.delete(`/admin/pages/${id}`);
    }
  };

  const handleDuplicate = (id: number) => {
    router.post(`/admin/pages/${id}/duplicate`);
  };

  return (
    <AdminLayout>
      <Head title="Pages" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Pages</h1>
            <Link href="/admin/pages/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Page
              </Button>
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pages.total}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {pages.data.filter(p => p.status === 'published').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {pages.data.filter(p => p.status === 'draft').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Archived</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {pages.data.filter(p => p.status === 'archived').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pages Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {pages.data.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No pages created yet.</p>
                  <Link href="/admin/pages/create">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Page
                    </Button>
                  </Link>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.data.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{page.title}</div>
                            <div className="text-sm text-gray-500">
                              /{page.slug}
                            </div>
                            {page.meta_description && (
                              <div className="text-xs text-gray-400 mt-1 max-w-md truncate">
                                {page.meta_description}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(page.status)}
                          >
                            {page.status}
                          </Badge>
                          {page.published_at && (
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDistanceToNow(new Date(page.published_at), { addSuffix: true })}
                            </div>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <User className="w-3 h-3 mr-1" />
                            {page.creator?.name || 'Unknown'}
                          </div>
                          {page.updater && page.updater.name !== page.creator?.name && (
                            <div className="text-xs text-gray-500">
                              Updated by {page.updater.name}
                            </div>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            {formatDistanceToNow(new Date(page.updated_at), { addSuffix: true })}
                          </div>
                        </TableCell>
                        
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {page.status === 'published' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <Link href={`/admin/pages/${page.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                            >
                              <Link href={`/admin/pages/${page.id}/edit`}>
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicate(page.id)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(page.id, page.title)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {pages.last_page > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="flex items-center space-x-2">
                {pages.links.map((link, index) => (
                  <Button
                    key={index}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && router.get(link.url)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}