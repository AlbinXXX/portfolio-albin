import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageBuilderProvider } from '@/components/page-builder/PageBuilderContext';
import { PageBuilder } from '@/components/page-builder/PageBuilder';

interface Page {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  content: any[];
  settings: any;
  seo_data: any;
  status: 'draft' | 'published' | 'archived';
}

interface Props {
  page: Page;
}

export default function Edit({ page }: Props) {
  // Transform Laravel page data to page builder format
  const initialPageData = {
    title: page.title,
    slug: page.slug,
    blocks: page.content || [],
    meta: {
      description: page.meta_description || '',
      ...page.seo_data,
    },
    settings: {
      layout: 'default',
      theme: 'auto',
      ...page.settings,
    },
  };

  return (
    <AdminLayout>
      <Head title={`Edit ${page.title}`} />
      
      <PageBuilderProvider initialData={initialPageData} pageId={page.id}>
        <PageBuilder />
      </PageBuilderProvider>
    </AdminLayout>
  );
}