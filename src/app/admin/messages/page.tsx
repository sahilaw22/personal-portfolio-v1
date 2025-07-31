'use client';
import { useAppState } from '@/components/AppStateProvider';
import ContactSubmissions from '@/components/admin/ContactSubmissions';

export default function MessagesAdminPage() {
    const { contactSubmissions } = useAppState();
    return <ContactSubmissions submissions={contactSubmissions} />;
}
