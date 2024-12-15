import { useState, useEffect } from "react";
import { Section } from "@/types/content";
import { useContentLoader } from "./content/useContentLoader";
import { useContentOperations } from "./content/useContentOperations";

export const useContentManagement = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});

  const {
    loading,
    sections,
    content,
    isDraft,
    loadContent,
    setContent,
    setIsDraft
  } = useContentLoader();

  const {
    saving,
    handleContentChange,
    handleSave,
    handlePublish
  } = useContentOperations(content, setContent, setIsDraft, setUnsavedChanges);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    selectedSection,
    setSelectedSection,
    loading,
    saving,
    sections,
    content,
    unsavedChanges,
    isDraft,
    handleContentChange,
    handleSave,
    handlePublish,
    refreshContent: loadContent
  };
};