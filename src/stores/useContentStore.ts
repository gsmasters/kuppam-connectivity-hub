import { create } from 'zustand';
import { Section } from '@/types/content';

interface ContentState {
  selectedSection: Section | null;
  content: Record<string, any>;
  unsavedChanges: Record<string, boolean>;
  isDraft: Record<string, boolean>;
  setSelectedSection: (section: Section | null) => void;
  setContent: (sectionId: string, content: any) => void;
  setUnsavedChanges: (sectionId: string, hasChanges: boolean) => void;
  setIsDraft: (sectionId: string, isDraft: boolean) => void;
  reset: () => void;
}

export const useContentStore = create<ContentState>((set) => ({
  selectedSection: null,
  content: {},
  unsavedChanges: {},
  isDraft: {},
  setSelectedSection: (section) => set({ selectedSection: section }),
  setContent: (sectionId, content) => 
    set((state) => ({
      content: { ...state.content, [sectionId]: content }
    })),
  setUnsavedChanges: (sectionId, hasChanges) =>
    set((state) => ({
      unsavedChanges: { ...state.unsavedChanges, [sectionId]: hasChanges }
    })),
  setIsDraft: (sectionId, isDraft) =>
    set((state) => ({
      isDraft: { ...state.isDraft, [sectionId]: isDraft }
    })),
  reset: () => set({
    selectedSection: null,
    content: {},
    unsavedChanges: {},
    isDraft: {}
  })
}));