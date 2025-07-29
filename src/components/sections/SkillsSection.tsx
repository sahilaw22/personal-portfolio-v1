import { Badge } from "@/components/ui/badge";

const skills = {
  "Languages": ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
  "Databases": ["PostgreSQL", "MongoDB", "Firebase"],
  "Tools & Platforms": ["Git", "Docker", "Vite", "Webpack", "Vercel", "Framer Motion"],
  "ORM": ["Drizzle", "Prisma"],
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold tracking-tight text-gradient-primary-accent">{children}</h2>
);

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
                {skillList.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
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
