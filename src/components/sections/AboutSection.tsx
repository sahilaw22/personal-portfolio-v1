'use client';

import React from 'react';
import type { AboutContent } from '@/lib/types';
import { iconMap } from '@/lib/icon-map';
import Image from 'next/image';

export default function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-8 relative">
          <div className="absolute left-0 h-full w-px bg-border -translate-x-8"></div>
           <div className="w-full aspect-square relative">
            <Image
                src={content.image}
                alt="About Me"
                fill
                className="rounded-lg object-cover"
                data-ai-hint="about me"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About me</h2>
          <p className="text-muted-foreground md:text-lg/relaxed">
            {content.bio}
          </p>
          <div className="grid grid-cols-2 gap-6">
            {content.services.map((service, index) => {
                const Icon = iconMap[service.icon] || iconMap['FileCode'];
                return (
                <div key={service.id} className="flex items-center gap-4">
                    <div className="bg-background p-3 rounded-full border">
                    <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                );
            })}
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            {content.stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
