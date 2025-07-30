import { Badge } from "@/components/ui/badge";
import {
  FileCode,
  Server,
  Database,
  GitMerge,
  Unplug,
  Component,
  Wind,
  Globe,
  Bot,
  TerminalSquare,
  Cloud,
  Layers,
  MousePointer,
  type LucideIcon,
} from 'lucide-react';
import React from 'react';

const skills: Record<string, { name: string; icon: LucideIcon }[]> = {
  "Languages": [
    { name: "JavaScript", icon: FileCode },
    { name: "TypeScript", icon: FileCode },
    { name: "Python", icon: FileCode },
    { name: "HTML5", icon: Globe },
    { name: "CSS3", icon: Globe },
  ],
  "Frameworks & Libraries": [
    { name: "React", icon: Component },
    { name: "Next.js", icon: Component },
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Server },
    { name: "Tailwind CSS", icon: Wind },
  ],
  "Databases": [
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Firebase", icon: Cloud },
  ],
  "Tools & Platforms": [
    { name: "Git", icon: GitMerge },
    { name: "Docker", icon: Unplug },
    { name: "Vite", icon: Bot },
    { name: "Webpack", icon: Layers },
    { name: "Vercel", icon: Cloud },
    { name: "Framer Motion", icon: MousePointer },
  ],
  "ORM": [
    { name: "Drizzle", icon: TerminalSquare },
    { name: "Prisma", icon: TerminalSquare },
  ],
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold tracking-tight text-gradient-primary-accent">{children}</h2>
);

const iconColors = [
  'text-chart-1',
  'text-chart-2',
  'text-chart-3',
  'text-chart-4',
  'text-chart-5',
];


export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Technical Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of technologies I use to bring ideas to life.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="grid gap-4 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-primary/10 gradient-border">
              <SectionTitle>{category}</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <Badge key={skill.name} variant="secondary" className="flex items-center gap-2 text-sm">
                     <skill.icon className={`h-4 w-4 ${iconColors[index % iconColors.length]}`} />
                    <span>{skill.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
