'use client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Loading skeleton for sections
export function SectionSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading skeleton for hero section
export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center animate-pulse">
      <div className="text-center space-y-6">
        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="flex justify-center gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for admin sections
export function AdminSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Optimized Suspense wrapper
export function OptimizedSuspense({ 
  children, 
  fallback, 
  className = "" 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
  className?: string;
}) {
  return (
    <Suspense 
      fallback={
        fallback || (
          <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}
