import type { Education } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Education</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2">
          {education.map((edu) => (
            <Card key={edu.id} className="h-full bg-background/80 dark:bg-background/50 hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
              <CardHeader className="grid grid-cols-[auto,1fr] items-start gap-4 space-y-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{edu.institution}</CardTitle>
                  <p className="font-semibold text-primary">{edu.degree}</p>
                </div>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                <p className="text-muted-foreground">{edu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
