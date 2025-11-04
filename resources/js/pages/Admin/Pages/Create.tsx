import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Palette } from 'lucide-react';

export default function Create() {
  return (
    <AdminLayout>
      <Head title="Create Page" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Link href="/admin/pages" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Pages
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Create New Page</h1>
          </div>

          {/* Create Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-md">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Page Builder</CardTitle>
                    <p className="text-sm text-gray-500">
                      Create a page using the visual page builder
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Build your page visually with drag-and-drop blocks including hero sections, 
                  text, images, columns, and more. Perfect for landing pages and content pages.
                </p>
                <Link href="/page-builder">
                  <Button className="w-full">
                    Start Building
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow opacity-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle>Blank Page</CardTitle>
                    <p className="text-sm text-gray-500">
                      Start with a blank page (Coming Soon)
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Create a page from scratch with basic form fields for title, content, 
                  and metadata. Good for simple content pages.
                </p>
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Templates Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Page Templates</h2>
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="p-3 bg-gray-100 rounded-full w-12 h-12 mx-auto mb-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Templates Coming Soon</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We're working on pre-built page templates to help you get started faster. 
                    Templates will include landing pages, about pages, contact pages, and more.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}