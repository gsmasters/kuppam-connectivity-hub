import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RichTextEditor } from "../../RichTextEditor";

interface PageFormFieldsProps {
  form: UseFormReturn<any>;
  templates?: any[];
  isEditing: boolean;
  onPageContentChange: (content: string) => void;
}

export const PageFormFields = ({ 
  form, 
  templates, 
  isEditing,
  onPageContentChange 
}: PageFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="pageName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Page Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter page name" />
            </FormControl>
          </FormItem>
        )}
      />

      {!isEditing && templates && templates.length > 0 && (
        <FormField
          control={form.control}
          name="templateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose a Template</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={template.id} id={template.id} />
                      <Label htmlFor={template.id}>{template.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          content={form.getValues("pageContent")}
          onChange={(content) => {
            form.setValue("pageContent", content);
            onPageContentChange(content);
          }}
        />
      </div>
    </div>
  );
};