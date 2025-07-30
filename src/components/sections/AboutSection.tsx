'use client';

import { FileCode, Component, Server } from 'lucide-react';
import React from 'react';

const services = [
  {
    icon: <FileCode className="h-8 w-8 text-primary" />,
    title: 'Web Development',
  },
  {
    icon: <Component className="h-8 w-8 text-chart-2" />,
    title: 'App Development',
  },
  {
    icon: <Server className="h-8 w-8 text-chart-4" />,
    title: 'Backend & APIs',
  },
];

const stats = [
  { value: '15+', label: 'Projects Completed' },
  { value: '95%', label: 'Coursework Completion' },
  { value: '1000+', label: 'Coding Hours' },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-8 relative">
          <div className="absolute left-0 h-full w-px bg-border -translate-x-8"></div>
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-6 relative">
               <div className="absolute left-0 h-full flex items-center">
                <div className="h-px w-8 bg-border -translate-x-8"></div>
              </div>
              <div className="bg-background p-3 rounded-full border">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About me</h2>
          <p className="text-muted-foreground md:text-lg/relaxed">
            As a dedicated Computer Science student, I've embarked on a journey from theoretical concepts to tangible creations. My passion lies in transforming complex problems into elegant software solutions. I thrive on learning new technologies and applying my skills to build meaningful and impactful projects.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
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
