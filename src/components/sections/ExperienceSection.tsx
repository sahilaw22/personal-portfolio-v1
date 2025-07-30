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
          {/* Vertical Line */}
          <div className="absolute left-6 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-10 pl-12 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0">
              {/* Timeline Dot */}
              <div className="absolute left-6 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background glow-primary md:left-1/2"></div>
              
              <div className={`md:flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                 <div className={`rounded-lg border bg-card p-6 shadow-lg transition-all hover:shadow-accent/10 w-full md:max-w-md ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2 md:text-right'}`}>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <h3 className="text-xl font-bold text-accent glow-accent">{exp.role}</h3>
                    <p className="mb-2 text-lg font-semibold">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
              </div>

              {/* Empty div for spacing on desktop */}
              <div className="hidden md:block"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}