'use client';
import { usePerformanceOptimizations } from '@/lib/performance';

export default function PerformanceProvider({ children }: { children: React.ReactNode }) {
  // Initialize performance optimizations
  usePerformanceOptimizations();
  
  return <>{children}</>;
}
