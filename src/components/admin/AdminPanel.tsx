'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeadlineGenerator from './HeadlineGenerator';
import SkillsRecommender from './SkillsRecommender';
import ContactSubmissions from './ContactSubmissions';
import type { ContactSubmission } from '@/lib/types';

type AdminPanelProps = {
  contactSubmissions: ContactSubmission[];
};

export default function AdminPanel({ contactSubmissions }: AdminPanelProps) {
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
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Admin Panel</SheetTitle>
          <SheetDescription>
            Access AI tools and view contact messages here.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="headline" className="flex-1 flex flex-col mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="headline">Headline AI</TabsTrigger>
            <TabsTrigger value="skills">Skills AI</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="headline" className="flex-1 overflow-auto">
            <HeadlineGenerator />
          </TabsContent>
          <TabsContent value="skills" className="flex-1 overflow-auto">
            <SkillsRecommender />
          </TabsContent>
          <TabsContent value="messages" className="flex-1 overflow-auto">
            <ContactSubmissions submissions={contactSubmissions} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
