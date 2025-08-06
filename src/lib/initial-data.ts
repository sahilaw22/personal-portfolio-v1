
import type { PortfolioData } from './types';

export const initialData: PortfolioData = {
  hero: {
    greeting: "Hello, I'm",
    name: "Sahil Ahmed Wani",
    title: "Full-Stack Developer & Tech Enthusiast",
    availability: "Available for Internship",
    bio: "I'm a passionate developer with a love for building modern, responsive, and intuitive web applications. My expertise lies in creating seamless user experiences from front to back, with a strong focus on clean code and scalable architecture.",
    image: "/profile.jpg"
  },
  theme: {
    heroBackground: {
      type: 'gradient',
      from: '#6CFFD9',
      to: '#D48CFF',
      fromSize: 40,
      toSize: 30,
      fromOpacity: 0.5,
      toOpacity: 0.5,
    },
    colors: {
      background: '224 71.4% 4.1%',
      foreground: '210 20% 98%',
      primary: '166 100% 71%',
      accent: '276 100% 77%',
    },
    backgroundImage: '',
    backgroundImageOpacity: 0.05,
    backgroundImageBlur: 10,
    resumeUrl: '/resume.pdf'
  },
  settings: {
    autoSave: true,
    adminPassword: 'IamNerd',
  },
  about: {
    bio: "As a dedicated Computer Science student, I've embarked on a journey from theoretical concepts to tangible creations. My passion lies in transforming complex problems into elegant software solutions. I thrive on learning new technologies and applying my skills to build meaningful and impactful projects.",
    services: [
      { id: 's1', icon: 'FileCode', title: 'Web Development', color: 'text-primary' },
      { id: 's2', icon: 'Component', title: 'App Development', color: 'text-chart-2' },
      { id: 's3', icon: 'Server', title: 'Backend & APIs', color: 'text-chart-4' },
    ],
    stats: [
      { id: 'st1', value: '15+', label: 'Projects Completed' },
      { id: 'st2', value: '95%', label: 'Coursework Completion' },
      { id: 'st3', value: '1000+', label: 'Coding Hours' },
    ],
    image: "https://placehold.co/600x600.png"
  },
  contact: {
    image: "https://placehold.co/600x400.png"
  },
   contactSubmissions: [],
  skills: [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: 'FileCode' },
        { name: "TypeScript", icon: 'FileCode' },
        { name: "Python", icon: 'FileCode' },
        { name: "HTML5", icon: 'Globe' },
        { name: "CSS3", icon: 'Globe' },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", icon: 'Component' },
        { name: "Next.js", icon: 'Component' },
        { name: "Node.js", icon: 'Server' },
        { name: "Express.js", icon: 'Server' },
        { name: "Tailwind CSS", icon: 'Wind' },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", icon: 'Database' },
        { name: "MongoDB", icon: 'Database' },
        { name: "Firebase", icon: 'Cloud' },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: 'GitMerge' },
        { name: "Docker", icon: 'Unplug' },
        { name: "Vite", icon: 'Bot' },
        { name: "Webpack", icon: 'Layers' },
        { name: "Vercel", icon: 'Cloud' },
        { name: "Framer Motion", icon: 'MousePointer' },
      ],
    },
    {
      title: "ORM",
      skills: [
        { name: "Drizzle", icon: 'TerminalSquare' },
        { name: "Prisma", icon: 'TerminalSquare' },
      ],
    }
  ],
  experience: [
    {
      id: "exp1",
      role: "Freelance Web Developer",
      company: "Upwork",
      period: "2023 - Present",
      description: "Developed and maintained full-stack web applications for various clients. Specialized in React, Node.js, and modern Jamstack architecture. Consistently delivered high-quality, scalable solutions on time."
    },
    {
      id: "exp2",
      role: "Software Development Intern",
      company: "Tech Innovators Inc.",
      period: "Summer 2022",
      description: "Contributed to the development of a large-scale e-commerce platform. Worked with a team of senior engineers on both frontend and backend tasks, gaining hands-on experience with agile methodologies."
    },
     {
      id: "exp3",
      role: "Jr. Frontend Developer",
      company: "Web Solutions Co.",
      period: "2021-2022",
      description: "Built responsive and interactive user interfaces for client websites using HTML, CSS, and JavaScript. Collaborated with designers to translate mockups into functional web pages."
    },
    {
      id: "exp4",
      role: "Open Source Contributor",
      company: "Community Project",
      period: "2022 - Present",
      description: "Actively contributed to a popular open-source library, focusing on bug fixes, documentation improvements, and feature implementation."
    },
    {
      id: "exp5",
      role: "Teaching Assistant",
      company: "University of Technology",
      period: "2023",
      description: "Assisted professors with grading, holding office hours, and tutoring undergraduate students in introductory computer science courses."
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      period: "2020 - 2024",
      description: "Focused on software engineering, algorithms, and data structures. Completed a final year project on machine learning applications in finance."
    },
    {
      id: "edu2",
      institution: "Online Learning Platform",
      degree: "Advanced Full-Stack Web Development Bootcamp",
      period: "2023",
      description: "Intensive training program covering the MERN stack (MongoDB, Express, React, Node.js), RESTful APIs, and cloud deployment."
    }
  ],
  projects: [
    {
      id: "proj1",
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with product listings, a shopping cart, and a secure checkout process. Built with Next.js and integrated with Stripe for payments.',
      image: 'https://placehold.co/600x400.png',
      tags: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
      github: 'https://www.github.com/sahilaw22',
      live: '#',
      aiHint: 'e-commerce'
    },
    {
      id: "proj2",
      title: 'Task Management App',
      description: 'A collaborative task manager with drag-and-drop boards, real-time updates, and user authentication. Powered by React and Firebase.',
      image: 'https://placehold.co/600x400.png',
      tags: ['React', 'Firebase', 'Zustand', 'dnd-kit'],
      github: 'https://www.github.com/sahilaw22',
      live: '#',
      aiHint: 'productivity app'
    },
    {
      id: "proj3",
      title: 'Portfolio Website V1',
      description: 'My previous personal portfolio website, designed to showcase my skills and projects with a clean, minimalist aesthetic.',
      image: 'https://placehold.co/600x400.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
      github: 'https://www.github.com/sahilaw22',
      live: '#',
      aiHint: 'portfolio design'
    },
  ]
};
