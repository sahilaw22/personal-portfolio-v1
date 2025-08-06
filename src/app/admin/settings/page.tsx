
'use client';
import PasswordEditor from '@/components/admin/settings/PasswordEditor';
import SettingsEditor from '@/components/admin/settings/SettingsEditor';

export default function SettingsAdminPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingsEditor />
            <PasswordEditor />
        </div>
    );
}
