
'use client';
import { useEffect } from 'react';
import HomePage from '@/components/HomePage';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useAppState } from '@/components/AppStateProvider';
import { cn } from '@/lib/utils';

export default function Page() {
  const { addPageView, portfolioData } = useAppState();

  useEffect(() => {
    addPageView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navStyle = portfolioData.settings.layout?.navStyle || 'top';
  const container = portfolioData.settings.layout?.container || 'normal';
  const containerClass = container === 'narrow' ? 'max-w-3xl mx-auto' : container === 'normal' ? 'max-w-5xl mx-auto' : container === 'wide' ? 'max-w-7xl mx-auto' : 'w-full';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className={navStyle === 'sidebar' ? 'md:grid md:grid-cols-[240px_1fr]' : ''}>
        {navStyle === 'sidebar' && (
          <aside className="sticky top-0 h-[calc(100vh-0px)] hidden md:block border-r bg-muted/40 p-6">
            <nav className="space-y-2 text-sm">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Education', href: '#education' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <a key={item.href} href={item.href} className="block px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent/10">
                  {item.name}
                </a>
              ))}
            </nav>
          </aside>
        )}
        <main className={cn('flex-1', containerClass)}>
          <HomePage />
        </main>
      </div>
      <Footer />
    </div>
  );
}
