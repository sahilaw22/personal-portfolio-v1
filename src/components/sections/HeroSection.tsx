'use client';
import { Button } from '@/components/ui/button';
import { Download, Send, Lightbulb, Briefcase, DraftingCompass } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="container grid min-h-[calc(80vh)] items-center justify-center gap-6 py-10">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Sahil A
        </h1>
        <p className="mt-4 text-2xl text-gradient-primary-accent font-semibold">
          Full-Stack Developer &amp; Tech Enthusiast
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          I'm a passionate developer with a love for building modern, responsive, and intuitive web applications. My expertise lies in creating seamless user experiences from front to back, with a strong focus on clean code and scalable architecture.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="lg" asChild>
            <Link href="/skills">
              <Lightbulb className="mr-2 h-5 w-5" />
              My Skills
            </Link>
          </Button>
           <Button variant="outline" size="lg" asChild>
            <Link href="/experience">
              <Briefcase className="mr-2 h-5 w-5" />
              My Experience
            </Link>
          </Button>
           <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              <DraftingCompass className="mr-2 h-5 w-5" />
              My Projects
            </Link>
          </Button>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact">
              <Send className="mr-2 h-5 w-5" />
              Get In Touch
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href="/resume.pdf" download="Sahil_A_Resume.pdf">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
