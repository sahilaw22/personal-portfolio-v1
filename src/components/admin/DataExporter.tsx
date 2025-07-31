
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/components/AppStateProvider';
import { Download } from 'lucide-react';

export default function DataExporter() {
  const { portfolioData } = useAppState();

  const handleExport = () => {
    // We need to clean up the submissions so they don't get committed to the repo
    const dataToExport = {
      ...portfolioData,
      contactSubmissions: [],
    };
    
    const fileContent = `
import type { PortfolioData } from './types';

export const initialData: PortfolioData = ${JSON.stringify(dataToExport, null, 2)};
`;

    const blob = new Blob([fileContent.trim()], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initial-data.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Portfolio Data</CardTitle>
        <CardDescription>
          Download your current portfolio data as a file. You can use this file to permanently save your changes by replacing the `src/lib/initial-data.ts` file in your project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Make all your desired changes in the admin panel and save them.</li>
                <li>Click the "Download Data File" button below.</li>
                <li>A file named `initial-data.ts` will be downloaded to your computer.</li>
                <li>In your project's code, navigate to the `src/lib/` folder.</li>
                <li>Replace the existing `initial-data.ts` file with the one you just downloaded.</li>
                <li>Commit the new file to Git and redeploy your website. Your changes will now be permanent.</li>
            </ol>
            <Button onClick={handleExport} className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Data File
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
