'use client';
import ContactSection from '@/components/sections/ContactSection';
import { useAppState } from '@/components/AppStateProvider';

export default function ContactPage() {
  const { handleAddSubmission } = useAppState();
  return <ContactSection onFormSubmit={handleAddSubmission} />;
}
