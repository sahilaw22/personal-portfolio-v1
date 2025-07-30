'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeadlineGenerator from '@/components/admin/HeadlineGenerator';
import SkillsRecommender from '@/components/admin/SkillsRecommender';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import ContentEditor from '@/components/admin/ContentEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import ExperienceEditor from '@/components/admin/ExperienceEditor';
import ProjectsEditor from '@/components/admin/ProjectsEditor';
import SkillsEditor from '@/components/admin/SkillsEditor';
import { useAppState } from '@/components/AppStateProvider';

export default function AdminPage() {
  const { contactSubmissions } = useAppState();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-gradient-primary-accent mb-6">Portfolio Customization</h1>
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills-editor">Skills</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="content">
                <ContentEditor />
            </TabsContent>
            <TabsContent value="about">
                <AboutEditor />
            </TabsContent>
            <TabsContent value="experience">
                <ExperienceEditor />
            </TabsContent>
            <TabsContent value="projects">
                <ProjectsEditor />
            </TabsContent>
            <TabsContent value="skills-editor">
                <SkillsEditor />
            </TabsContent>
            <TabsContent value="ai-tools">
                <div className="grid md:grid-cols-2 gap-6">
                <HeadlineGenerator />
                <SkillsRecommender />
                </div>
            </TabsContent>
            <TabsContent value="messages">
                <ContactSubmissions submissions={contactSubmissions} />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
