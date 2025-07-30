import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with product listings, a shopping cart, and a secure checkout process. Built with Next.js and integrated with Stripe for payments.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
    github: 'https://www.github.com/sahilaw22',
    live: '#',
    aiHint: 'e-commerce'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task manager with drag-and-drop boards, real-time updates, and user authentication. Powered by React and Firebase.',
    image: 'https://placehold.co/600x400.png',
    tags: ['React', 'Firebase', 'Zustand', 'dnd-kit'],
    github: 'https://www.github.com/sahilaw22',
    live: '#',
    aiHint: 'productivity app'
  },
  {
    title: 'Portfolio Website V1',
    description: 'My previous personal portfolio website, designed to showcase my skills and projects with a clean, minimalist aesthetic.',
    image: 'https://placehold.co/600x400.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    github: 'https://www.github.com/sahilaw22',
    live: '#',
    aiHint: 'portfolio design'
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my work. See what I've been building.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover"
                  data-ai-hint={project.aiHint}
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-2xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                    <Github className="h-5 w-5 hover:text-primary transition-colors" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                    <ExternalLink className="h-5 w-5 hover:text-primary transition-colors" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
