'use client';

import ContentEditor from '@/components/admin/ContentEditor';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="flex flex-col">
        <Card>
            <CardHeader>
                <CardTitle>Welcome to the Admin Panel</CardTitle>
        <CardDescription>
          Select a category from the sidebar to start customizing your portfolio. This page handles the &quot;General&quot; content of your portfolio, like the hero section.
        </CardDescription>
            </CardHeader>
        </Card>
      <div className="mt-6">
        <ContentEditor />
      </div>
    </div>
  );
}
