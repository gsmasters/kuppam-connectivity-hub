import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X, Plus, Eye, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { RichTextEditor } from "../RichTextEditor";
import { PreviewDialog } from "../PreviewDialog";
import { Page } from "@/types/content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PageFormProps {
  isEditing: boolean;
  pageName: string;
  pageContent: any;
  templates?: any[];
  selectedTemplate: string | null;
  onPageNameChange: (name: string) => void;
  onPageContentChange: (content: any) => void;
  onTemplateChange: (templateId: string) => void;
  onSave: () => void;
  onCancel: () => void;
  editingPage: Page | null;
}

export const PageForm = ({
  isEditing,
  pageName,
  pageContent,
  templates,
  selectedTemplate,
  onPageNameChange,
  onPageContentChange,
  onTemplateChange,
  onSave,
  onCancel,
  editingPage
}: PageFormProps) => {
  const sections = [
    { type: 'hero', label: 'Hero Section' },
    { type: 'content', label: 'Content Block' },
    { type: 'image', label: 'Image Gallery' },
    { type: 'contact', label: 'Contact Form' },
    { type: 'cta', label: 'Call to Action' }
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {editingPage ? "Edit Page" : "Create New Page"}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onCancel}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={onSave}
                disabled={!pageName.trim()}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {editingPage ? "Update" : "Create"}
              </Button>
              {pageContent && (
                <PreviewDialog content={pageContent} />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Page name"
              value={pageName}
              onChange={(e) => onPageNameChange(e.target.value)}
            />
            {!isEditing && templates && templates.length > 0 && (
              <div className="space-y-4">
                <Label>Choose a Template</Label>
                <RadioGroup
                  value={selectedTemplate || undefined}
                  onValueChange={onTemplateChange}
                >
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={template.id} id={template.id} />
                      <Label htmlFor={template.id}>{template.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            <ScrollArea className="h-[600px] rounded-md border">
              <div className="p-4 space-y-4">
                <RichTextEditor
                  content={pageContent}
                  onChange={onPageContentChange}
                />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.type}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    // Handle adding section
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {section.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Page Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Example section items */}
              <div className="flex items-center justify-between p-2 border rounded-md">
                <span>Hero Section</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};