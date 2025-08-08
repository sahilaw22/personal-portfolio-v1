
'use client';
import { lazy, Suspense } from 'react';

const VisitorAnalytics = lazy(() => import('@/components/admin/analytics/VisitorAnalytics'));

export default function AnalyticsAdminPage() {
        return (
            <Suspense fallback={<div className="h-64 rounded-md border animate-pulse" />}> 
                <VisitorAnalytics />
            </Suspense>
        );
}
