import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Plus } from "lucide-react";
import { Page } from "@/types/content";

interface PageListProps {
  pages: Page[];
  onEdit: (page: Page) => void;
  onNewPage: () => void;
}

export const PageList = ({ pages, onEdit, onNewPage }: PageListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button onClick={onNewPage} className="gap-2">
          <Plus className="h-4 w-4" />
          New Page
        </Button>
      </div>
      <div className="grid gap-4">
        {pages?.map((page) => (
          <Card key={page.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{page.name}</h3>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => onEdit(page)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};