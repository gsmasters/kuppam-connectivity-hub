import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Page } from "@/types/content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { PageFormHeader } from "./form/PageFormHeader";
import { PageFormFields } from "./form/PageFormFields";
import { Button } from "@/components/ui/button";
import { Plus, Eye, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

interface PageFormValues {
  pageName: string;
  pageContent: string;
  templateId?: string;
}

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
  const form = useForm<PageFormValues>({
    defaultValues: {
      pageName: pageName,
      pageContent: pageContent,
      templateId: selectedTemplate || undefined
    }
  });

  const handleSubmit = (data: PageFormValues) => {
    if (!data.pageName.trim()) {
      toast.error("Page name is required");
      return;
    }
    onPageNameChange(data.pageName);
    onPageContentChange(data.pageContent);
    if (data.templateId) {
      onTemplateChange(data.templateId);
    }
    onSave();
  };

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
          <CardContent className="pt-6 space-y-4">
            <PageFormHeader
              editingPage={editingPage}
              pageContent={pageContent}
              onCancel={onCancel}
              onSubmit={form.handleSubmit(handleSubmit)}
            />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <ScrollArea className="h-[600px]">
                  <div className="p-4 space-y-4">
                    <PageFormFields
                      form={form}
                      templates={templates}
                      isEditing={isEditing}
                      onPageContentChange={onPageContentChange}
                    />
                  </div>
                </ScrollArea>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-3">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Add Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.type}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    // Handle adding section
                    console.log(`Adding section: ${section.type}`);
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
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Page Sections</h3>
            <div className="space-y-2">
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