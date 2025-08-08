
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/components/AppStateProvider';
import { Download } from 'lucide-react';

export default function DataExporter() {
  const { portfolioData } = useAppState();

  const handleExport = () => {
  // We need to clean up the submissions so they don&apos;t get committed to the repo
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
          Download your current portfolio data as a TypeScript file. You can use this file to permanently save your changes by replacing the content in your project&apos;s code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Important Instructions:</h3>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Make all your desired changes in the admin panel and save them.</li>
                <li>Click the &quot;Download Data File&quot; button below to download `initial-data.ts`.</li>
                <li>In your project&apos;s code, navigate to the `src/lib/` folder.</li>
                <li>Replace the existing `initial-data.ts` file with the one you just downloaded.</li>
                 <li className="font-semibold text-primary">
                    Since images are now embedded in the data file, you no longer need to manage the `public/uploads` directory.
                </li>
                <li>Commit the updated `initial-data.ts` file, then redeploy your website. Your changes will now be permanent.</li>
            </ol>
            <Button onClick={handleExport} className="w-full md:w-auto mt-4">
                <Download className="mr-2 h-4 w-4" />
                Download Data File
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
