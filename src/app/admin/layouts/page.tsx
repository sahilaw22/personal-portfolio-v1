'use client';

import LayoutsManager from '@/components/admin/LayoutsManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LayoutsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Layouts</CardTitle>
          <CardDescription>
            Structure presets: section order, containers, nav, cards, radius, shadows, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LayoutsManager />
        </CardContent>
      </Card>
    </div>
  );
}
