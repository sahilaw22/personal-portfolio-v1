'use client';
import { Button } from '@/components/ui/button';
import { Cog } from 'lucide-react';
import { useAppState } from '@/components/AppStateProvider';

export default function Footer() {
  const { setIsPasswordDialogOpen } = useAppState();
  const personalInfo = {
    name: 'Sahil A',
    email: 'sahilaw22@gmail.com',
  };

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsPasswordDialogOpen(true)} aria-label="Admin Panel">
            <Cog className="h-5 w-5 transition-colors hover:text-accent hover:glow-accent" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
