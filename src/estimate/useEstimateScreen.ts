import type { Estimate, EstimateRow, EstimateSection } from '@/data';
import { AddMode, EditMode, useEstimateContext } from './context';

export function useEstimateScreen(): {
  estimate: Estimate;
  editMode: EditMode | null;
  addMode: AddMode | null;
  updateTitle: (title: string) => void;
  handleStartItemEdit: (item: EstimateRow) => void;
  handleStartSectionEdit: (section: EstimateSection) => void;
  handleStartSectionAdd: () => void;
  handleStartItemAdd: (sectionId: string) => void;
  handleAddItem: (updatedItem: EstimateRow) => void;
  handleAddSection: (section: EstimateSection) => void;
  handleSaveItem: (updatedItem: EstimateRow) => void;
  handleSaveSection: (updates: Partial<EstimateSection>) => void;
  handleStopEdit: () => void;
  handleDeleteItem: (rowId: string) => void;
  handleDeleteSection: (sectionId: string) => void;
} {
  const {
    estimate,
    editMode,
    addMode,
    updateTitle,
    updateItem,
    updateSection,
    addItem,
    addSection,
    deleteItem,
    deleteSection,
    selectAddItem,
    selectAddSection,
    selectItem,
    selectSection,
    clearSelection,
  } = useEstimateContext();

  const handleSaveItem = (updatedItem: EstimateRow): void => {
    if (editMode?.type !== 'item') {
      return;
    }

    updateItem(updatedItem.id, updatedItem);
  };

  const handleAddItem = (item: EstimateRow): void => {
    if (addMode?.type !== 'item') {
      return;
    }

    addItem(item);
  };

  const handleAddSection = (section: EstimateSection): void => {
    if (addMode?.type !== 'group') {
      return;
    }

    addSection(section);
  };

  const handleSaveSection = (updates: Partial<EstimateSection>): void => {
    if (editMode?.type !== 'group') {
      return;
    }

    updateSection(editMode.data.id, updates);
  };

  return {
    estimate,
    editMode,
    addMode,
    updateTitle,
    handleStartItemEdit: selectItem,
    handleStartSectionEdit: selectSection,
    handleStartSectionAdd: selectAddSection,
    handleStartItemAdd: selectAddItem,
    handleSaveItem,
    handleSaveSection,
    handleAddItem,
    handleAddSection,
    handleStopEdit: clearSelection,
    handleDeleteItem: deleteItem,
    handleDeleteSection: deleteSection,
  };
}
