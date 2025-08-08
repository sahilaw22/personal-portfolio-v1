
'use client';

import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { LineChart, Users } from 'lucide-react';

export default function VisitorAnalytics() {
  const { portfolioData } = useAppState();
  const { pageViews = [] } = portfolioData;

  const totalViews = pageViews.length;
  const recentViews = [...pageViews].reverse().slice(0, 20);

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <CardTitle>Portfolio Analytics</CardTitle>
          <CardDescription>
            An overview of your portfolio&apos;s visitor traffic.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              Total number of times your portfolio has been visited.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
          <CardDescription>
            A list of the most recent visits to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentViews.length > 0 ? (
                  recentViews.map((view, index) => (
                    <TableRow key={view.timestamp + '-' + index}>
                      <TableCell>{totalViews - index}</TableCell>
                      <TableCell>
                        {format(new Date(view.timestamp), 'PPP')}
                      </TableCell>
                       <TableCell>
                        {format(new Date(view.timestamp), 'p')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No visitor data yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
