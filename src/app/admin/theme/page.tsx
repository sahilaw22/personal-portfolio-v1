
'use client';
import HeroBackgroundEditor from '@/components/admin/theme/HeroBackgroundEditor';
import ThemeEditor from '@/components/admin/theme/ThemeEditor';

export default function ThemeAdminPage() {
    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ThemeEditor />
            <HeroBackgroundEditor />
        </div>
    );
}
