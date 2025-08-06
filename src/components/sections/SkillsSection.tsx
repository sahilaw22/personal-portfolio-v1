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
import type { SkillCategory } from "@/lib/types";
import { iconMap } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn("text-2xl font-bold tracking-tight", className)}>{children}</h2>
);

const iconColors = [
  'text-primary',
  'text-chart-2',
  'text-chart-3',
  'text-chart-4',
  'text-chart-5',
];

export default function SkillsSection({ skillsData }: { skillsData: SkillCategory[] }) {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-background">
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
          {skillsData.map((category) => (
            <div key={category.title} className="grid gap-4 rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-primary/10 border border-border bg-card">
              <SectionTitle className="text-foreground/80 dark:text-portfolio-silver">{category.title}</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => {
                  const Icon = iconMap[skill.icon as keyof typeof iconMap] || FileCode;
                  return (
                    <Badge key={skill.name} variant="secondary" className="flex items-center gap-2 text-sm">
                       <Icon className={`h-4 w-4 ${iconColors[index % iconColors.length]}`} />
                      <span>{skill.name}</span>
                    </Badge>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
