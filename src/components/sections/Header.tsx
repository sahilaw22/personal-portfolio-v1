'use client';

import { Terminal } from 'lucide-react';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

export default function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => scrollTo('hero')} role="button" tabIndex={0}>
          <Terminal className="h-6 w-6 text-primary glow-primary" />
          <span className="font-bold text-lg">Nerdfolio</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
