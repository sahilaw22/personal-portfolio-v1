
'use client';
import { useState } from 'react';
import HeroBackgroundEditor from '@/components/admin/theme/HeroBackgroundEditor';
import ThemeEditor from '@/components/admin/theme/ThemeEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ThemeAdminPage() {

    return (
        <Tabs defaultValue="palette" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="palette">Color & Background</TabsTrigger>
                <TabsTrigger value="heroBackground">Hero Glow</TabsTrigger>
            </TabsList>
            <TabsContent value="palette">
                 <Card>
                    <CardHeader>
                        <CardTitle>Color & Background</CardTitle>
                        <CardDescription>Adjust your site's color palette and set a global background image. Changes apply live.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ThemeEditor />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="heroBackground">
                <Card>
                    <CardHeader>
                        <CardTitle>Hero Background Glow</CardTitle>
                        <CardDescription>Customize the glowing background effect behind your profile picture. Changes apply live.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <HeroBackgroundEditor />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
