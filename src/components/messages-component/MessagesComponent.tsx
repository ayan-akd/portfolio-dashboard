"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { TMessage } from "@/types/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import ConfirmationBox from "@/components/ConfirmationBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteMessage } from "@/services/messages";
type TExtendedMessage = TMessage & {
  _id: string;
};
export default function MessageComponent({
  messages,
}: {
  messages: TExtendedMessage[];
}) {
  const [selectedMessage, setSelectedMessage] = useState<TMessage | null>(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteMessage(id);

      if (response.success) {
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const handleViewMessage = (message: TMessage) => {
    setSelectedMessage(message);
    setOpen(true);
  };
  return (
    <ContentLayout title="Manage Messages">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">All Messages</h1>
        <div className="rounded-md border mt-10">
          <Table className="overflow-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="max-w-[300px]">Message</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message._id}>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {message.message}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <ConfirmationBox
                        trigger={
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                        onConfirm={() => handleDelete(message._id)}
                        title="Are you sure you want to delete this message?"
                        description="This action cannot be undone."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedMessage?.email}</p>
              </div>
              <div>
                <p className="font-semibold">Message:</p>
                <p className="whitespace-pre-wrap">
                  {selectedMessage?.message}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}
