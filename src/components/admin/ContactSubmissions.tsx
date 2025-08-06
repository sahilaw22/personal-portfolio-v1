
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ContactSubmission } from "@/lib/types";
import { useAppState } from "../AppStateProvider";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function ContactSubmissions() {
  const { contactSubmissions } = useAppState();
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>
          Messages received from the contact form. Unread messages are highlighted.
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
              {contactSubmissions.length > 0 ? (
                contactSubmissions.slice().reverse().map((submission, index) => (
                  <TableRow key={index} className={cn(!submission.isRead && "bg-primary/10")}>
                    <TableCell>
                      <div className="font-medium flex items-center gap-2">
                        {submission.name}
                        {!submission.isRead && <Badge variant="destructive" className="h-4 px-1.5 py-0">New</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">{submission.email}</div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{submission.message}</TableCell>
                    <TableCell className="text-right text-xs">
                      {new Date(submission.submittedAt).toLocaleString()}
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
