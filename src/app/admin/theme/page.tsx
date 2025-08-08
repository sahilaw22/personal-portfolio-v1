
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Image, 
  Sparkles, 
    Wand2, 
  Eye,
  Layers,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
  Type,
  Grid
} from 'lucide-react';
import { 
  SuspendedThemeEditor as ModernThemeEditor, 
  SuspendedBackgroundEditor as ModernBackgroundEditor, 
  SuspendedHeroBackgroundEditor as HeroBackgroundEditor 
} from '@/components/admin/theme/LazyComponents';
import GradientTextEditor from '@/components/admin/theme/GradientTextEditor';
import PatternEditor from '@/components/admin/theme/PatternEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ThemeAdminPage() {
    const [activeTab, setActiveTab] = useState("palette");
    const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const tabs = [
        {
            value: "palette",
            label: "Color Palette",
            icon: Palette,
            description: "Create stunning color schemes with AI assistance",
            badge: "AI Enhanced"
        },
        {
            value: "gradientText", 
            label: "Gradient Text",
            icon: Type,
            description: "Add beautiful gradient effects to text elements",
            badge: "New"
        },
        {
            value: "patterns", 
            label: "Patterns",
            icon: Grid,
            description: "Beautiful background patterns with visibility control",
            badge: "New"
        },
        {
            value: "background", 
            label: "Background",
            icon: Image,
            description: "Advanced background effects and patterns",
            badge: "Pro"
        },
        {
            value: "heroGlow",
            label: "Hero Glow",
            icon: Sparkles, 
            description: "Animated glow effects behind your profile",
            badge: "Effects"
        }
    ];

    return (
        <div className="container max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
                            <Wand2 className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Theme Studio
                            </h1>
                            <p className="text-muted-foreground">
                                Design your portfolio with advanced customization tools
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Preview Mode Selector */}
                <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                    <Button
                        variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setPreviewMode('desktop')}
                        className="h-8"
                    >
                        <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setPreviewMode('tablet')}
                        className="h-8"
                    >
                        <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setPreviewMode('mobile')}
                        className="h-8"
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Modern Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 h-auto p-1">{/* Updated to grid-cols-5 */}
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-4 h-auto flex-col gap-2 transition-all duration-200 hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{tab.label}</span>
                                    {tab.badge && (
                                        <Badge 
                                            variant={tab.value === activeTab ? "secondary" : "outline"} 
                                            className="text-xs px-2 py-0.5"
                                        >
                                            {tab.badge}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground text-center leading-tight">
                                    {tab.description}
                                </p>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {/* Tab Content with animations */}
                <div className="mt-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <TabsContent value="palette" className="m-0">
                                <ModernThemeEditor />
                            </TabsContent>

                            <TabsContent value="gradientText" className="m-0">
                                <GradientTextEditor />
                            </TabsContent>

                            <TabsContent value="patterns" className="m-0">
                                <PatternEditor />
                            </TabsContent>
                            
                            <TabsContent value="background" className="m-0">
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-card/50 to-card">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Image className="h-6 w-6 text-primary" aria-label="Background" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl">Background Designer</CardTitle>
                                                <CardDescription>
                                                    Create stunning backgrounds with patterns, gradients, and effects
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ModernBackgroundEditor />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            
                            <TabsContent value="heroGlow" className="m-0">
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-card/50 to-card">
                                    <CardContent className="p-6">
                                        <HeroBackgroundEditor />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Tabs>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>All changes apply instantly</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span>AI-powered suggestions available</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Layers className="h-4 w-4" />
                    <span>Mobile responsive preview</span>
                </div>
            </div>
        </div>
    );
}
