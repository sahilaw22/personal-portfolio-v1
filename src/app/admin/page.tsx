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
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminPage() {
  const { contactSubmissions } = useAppState();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-gradient-primary-accent mb-6">Portfolio Customization</h1>
      <Tabs defaultValue="content" className="flex-1 flex flex-col md:flex-row md:gap-8" orientation="vertical">
          <TabsList className="w-full md:w-48 shrink-0 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col md:h-auto">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills-editor">Skills</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
          </TabsList>
          <div className="mt-6 md:mt-0 flex-1">
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
             <TabsContent value="uploads">
                <ImageUploader />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
