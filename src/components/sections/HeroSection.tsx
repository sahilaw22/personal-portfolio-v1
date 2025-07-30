'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useAppState } from '@/components/AppStateProvider';
import type { HeroContent } from '@/lib/types';
import { useRouter } from 'next/navigation';

const GeometricBackground = () => (
    <svg
      className="absolute inset-0 w-full h-full text-gray-800/50"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="pattern-1"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1)" opacity="0.1" />
      <g transform="translate(50, 50)">
        <path d="M 0 150 L 150 0 L 300 150 L 150 300 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M 75 225 L 150 150 L 225 225" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </g>
    </svg>
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
            <h1 className="font-headline text-5xl sm:text-6xl font-bold tracking-tight">
              {content.name}
            </h1>
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {content.title}
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
           <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] z-10">
            <Image
              src="/profile.jpg"
              alt={content.name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint="profile picture"
            />
          </div>
           <div className="absolute inset-0 flex items-center justify-center">
            <GeometricBackground />
          </div>
        </div>

      </div>
    </section>
  );
}
