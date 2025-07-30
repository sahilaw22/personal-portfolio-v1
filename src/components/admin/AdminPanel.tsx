'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeadlineGenerator from './HeadlineGenerator';
import SkillsRecommender from './SkillsRecommender';
import ContactSubmissions from './ContactSubmissions';
import ContentEditor from './ContentEditor';
import ExperienceEditor from './ExperienceEditor';
import ProjectsEditor from './ProjectsEditor';
import SkillsEditor from './SkillsEditor';
import type { ContactSubmission } from '@/lib/types';
import { useAppState } from '../AppStateProvider';

type AdminPanelProps = {
  contactSubmissions: ContactSubmission[];
};

export default function AdminPanel({ contactSubmissions }: AdminPanelProps) {
  const { portfolioData, updatePortfolioData } = useAppState();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg glow-accent"
        >
          <SlidersHorizontal className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[640px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Admin Panel</SheetTitle>
          <SheetDescription>
            Access AI tools and view contact messages here.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="content" className="flex-1 flex flex-col mt-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills-editor">Skills</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="flex-1 overflow-auto">
             <ContentEditor />
          </TabsContent>
          <TabsContent value="experience" className="flex-1 overflow-auto">
            <ExperienceEditor />
          </TabsContent>
          <TabsContent value="projects" className="flex-1 overflow-auto">
            <ProjectsEditor />
          </TabsContent>
          <TabsContent value="skills-editor" className="flex-1 overflow-auto">
            <SkillsEditor />
          </TabsContent>
          <TabsContent value="ai-tools" className="flex-1 overflow-auto">
            <div className="space-y-4">
              <HeadlineGenerator />
              <SkillsRecommender />
            </div>
          </TabsContent>
          <TabsContent value="messages" className="flex-1 overflow-auto">
            <ContactSubmissions submissions={contactSubmissions} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
