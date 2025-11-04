import React from 'react';
import { PageBuilderProvider } from '../components/page-builder/PageBuilderContext';
import { PageBuilder } from '../components/page-builder/PageBuilder';

const PageBuilderDemo: React.FC = () => {
  return (
    <PageBuilderProvider>
      <PageBuilder />
    </PageBuilderProvider>
  );
};

export default PageBuilderDemo;