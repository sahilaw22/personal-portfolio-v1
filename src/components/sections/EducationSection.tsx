import type { Education } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Education</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <div className="relative mx-auto max-w-5xl">
            {/* Vertical Line */}
            <div className="absolute left-6 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"></div>
            
            {education.map((edu, index) => (
              <div key={edu.id} className="relative mb-10 pl-12 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0 group/card">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2"></div>
                
                {/* Content Card */}
                <div className={cn(
                  'w-full md:max-w-md',
                  index % 2 === 0 
                    ? 'md:col-start-1 md:text-right md:justify-self-end' 
                    : 'md:col-start-2 md:text-left'
                )}>
                  <div className="rounded-md bg-card p-6 shadow-lg h-full border">
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                    <h3 className="text-xl font-bold text-primary">{edu.institution}</h3>
                    <p className="mb-2 text-lg font-semibold flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        {edu.degree}
                    </p>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </div>
                </div>

                {/* Empty div for spacing on desktop */}
                <div className={cn('hidden md:block', index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1')}></div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
