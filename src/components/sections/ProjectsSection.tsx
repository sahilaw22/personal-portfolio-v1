
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';
import { useAppState } from '@/components/AppStateProvider';
import { colorMap } from '@/lib/color-map';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { useGradientText } from '@/hooks/use-gradient-text';

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
  const { portfolioData } = useAppState();
  const { getGradientProps } = useGradientText();
  const layout = portfolioData.settings.layout;
  const needsScroll = projects.length > 4 && (layout?.projectLayout !== 'carousel');
  const projectLayout = layout?.projectLayout || 'grid';
  const cardStyle = layout?.cardStyle || 'bordered';
  const radius = layout?.radius || 'lg';
  const cardShadow = layout?.shadow || 'soft';

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter"
              {...getGradientProps('section-headings')}
            >
              Featured Projects
            </h2>
            <p className="max-w-[900px] text-base md:text-lg text-muted-foreground">
              A selection of my work. See what I&apos;ve been building.
            </p>
          </div>
        </div>
        <div className="py-8 md:py-12">
          <ScrollArea className={cn(needsScroll && 'h-[800px] sm:h-[900px] md:h-[1000px] w-full')}>
            <div
              className={cn(
                'mx-auto gap-6 sm:gap-8 lg:gap-12',
                projectLayout === 'grid' && 'grid grid-cols-1 md:grid-cols-2',
                projectLayout === 'masonry' && 'columns-1 md:columns-2 space-y-6 md:space-y-8',
                projectLayout === 'carousel' && 'flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory'
              )}
            >
              {projects.map((project) => {
                const { from, to, shadow } = getProjectColors(project.tags);
                
                const styleVars = {
                  '--project-color-from': from,
                  '--project-color-to': to,
                  '--project-shadow-color': shadow,
                } as React.CSSProperties;

                return (
                  <div key={project.id} className={cn('group/card', projectLayout === 'carousel' ? 'min-w-[280px] sm:min-w-[320px] snap-start' : 'break-inside-avoid-column')} style={styleVars}>
                    <div className="gradient-border">
                      <Card 
                        className={cn(
                          'group/card overflow-hidden transition-all hover:-translate-y-1 relative focus-within:ring-0 focus-within:ring-offset-0 h-full flex flex-col',
                          cardStyle === 'solid' ? 'bg-card' : cardStyle === 'glass' ? 'bg-background/40 backdrop-blur border' : 'bg-card border',
                          radius === 'sm' ? 'rounded-md' : radius === 'md' ? 'rounded-lg' : radius === 'lg' ? 'rounded-xl' : 'rounded-2xl',
                          cardShadow === 'none' ? '' : cardShadow === 'soft' ? 'shadow-md' : 'shadow-xl'
                        )}
                      >
                        <CardHeader className="p-0 relative h-60 overflow-hidden">
                          {project.coverVideoUrl ? (
                            <video
                              src={project.coverVideoUrl}
                              poster={project.coverVideoPoster || project.image}
                              className="absolute inset-0 w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-105"
                              data-ai-hint={project.aiHint}
                            />
                          )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                           <div className="absolute bottom-0 p-6">
                             <CardTitle 
                               className="text-2xl text-white"
                               {...getGradientProps('project-titles')}
                             >
                               {project.title}
                             </CardTitle>
                           </div>
                        </CardHeader>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <CardDescription>{project.description}</CardDescription>
 </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </div>
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
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}
