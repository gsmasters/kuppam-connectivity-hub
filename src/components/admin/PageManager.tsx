import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageList } from "./pages/PageList";
import { PageForm } from "./pages/PageForm";
import { usePageManager } from "@/hooks/usePageManager";

export const PageManager = () => {
  const {
    pages,
    isLoading,
    editingPage,
    newPage,
    pageName,
    pageContent,
    setNewPage,
    setPageName,
    setPageContent,
    createPage,
    updatePage,
    handleEdit,
    handleCancel,
  } = usePageManager();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        {!newPage && !editingPage && (
          <Button onClick={() => setNewPage(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {(newPage || editingPage) && (
          <PageForm
            isEditing={!!editingPage}
            pageName={pageName}
            pageContent={pageContent}
            onPageNameChange={setPageName}
            onPageContentChange={setPageContent}
            onSave={() => {
              if (editingPage) {
                updatePage.mutate();
              } else {
                createPage.mutate();
              }
            }}
            onCancel={handleCancel}
            editingPage={editingPage}
          />
        )}

        {!newPage && !editingPage && pages && (
          <PageList
            pages={pages}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};