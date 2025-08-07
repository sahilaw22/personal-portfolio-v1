
import type { Experience } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const shouldScroll = experiences.length > 3;

  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Professional Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My journey in the world of software development.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <ScrollArea className={cn(shouldScroll && 'h-[750px]')}>
            <div className="relative mx-auto max-w-5xl">
              {/* Vertical Line */}
              <div className="absolute left-6 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"></div>
              
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative mb-10 pl-12 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0 group/card">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2"></div>
                  
                  {/* Content Card */}
                  <div className={cn(
                    'w-full md:max-w-md',
                    index % 2 === 0 
                      ? 'md:col-start-1 md:text-right md:justify-self-end' 
                      : 'md:col-start-2 md:text-left'
                  )}>
                    <div 
                      className="gradient-border p-[2px] rounded-lg w-full h-full"
                      style={{ '--project-color-from': 'hsl(var(--primary))', '--project-color-to': 'hsl(var(--accent))' } as React.CSSProperties}
                    >
                      <div className="rounded-md bg-card p-6 shadow-lg h-full">
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                        <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                        <p className="mb-2 text-lg font-semibold">{exp.company}</p>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Empty div for spacing on desktop - this is what creates the alternating effect */}
                  <div className={cn('hidden md:block', index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1')}></div>

                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}
