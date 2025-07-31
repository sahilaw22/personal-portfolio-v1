'use client';

import { useAppState } from '@/components/AppStateProvider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Briefcase,
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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin', label: 'General', icon: Home },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/projects', label: 'Projects', icon: LayoutGrid },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/ai-tools', label: 'AI Tools', icon: Sparkles },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/uploads', label: 'Uploads', icon: ImageIcon },
];

function NavContent() {
  const pathname = usePathname();
  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link
        href="/admin"
        prefetch={true}
        className="flex items-center gap-2 text-lg font-semibold mb-4"
      >
        <Sparkles className="h-6 w-6" />
        <span>Admin Panel</span>
      </Link>
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          prefetch={true}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === href && 'bg-muted text-primary'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
             <NavContent />
          </div>
           <div className="mt-auto p-4">
             <Button variant="outline" size="sm" asChild className="w-full mb-2">
                <Link href="/">View Portfolio</Link>
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
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Sparkles className="h-6 w-6" />
                    <span>Admin Panel</span>
                  </Link>
                </SheetTitle>
                <SheetDescription className="text-left">
                   Navigate through the different sections to customize your portfolio.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 py-4">
                <NavContent />
              </div>
              <div className="mt-auto">
                <Button variant="outline" size="sm" asChild className="w-full mb-2">
                    <Link href="/">View Portfolio</Link>
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
           <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/">View Portfolio</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} className="hidden md:inline-flex">
                <LogOut className="h-4 w-4" />
            </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
