'use client';

import React from 'react';
import type { AboutContent } from '@/lib/types';
import { iconMap } from '@/lib/icon-map';
import Image from 'next/image';
import { useGradientText } from '@/hooks/use-gradient-text';

export default function AboutSection({ content }: { content: AboutContent }) {
  const { getGradientProps } = useGradientText();
  
  return (
    <section id="about" className="w-full py-12 md:py-20 lg:py-28 bg-muted/50 dark:bg-card/50">
      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="space-y-8 relative">
          <div className="absolute left-0 h-full w-px bg-border -translate-x-4 md:-translate-x-8"></div>
     <div className="w-full aspect-square relative">
      <Image
        src={content.image}
        alt="About Me"
        fill
        className="object-cover rounded-lg"
        data-ai-hint="about me"
      />
          </div>
        </div>
        <div className="space-y-6">
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter"
            {...getGradientProps('section-headings')}
          >
            About me
          </h2>
          <p className="text-muted-foreground text-base md:text-lg/relaxed">
            {content.bio}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {content.services.map((service) => {
                const Icon = iconMap[service.icon] || iconMap['FileCode'];
                return (
                <div key={service.id} className="flex items-center gap-4">
                    <div className="bg-background p-3 rounded-full border">
                    <Icon className={`h-6 w-6 ${service.color}`} />

                  </div>
                  <h3 className="text-base md:text-lg font-semibold">{service.title}</h3>
                </div>
                );
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t">
            {content.stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-4xl font-bold text-foreground/80 dark:text-portfolio-silver">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
