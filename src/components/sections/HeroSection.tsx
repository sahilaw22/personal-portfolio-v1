'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import Image from 'next/image';
import { useAppState } from '@/components/AppStateProvider';
import type { HeroContent } from '@/lib/types';

export default function HeroSection({ content }: { content: HeroContent }) {
  const { setIsPasswordDialogOpen } = useAppState();
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

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
    return () => {
      if (tapTimeout) {
        clearTimeout(tapTimeout);
      }
    };
  }, [tapTimeout]);

  return (
    <section id="hero" className="container min-h-[calc(80vh)] py-10 flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative flex justify-center items-center md:order-last">
           <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px]">
            <Image
              src="/profile.jpg"
              alt={content.name}
              width={400}
              height={400}
              className="rounded-full border-4 border-primary/50 object-cover"
              data-ai-hint="profile picture"
            />
             <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse"></div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xl md:text-2xl text-muted-foreground">
            {content.greeting}
          </p>
          <div
            onClick={handleTap}
            role="button"
            tabIndex={0}
            aria-label="Tap five times to open admin panel"
            className="inline-block cursor-pointer"
          >
            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-gradient-primary-accent">
              {content.name}
            </h1>
          </div>
          <p className="mt-4 text-2xl font-semibold text-foreground">
            {content.title}
          </p>
          <p className="mx-auto md:mx-0 mt-6 max-w-xl text-lg text-muted-foreground">
            {content.bio}
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" asChild>
                <a href="#contact">
                  <Send className="mr-2 h-5 w-5" />
                  Get in Touch
                </a>
              </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/resume.pdf" download="Sahil_Ahmed_Wani_Resume.pdf">
                <Download className="mr-2 h-5 w-5" />
                My Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
