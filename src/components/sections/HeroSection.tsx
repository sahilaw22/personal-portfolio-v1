'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useAppState } from '@/components/AppStateProvider';
import type { HeroContent } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';

const OrangeGlowBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,121,44,0.15),rgba(255,255,255,0))]"></div>
    </div>
);
  

export default function HeroSection({ content }: { content: HeroContent }) {
  const { isAdminAuthenticated } = useAppState();
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
    }
    
    // Prefetch the admin page on the first tap to make it load faster
    if (tapCount === 0) {
      router.prefetch('/admin/login');
    }

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= 5) {
       router.push(isAdminAuthenticated ? '/admin' : '/admin/login');
      setTapCount(0);
    } else {
      const timeout = setTimeout(() => {
        setTapCount(0);
      }, 1500);
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
    <section id="hero" className="container min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center w-full max-w-6xl">
        
        <div className="text-center md:text-left order-2 md:order-1">
          <p className="mb-2 text-primary font-semibold text-lg">
            {content.greeting}
          </p>
          <div
            onClick={handleTap}
            role="button"
            tabIndex={0}
            aria-label="Tap five times to open admin panel"
            className="inline-block cursor-pointer"
          >
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              {content.name}
            </h1>
          </div>
          <p className="mt-4 text-2xl md:text-3xl font-medium text-muted-foreground">
            <span className="text-gradient-primary-accent">{content.title}</span>
          </p>
          <Badge variant="outline" className="mt-4 text-sm font-medium border-green-500/50 text-green-400 bg-green-500/10 py-1 px-3">
             <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {content.availability}
          </Badge>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            {content.bio}
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" asChild>
                <a href="#contact">
                  Contact Me
                  <ChevronRight className="h-5 w-5" />
                </a>
              </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/resume.pdf" download="Sahil_Ahmed_Wani_Resume.pdf">
                My Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center items-center order-1 md:order-2">
           <OrangeGlowBackground />
           <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] z-10 p-4">
            <Image
              src={content.image}
              alt={content.name}
              width={400}
              height={400}
              className="object-cover w-full h-full rounded-full"
              data-ai-hint="profile picture"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
