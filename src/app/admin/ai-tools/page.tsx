'use client';
import { Suspense, lazy } from 'react';

const HeadlineGenerator = lazy(() => import('@/components/admin/HeadlineGenerator'));
const SkillsRecommender = lazy(() => import('@/components/admin/SkillsRecommender'));

export default function AiToolsAdminPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Suspense fallback={<div className="h-64 rounded-md border animate-pulse" />}> 
        <HeadlineGenerator />
      </Suspense>
      <Suspense fallback={<div className="h-64 rounded-md border animate-pulse" />}> 
        <SkillsRecommender />
      </Suspense>
    </div>
  );
}
