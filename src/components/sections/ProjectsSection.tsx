import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';
import { colorMap } from '@/lib/color-map';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

const getProjectColors = (tags: string[]) => {
  const availableColors = ['primary', 'accent', 'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'];
  const projectColors = tags
    .map(tag => colorMap[tag.toLowerCase()])
    .filter(Boolean);
  
  if (projectColors.length === 0) {
    return {
      from: `hsl(var(--${availableColors[0]}))`,
      to: `hsl(var(--${availableColors[1]}))`,
      shadow: `hsl(var(--${availableColors[0]}))`,
    };
  }
  if (projectColors.length === 1) {
    return {
      from: `hsl(var(--${projectColors[0]}))`,
      to: `hsl(var(--${availableColors.find(c => c !== projectColors[0]) || 'accent'}))`,
      shadow: `hsl(var(--${projectColors[0]}))`,
    };
  }
  return {
    from: `hsl(var(--${projectColors[0]}))`,
    to: `hsl(var(--${projectColors[1]}))`,
    shadow: `hsl(var(--${projectColors[0]}))`,
  };
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const scrollClasses = cn({
    'h-auto': projects.length <= 2,
    'h-[1000px] md:h-auto': projects.length > 2 && projects.length <= 4,
    'h-[1000px]': projects.length > 4,
  });

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
        <ScrollArea className={scrollClasses}>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
            {projects.map((project) => {
              const { from, to, shadow } = getProjectColors(project.tags);
              
              const cardStyle = {
                '--project-color-from': from,
                '--project-color-to': to,
                '--project-shadow-color': shadow,
              } as React.CSSProperties;

              return (
                <Card 
                  key={project.id} 
                  className="group/card overflow-hidden transition-all hover:-translate-y-1 relative focus-within:ring-0 focus-within:ring-offset-0"
                  style={cardStyle}
                >
                  <div 
                    className="absolute inset-[-2px] z-0 rounded-[--radius] bg-gradient-to-r from-[--project-color-from] to-[--project-color-to] transition-all"
                  />
                  <div className="relative z-10 flex h-full flex-col rounded-[calc(var(--radius)-2px)] bg-card">
                    <CardHeader className="p-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover"
                        data-ai-hint={project.aiHint}
                      />
                    </CardHeader>
                    <CardContent className="flex-1 p-6">
                      <CardTitle className="mb-2 text-2xl text-accent">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>

                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 p-6 pt-0">
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
                  </div>
                  <div className="absolute inset-0 z-20 rounded-lg shadow-[0_0_20px_0px] shadow-[--project-shadow-color]/0 opacity-0 transition-all duration-300 group-hover/card:shadow-[--project-shadow-color]/20 group-hover/card:opacity-100" />
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
