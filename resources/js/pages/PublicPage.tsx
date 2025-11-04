import React from 'react';
import { Head } from '@inertiajs/react';
import { PageBuilderProvider } from '@/components/page-builder/PageBuilderContext';
import { BlockRenderer } from '@/components/page-builder/BlockRenderer';

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
  isPreview?: boolean;
}

export default function PublicPage({ page, isPreview = false }: Props) {
  // Transform Laravel page data to page builder format
  const pageData = {
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
    <>
      <Head>
        <title>{page.title}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
        {page.seo_data?.keywords && (
          <meta name="keywords" content={page.seo_data.keywords} />
        )}
        {page.seo_data?.image && (
          <meta property="og:image" content={page.seo_data.image} />
        )}
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.meta_description || ''} />
        <meta property="og:type" content="website" />
      </Head>

      {isPreview && (
        <div className="bg-yellow-500 text-black px-4 py-2 text-center text-sm font-medium">
          🔍 Preview Mode - This page is not published yet
        </div>
      )}

      <div className={`min-h-screen ${pageData.settings.layout === 'full-width' ? '' : 'max-w-6xl mx-auto'}`}>
        <PageBuilderProvider initialData={pageData}>
          <div className="space-y-0">
            {pageData.blocks
              .sort((a, b) => a.order - b.order)
              .map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  isEditing={false}
                  isSelected={false}
                />
              ))}
          </div>
          
          {pageData.blocks.length === 0 && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {page.title}
                </h1>
                <p className="text-gray-600">
                  This page is empty. Add some content in the page builder.
                </p>
              </div>
            </div>
          )}
        </PageBuilderProvider>
      </div>
    </>
  );
}