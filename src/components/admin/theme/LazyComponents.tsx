'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy admin components
export const LazyThemeEditor = lazy(() => import('./ModernThemeEditor'));
export const LazyBackgroundEditor = lazy(() => import('./ModernBackgroundEditor'));
export const LazyHeroBackgroundEditor = lazy(() => import('./HeroBackgroundEditor'));

// Loading skeleton components
const ThemeEditorSkeleton = () => (
  <div className="space-y-6">
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-4 w-64" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <div className="flex gap-1 mb-2">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="flex-1 h-8 rounded" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="w-12 h-10 rounded-lg" />
                  <Skeleton className="flex-1 h-10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const BackgroundEditorSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Card>
      <CardContent className="p-6">
        <Skeleton className="w-full aspect-video rounded-lg mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
    </Card>
    
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const HeroBackgroundEditorSkeleton = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-10 w-24" />
    </div>

    <Card>
      <CardContent className="p-6">
        <Skeleton className="w-full aspect-video rounded-xl mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-1">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(2)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Loading fallback component
const LoadingFallback = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center p-8"
  >
    <div className="text-center space-y-3">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <p className="text-muted-foreground">Loading theme editor...</p>
    </div>
  </motion.div>
);

// Wrapper components with suspense
export const SuspendedThemeEditor = () => (
  <Suspense fallback={<ThemeEditorSkeleton />}>
    <LazyThemeEditor />
  </Suspense>
);

export const SuspendedBackgroundEditor = () => (
  <Suspense fallback={<BackgroundEditorSkeleton />}>
    <LazyBackgroundEditor />
  </Suspense>
);

export const SuspendedHeroBackgroundEditor = () => (
  <Suspense fallback={<HeroBackgroundEditorSkeleton />}>
    <LazyHeroBackgroundEditor />
  </Suspense>
);

export default {
  SuspendedThemeEditor,
  SuspendedBackgroundEditor,
  SuspendedHeroBackgroundEditor,
};
