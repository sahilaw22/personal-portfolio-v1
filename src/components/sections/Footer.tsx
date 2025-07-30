'use client';
import { useEffect, useState } from 'react';
import { useAppState } from '@/components/AppStateProvider';

export default function Footer() {
  const { setIsPasswordDialogOpen } = useAppState();
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

  const personalInfo = {
    name: 'Sahil A',
    email: 'sahilaw22@gmail.com',
  };

  const handleTap = () => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
    }

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= 5) {
      setIsPasswordDialogOpen(true);
      setTapCount(0);
    } else {
      const timeout = setTimeout(() => {
        setTapCount(0);
      }, 1500); // Reset taps after 1.5 seconds of inactivity
      setTapTimeout(timeout);
    }
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Keep desktop shortcut as a fallback
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setIsPasswordDialogOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
       if (tapTimeout) {
        clearTimeout(tapTimeout);
      }
    };
  }, [setIsPasswordDialogOpen, tapTimeout]);

  return (
    <footer 
      className="w-full border-t border-border/40 bg-background/95 py-6"
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label="Footer - Tap five times for admin access"
    >
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
