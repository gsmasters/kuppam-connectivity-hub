import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PreviewDialogProps {
  content: string;
}

export const PreviewDialog = ({ content }: PreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Content Preview</DialogTitle>
        </DialogHeader>
        <div 
          className="overflow-y-auto prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </DialogContent>
    </Dialog>
  );
};