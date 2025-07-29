import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ContactSubmission } from "@/lib/types";

type ContactSubmissionsProps = {
  submissions: ContactSubmission[];
};

export default function ContactSubmissions({ submissions }: ContactSubmissionsProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>
          Messages received from the contact form.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length > 0 ? (
                submissions.slice().reverse().map((submission, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{submission.name}</div>
                      <div className="text-xs text-muted-foreground">{submission.email}</div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{submission.message}</TableCell>
                    <TableCell className="text-right text-xs">
                      {submission.submittedAt.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No messages yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
