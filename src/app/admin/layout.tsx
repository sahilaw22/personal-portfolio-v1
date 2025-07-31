'use client';

import { useAppState } from '@/components/AppStateProvider';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminAuthenticated, logout } = useAppState();

  if (!isAdminAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <Link href="/admin" className="font-bold text-xl mr-4">Admin Panel</Link>
                <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
                     <Button variant="outline" size="sm" asChild>
                        <Link href="/">View Portfolio</Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={logout}>
                        <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
      <main className="container py-8">{children}</main>
    </div>
  );
}
