import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react";
type TProjectModalProps = {
    title: string;
    trigger: ReactNode;
    content: ReactNode;
  };
export function CustomModal({ title, trigger, content }: TProjectModalProps) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent  className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
