
'use client';
import { useState } from 'react';
import HeroBackgroundEditor from '@/components/admin/theme/HeroBackgroundEditor';
import ThemeEditor from '@/components/admin/theme/ThemeEditor';
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Palette, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type View = 'palette' | 'heroBackground';

export default function ThemeAdminPage() {
    const [view, setView] = useState<View>('palette');

    return (
        <div className="flex -m-4 lg:-m-6">
            <Sidebar className="w-64" side="left" collapsible="none" variant="sidebar">
                 <div className="p-4">
                    <h2 className="text-lg font-semibold">Theme Settings</h2>
                    <p className="text-sm text-muted-foreground">Customize your portfolio's look.</p>
                 </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setView('palette')} isActive={view === 'palette'}>
                            <Palette />
                            <span>Color &amp; Background</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setView('heroBackground')} isActive={view === 'heroBackground'}>
                            <ImageIcon />
                           <span>Hero Background</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </Sidebar>
            <div className="flex-1 p-4 lg:p-6">
                 {view === 'palette' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Color &amp; Background</CardTitle>
                            <CardDescription>Adjust your site's color palette and set a global background image. Changes apply live.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ThemeEditor />
                        </CardContent>
                    </Card>
                 )}
                 {view === 'heroBackground' && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Hero Background Glow</CardTitle>
                            <CardDescription>Customize the glowing background effect behind your profile picture. Changes apply live.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <HeroBackgroundEditor />
                        </CardContent>
                    </Card>
                 )}
            </div>
        </div>
    );
}
