const experiences = [
  {
    role: "Freelance Web Developer",
    company: "Upwork",
    period: "2023 - Present",
    description: "Developed and maintained full-stack web applications for various clients. Specialized in React, Node.js, and modern Jamstack architecture. Consistently delivered high-quality, scalable solutions on time."
  },
  {
    role: "Software Development Intern",
    company: "Tech Innovators Inc.",
    period: "Summer 2022",
    description: "Contributed to the development of a large-scale e-commerce platform. Worked with a team of senior engineers on both frontend and backend tasks, gaining hands-on experience with agile methodologies."
  },
];

export default function ExperienceSection() {
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
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-8 flex w-full items-center justify-between md:justify-normal md:odd:flex-row-reverse">
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background glow-primary"></div>
              <div className="w-full md:w-[calc(50%-2rem)]">
                <div className={`rounded-lg border bg-card p-6 shadow-lg transition-all hover:shadow-accent/10 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <h3 className="text-xl font-bold text-accent glow-accent">{exp.role}</h3>
                  <p className="mb-2 text-lg font-semibold">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
