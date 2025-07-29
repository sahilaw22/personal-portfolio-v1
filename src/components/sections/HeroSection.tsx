import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="container grid min-h-[calc(100vh-56px)] items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div id="about" className="mx-auto max-w-4xl text-center">
        <h1 className="font-headline text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Sahil A
        </h1>
        <p className="mt-4 text-2xl text-gradient-primary-accent font-semibold">
          Full-Stack Developer &amp; Tech Enthusiast
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          I'm a passionate developer with a love for building modern, responsive, and intuitive web applications. My expertise lies in creating seamless user experiences from front to back, with a strong focus on clean code and scalable architecture.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={scrollToContact} size="lg">
            Get In Touch
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
