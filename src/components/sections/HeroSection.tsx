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
    <section id="hero" className="container min-h-[calc(80vh)] py-10 flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative flex justify-center items-center md:order-last">
          <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px]">
            <Image
              src="https://placehold.co/400x400.png"
              alt="Sahil A"
              width={400}
              height={400}
              className="rounded-full border-4 border-primary/50 glow-primary object-cover"
              data-ai-hint="profile picture"
            />
             <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse"></div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xl md:text-2xl text-muted-foreground">
            Hello, I&apos;m
          </p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-gradient-primary-accent">
            Sahil A
          </h1>
          <p className="mt-4 text-2xl font-semibold text-foreground">
            Full-Stack Developer &amp; Tech Enthusiast
          </p>
          <p className="mx-auto md:mx-0 mt-6 max-w-xl text-lg text-muted-foreground">
            I&apos;m a passionate developer with a love for building modern, responsive, and intuitive web applications. My expertise lies in creating seamless user experiences from front to back, with a strong focus on clean code and scalable architecture.
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" asChild>
                <Link href="/contact">
                  <Send className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/resume.pdf" download="Sahil_A_Resume.pdf">
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
