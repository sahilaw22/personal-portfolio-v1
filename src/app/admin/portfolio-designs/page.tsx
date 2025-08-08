'use client';

import PortfolioDesignsManager from '@/components/admin/PortfolioDesignsManager';
import LayoutsManager from '@/components/admin/LayoutsManager';
import OptionalLayoutSettings from '../../../components/admin/OptionalLayoutSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UIStylesManager from '@/components/admin/UIStylesManager';

export default function PortfolioDesignsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Designs</CardTitle>
          <CardDescription>
            Curated templates, structural layouts, and optional fine‑tuning — all in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="layouts">Layouts</TabsTrigger>
              <TabsTrigger value="optional">Optional</TabsTrigger>
              <TabsTrigger value="ui">UI Styles</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="pt-6">
              <PortfolioDesignsManager />
            </TabsContent>

            <TabsContent value="layouts" className="pt-6">
              <LayoutsManager />
            </TabsContent>

            <TabsContent value="optional" className="pt-6">
              <OptionalLayoutSettings />
            </TabsContent>

            <TabsContent value="ui" className="pt-6">
              <UIStylesManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
