import React, { createContext, useCallback, useContext, useMemo } from 'react';
import type { Estimate, EstimateRow, EstimateSection } from '@/data';
import { PropsWithChildren, useState } from 'react';
import { sampleEstimate } from '@/data';

export type EditMode =
  | {
      type: 'item';
      data: EstimateRow;
    }
  | {
      type: 'group';
      data: EstimateSection;
    }
  | null;

export type AddMode =
  | {
      type: 'item';
      sectionId: string;
    }
  | {
      type: 'group';
    }
  | null;

interface EstimateContextValue {
  estimate: Estimate;
  editMode: EditMode;
  addMode: AddMode;
  updateTitle: (title: string) => void;
  updateSection: (sectionId: string, updates: Partial<EstimateSection>) => void;
  updateItem: (rowId: string, updates: Partial<EstimateRow>) => void;
  addItem: (item: EstimateRow) => void;
  addSection: (section: EstimateSection) => void;
  deleteItem: (rowId: string) => void;
  deleteSection: (sectionId: string) => void;
  selectItem: (item: EstimateRow) => void;
  selectAddItem: (sectionId: string) => void;
  selectSection: (section: EstimateSection) => void;
  selectAddSection: () => void;
  clearSelection: () => void;
}

export const EstimateContext = createContext<EstimateContextValue | null>(null);

export function EstimateProvider({ children }: PropsWithChildren): JSX.Element {
  const [estimate, setEstimate] = useState<Estimate>(sampleEstimate);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [addMode, setAddMode] = useState<AddMode>(null);

  const updateTitle = useCallback((title: string): void => {
    setEstimate((prev) => ({
      ...prev,
      title,
      updatedAt: new Date(),
    }));
  }, []);

  const updateSection = useCallback(
    (sectionId: string, updateSection: Partial<EstimateSection>): void => {
      setEstimate((prev) => ({
        ...prev,
        updatedAt: new Date(),
        sections: prev.sections.map((section) =>
          section.id === sectionId ? { ...section, ...updateSection } : section,
        ),
      }));
      setEditMode(null);
    },
    [],
  );

  const updateItem = useCallback((rowId: string, updateItem: Partial<EstimateRow>): void => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) => ({
        ...section,
        rows: section.rows.map((row) => (row.id === rowId ? { ...row, ...updateItem } : row)),
      })),
    }));
    setEditMode(null);
  }, []);

  const addItem = useCallback((item: EstimateRow): void => {
    if (addMode?.type !== 'item') {
      return;
    }

    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) => {
        if (section.id === addMode.sectionId) {
          return {
            ...section,
            rows: [item, ...section.rows],
          };
        }
        return section;
      }),
    }));
    setAddMode(null);
  }, []);

  const deleteItem = useCallback((rowId: string): void => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.map((section) => ({
        ...section,
        rows: section.rows.filter((row) => row.id !== rowId),
      })),
    }));
    setEditMode(null);
  }, []);

  const addSection = useCallback((section: EstimateSection): void => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: [section, ...prev.sections],
    }));
    setAddMode(null);
  }, []);

  const deleteSection = useCallback((sectionId: string): void => {
    setEstimate((prev) => ({
      ...prev,
      updatedAt: new Date(),
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }));
    setEditMode(null);
  }, []);

  const selectItem = useCallback((item: EstimateRow): void => {
    setEditMode({ type: 'item', data: item });
  }, []);

  const selectAddItem = useCallback((sectionId: string): void => {
    setAddMode({ type: 'item', sectionId });
  }, []);

  const selectSection = useCallback((section: EstimateSection): void => {
    setEditMode({ type: 'group', data: section });
  }, []);

  const selectAddSection = useCallback((): void => {
    setAddMode({ type: 'group' });
  }, []);

  const clearSelection = useCallback((): void => {
    setEditMode(null);
    setAddMode(null);
  }, []);

  const value = useMemo(
    () => ({
      estimate,
      editMode,
      addMode,
      updateTitle,
      updateSection,
      updateItem,
      addItem,
      addSection,
      deleteItem,
      deleteSection,
      selectAddItem,
      selectAddSection,
      selectItem,
      selectSection,
      clearSelection,
    }),
    [
      estimate,
      editMode,
      addMode,
      updateTitle,
      updateSection,
      updateItem,
      addItem,
      addSection,
      deleteItem,
      deleteSection,
      selectAddItem,
      selectAddSection,
      selectItem,
      selectSection,
      clearSelection,
    ],
  );

  return <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>;
}

export function useEstimateContext(): EstimateContextValue {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error('useEstimate must be used within an EstimateProvider');
  }
  return context;
}
