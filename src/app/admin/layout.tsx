
'use client';

import { Suspense } from 'react';
import { useAppState } from '@/components/AppStateProvider';
import AdminComponentPreloader from '@/components/admin/ComponentPreloader';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Download,
  GraduationCap,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  Mail,
  Menu,
  Sparkles,
  Wrench,
  User,
  LogOut,
  Palette,
  Settings,
  LineChart,
  Grid,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/admin', label: 'General', icon: Home },
  { href: '/admin/analytics', label: 'Analytics', icon: LineChart },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/projects', label: 'Projects', icon: LayoutGrid },
  { href: '/admin/portfolio-designs', label: 'Designs', icon: Grid },
  { href: '/admin/layouts', label: 'Layouts', icon: LayoutGrid },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/theme', label: 'Theme', icon: Palette },
  { href: '/admin/ai-tools', label: 'AI Tools', icon: Sparkles },
  { href: '/admin/messages', label: 'Messages', icon: Mail, notificationKey: 'unreadMessages' },
  { href: '/admin/uploads', label: 'Uploads', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/export', label: 'Export Data', icon: Download },
];

function NavContent() {
  const pathname = usePathname();
  const { portfolioData } = useAppState();
  const unreadMessages = portfolioData.contactSubmissions?.filter(s => !s.isRead).length || 0;

  return (
    <>
      <div className="p-4">
        <Link
          href="/admin"
          prefetch={true}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Sparkles className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <SidebarMenu>
        {navLinks.map(({ href, label, icon: Icon, notificationKey }) => (
           <SidebarMenuItem key={href}>
            <SidebarMenuButton asChild isActive={pathname === href}>
              <Link href={href} prefetch={true} className="relative">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                 {notificationKey === 'unreadMessages' && unreadMessages > 0 && (
                    <Badge className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0 flex items-center justify-center">
                        {unreadMessages}
                    </Badge>
                 )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminAuthenticated, logout, commitAllChanges, discardAllChanges, draftDirty, startPreview } = useAppState();
  const router = useRouter();

  if (!isAdminAuthenticated) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AdminComponentPreloader />
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <ScrollArea className="flex-1 overflow-auto py-2">
              <NavContent />
            </ScrollArea>
            <div className="mt-auto p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full mb-2"
                onClick={() => { startPreview(); router.push('/'); }}
              >
                View Portfolio
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Admin Menu</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="flex-1 py-2">
                    <NavContent />
                  </ScrollArea>
                <div className="mt-auto p-4 border-t">
                   <Button
                     variant="outline"
                     size="sm"
                     className="w-full mb-2"
                     onClick={() => { startPreview(); router.push('/'); }}
                   >
                     View Portfolio
                   </Button>
                  <Button variant="ghost" size="sm" onClick={logout} className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <h1 className="text-xl font-semibold">Portfolio Customization</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="flex flex-col gap-4 lg:gap-6">
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted/30 rounded w-1/3" />
                  <div className="h-4 bg-muted/20 rounded w-full" />
                  <div className="h-4 bg-muted/20 rounded w-3/4" />
                  <div className="h-32 bg-muted/20 rounded" />
                </div>
              }>
                {children}
              </Suspense>
            </div>
            {draftDirty && (
              <div className="fixed inset-x-0 bottom-0 z-50">
                <div className="mx-auto max-w-7xl px-4 pb-4">
                  <div className="rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg p-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-muted-foreground">You have unsaved changes.</div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={discardAllChanges}>Discard</Button>
                      <Button onClick={commitAllChanges}>All Done</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
