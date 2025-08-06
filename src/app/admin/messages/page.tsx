
'use client';
import { useEffect } from 'react';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import { useAppState } from '@/components/AppStateProvider';

export default function MessagesAdminPage() {
    const { markAllMessagesAsRead } = useAppState();

    useEffect(() => {
        markAllMessagesAsRead();
    }, [markAllMessagesAsRead]);
    
    return <ContactSubmissions />;
}
