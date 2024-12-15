import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PreviewSectionProps {
  content: string;
  isDraft: boolean;
  contentType: string;
  layoutWidth?: number | null;
  layoutHeight?: number | null;
}

export const PreviewSection = ({
  content,
  isDraft,
  contentType,
  layoutWidth,
  layoutHeight,
}: PreviewSectionProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your content will look on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="desktop" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="desktop">
              <ScrollArea className="h-[calc(100vh-400px)] w-full rounded-md border">
                <div className="p-4">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content || "" }}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="mobile">
              <ScrollArea className="h-[calc(100vh-400px)] mx-auto" style={{ maxWidth: "375px" }}>
                <div className="p-4 border rounded-md">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content || "" }}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isDraft && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This content is currently in draft mode. Click "Publish" to make it live.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Content Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-medium">Status: </span>
            <span className={`${isDraft ? 'text-yellow-600' : 'text-green-600'}`}>
              {isDraft ? 'Draft' : 'Published'}
            </span>
          </div>
          <div>
            <span className="font-medium">Content Type: </span>
            <span className="capitalize">{contentType}</span>
          </div>
          {(layoutWidth || layoutHeight) && (
            <div>
              <span className="font-medium">Recommended Dimensions: </span>
              <span>
                {layoutWidth && `Width: ${layoutWidth}px`}
                {layoutWidth && layoutHeight && ' × '}
                {layoutHeight && `Height: ${layoutHeight}px`}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};