import React from 'react';
import { usePage, router } from '@inertiajs/react';
import PillNav from '../PillNav';
import { type SharedData } from '@/types';
import { login, logout } from '@/routes';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const url = page.url || '';

  // Don't show navigation on admin pages
  const isAdminPage = url.startsWith('/admin');
  
  if (isAdminPage) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    router.post(logout().url);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
    ...(auth.user ? [
      { label: 'Admin', href: '/admin' },
      { label: 'Logout', href: '#', onClick: handleLogout }
    ] : [
      { label: 'Login', href: login().url }
    ])
  ];

  return (
    <div className="relative min-h-screen">
      <PillNav
        items={navItems}
        activeHref={url}
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={true}
      />
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}