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
    templates,
    selectedTemplate,
    setNewPage,
    setPageName,
    setPageContent,
    setSelectedTemplate,
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
      {(newPage || editingPage) ? (
        <PageForm
          isEditing={!!editingPage}
          pageName={pageName}
          pageContent={pageContent}
          templates={templates}
          selectedTemplate={selectedTemplate}
          onPageNameChange={setPageName}
          onPageContentChange={setPageContent}
          onTemplateChange={setSelectedTemplate}
          onSave={() => {
            if (editingPage) {
              updatePage.mutate({
                pageId: editingPage.id,
                pageName: pageName,
                pageContent: pageContent
              });
            } else {
              createPage.mutate({
                pageName: pageName,
                selectedTemplate: selectedTemplate
              });
            }
          }}
          onCancel={handleCancel}
          editingPage={editingPage}
        />
      ) : (
        <PageList
          pages={pages || []}
          onEdit={handleEdit}
          onNewPage={() => setNewPage(true)}
        />
      )}
    </div>
  );
};