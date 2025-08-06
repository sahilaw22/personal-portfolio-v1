
'use client';
import HeroBackgroundEditor from '@/components/admin/theme/HeroBackgroundEditor';

export default function ThemeAdminPage() {
    return (
        <div className="grid md:grid-cols-2 gap-6 items-start">
            <HeroBackgroundEditor />
        </div>
    );
}
