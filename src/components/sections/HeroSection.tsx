'use client';
import { Button } from '@/components/ui/button';
import { Download, Send, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const socialLinks = {
    github: 'https://github.com/sahilaw22',
    linkedin: 'https://www.linkedin.com/in/sahil-a-057a0231a',
    twitter: '#',
  };

  return (
    <section id="hero" className="container flex flex-col items-center justify-center min-h-[calc(80vh)] text-center py-10">
      <div className="relative mb-8">
        <Image
          src="https://placehold.co/200x200.png"
          alt="Sahil A"
          width={200}
          height={200}
          className="rounded-full border-4 border-primary/50 glow-primary object-cover"
          data-ai-hint="profile picture"
        />
        <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse"></div>
      </div>
      <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-gradient-primary-accent">
        Sahil A
      </h1>
      <p className="mt-4 text-2xl font-semibold text-foreground">
        Full-Stack Developer &amp; Tech Enthusiast
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        I'm a passionate developer with a love for building modern, responsive, and intuitive web applications. My expertise lies in creating seamless user experiences from front to back, with a strong focus on clean code and scalable architecture.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-6 w-6 transition-colors hover:text-primary hover:glow-primary" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 transition-colors hover:text-primary hover:glow-primary" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 transition-colors hover:text-primary hover:glow-primary" />
          </a>
        </Button>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
         <Button size="lg" asChild>
            <Link href="/projects">
              View My Work
            </Link>
          </Button>
        <Button variant="secondary" size="lg" asChild>
          <a href="/resume.pdf" download="Sahil_A_Resume.pdf">
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
