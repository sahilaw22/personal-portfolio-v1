
'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useAppState } from '@/components/AppStateProvider';
import type { HeroContent, HeroBackground } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { shouldApplyGradient, getGradientTextStyle } from '@/lib/gradient-text-utils';

const hexToRgba = (hex: string, opacity: number): string => {
  let c: string[] | string | number;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c = hex.substring(1).split('');
    if((c as string[]).length == 3){
      c = [(c as string[])[0], (c as string[])[0], (c as string[])[1], (c as string[])[1], (c as string[])[2], (c as string[])[2]];
        }
    c = '0x'+(c as string[]).join('');
    const n = Number(c);
    return 'rgba('+[((n>>16)&255), ((n>>8)&255), (n&255)].join(',')+','+opacity+')';
    }
    // Fallback for invalid hex
    return `rgba(255, 255, 255, ${opacity})`;
}

const GlowBackground = ({ background }: { background: HeroBackground }) => {
  const fromColorWithOpacity = hexToRgba(background.from, background.fromOpacity);
  const toColorWithOpacity = hexToRgba(background.to, background.toOpacity);

  const getBackgroundStyle = () => {
    if (background.type === 'solid') {
      return { backgroundColor: fromColorWithOpacity };
    } else {
      return { 
        backgroundImage: `radial-gradient(ellipse ${background.fromSize}% ${background.fromSize}% at 50% 50%, ${fromColorWithOpacity}, transparent 70%), radial-gradient(ellipse ${background.toSize}% ${background.toSize}% at 40% 60%, ${toColorWithOpacity}, transparent 70%)` 
      };
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      <div 
        className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full blur-3xl" 
        style={getBackgroundStyle()}
      />
    </div>
  );
};
  

export default function HeroSection({ content, background }: { content: HeroContent, background: HeroBackground }) {
  const { portfolioData, isAdminAuthenticated } = useAppState();
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);

  // Get gradient text settings
  const gradientSettings = portfolioData.theme.gradientText;

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
      }, 2500);
      setTapTimeout(timeout);
    }
  };

  useEffect(() => {
    // This function is the cleanup function for the effect.
    // It runs when the component unmounts or before the effect runs again.
    return () => {
      if (tapTimeout) {
        clearTimeout(tapTimeout);
      }
    };
  }, [tapTimeout]); // Adding tapTimeout to the dependency array

  const resumeUrl = portfolioData.theme?.resumeUrl || '/resume.pdf';

  // Enforce circular profile image regardless of layout settings
  const shapeClass = 'rounded-full';

  return (
    <section id="hero" className="container px-4 md:px-6 min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center w-full">
        
        <div className="text-center md:text-left order-2 md:order-1">
          <p className="mb-2 text-primary font-semibold text-base md:text-lg">
            {content.greeting}
          </p>
          <div
            onClick={handleTap}
            role="button"
            tabIndex={0}
            aria-label="Tap five times to access admin panel"
            className="inline-block cursor-pointer"
          >
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
                content.nameFont || 'font-headline'
              )}
              style={gradientSettings && shouldApplyGradient(gradientSettings, 'hero-name') 
                ? getGradientTextStyle(gradientSettings) 
                : undefined
              }
            >
              {content.name}
            </h1>
          </div>
          <p className="mt-4 text-xl md:text-2xl lg:text-3xl font-medium">
            <span 
              className="text-gradient-primary-accent"
              style={gradientSettings && shouldApplyGradient(gradientSettings, 'hero-title') 
                ? getGradientTextStyle(gradientSettings) 
                : undefined
              }
            >
              {content.title}
            </span>
          </p>
          <Badge variant="outline" className="mt-4 text-sm font-medium border-green-500/50 text-green-700 bg-green-500/10 py-2 px-4 dark:border-chart-3/50 dark:text-chart-3 dark:bg-chart-3/10 animate-pulse">
             <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-destructive opacity-75 shadow-lg shadow-red-400/50"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 dark:bg-destructive shadow-lg shadow-red-500/60"></span>
            </span>
            {content.availability}
          </Badge>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
            {content.bio}
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="#contact">
                  Contact Me
                  <ChevronRight className="h-5 w-5" />
                </a>
              </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={resumeUrl} download="resume.pdf">
                My Resume
             </a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center items-center order-1 md:order-2">
           <GlowBackground background={background} />
            <div 
              className={cn(
                "relative w-full max-w-[300px] md:max-w-[380px] lg:max-w-[450px] aspect-square z-10 p-2 bg-card/10 backdrop-blur-sm shadow-2xl shadow-primary/10 border border-foreground/10 cursor-default transition-transform hover:scale-105 active:scale-95",
                shapeClass
              )}
              onClick={handleTap}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') && handleTap()}
            >
            <div className={cn("relative w-full h-full overflow-hidden", shapeClass)}>
                <Image
                  src={content.image}
                  alt={content.name}
                  fill
                  className="object-cover"
                  data-ai-hint="profile picture"
                  priority
                />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

