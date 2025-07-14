import React, { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../common/components/Text';
import { BottomSheet, BottomSheetRef } from '../common/components/BottomSheet';
import { useRef } from 'react';
import { calculateEstimateTotal, calculateSectionTotal } from '../common/lib/estimate';
import type { EstimateRow, EstimateSection } from '@/data';
import { EditForm } from './EditForm';
import { useEstimateScreen } from './useEstimateScreen';
import { TextField } from '../common/components/TextField';
import { AnimatedThemeSwitch } from '../common/components/AnimatedThemeSwitch';
import { useThemeTokens } from '../common/theme/useThemeTokens';
import Feather from '@expo/vector-icons/build/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddForm } from './AddForm';

export default function EstimateScreen(): JSX.Element {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const { colors, fonts, components, numbers } = useThemeTokens();
  const {
    estimate,
    updateTitle,
    editMode,
    addMode,
    handleStartItemEdit,
    handleStartSectionEdit,
    handleStartSectionAdd,
    handleStartItemAdd,
    handleSaveItem,
    handleSaveSection,
    handleAddItem,
    handleAddSection,
    handleStopEdit,
    handleDeleteItem,
    handleDeleteSection,
  } = useEstimateScreen();

  const handleSectionPress = (section: EstimateSection): void => {
    handleStartSectionEdit(section);
    bottomSheetRef.current?.present();
  };

  const handleSectionAddPress = (): void => {
    handleStartSectionAdd();
    bottomSheetRef.current?.present();
  };

  const handleItemPress = (item: EstimateRow): void => {
    handleStartItemEdit(item);
    bottomSheetRef.current?.present();
  };

  const handleItemAddPress = (sectionId: string): void => {
    handleStartItemAdd(sectionId);
    bottomSheetRef.current?.present();
  };

  const handleCloseBottomSheet = (): void => {
    bottomSheetRef.current?.dismiss();
    handleStopEdit();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.layer.solid.medium }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.header,
            {
              paddingHorizontal: numbers.spacing.sm,
            },
          ]}
        >
          <AnimatedThemeSwitch />
          <Pressable
            onPress={() => handleSectionAddPress()}
            style={[
              styles.addButton,
              {
                borderRadius: components.button.borderRadius,
                backgroundColor: components.button.background.secondary.idle,
                paddingVertical: numbers.spacing.xs,
                paddingHorizontal: numbers.spacing.lg,
                gap: numbers.spacing.xs,
              },
            ]}
          >
            <Feather name="plus" size={24} color={colors.icon.primary} />
            <Text style={[fonts.regular.text.md, { color: colors.text.primary }]}>Add</Text>
          </Pressable>
        </View>
        <TextField
          style={[
            styles.titleInput,
            fonts.bold.headline.sm,
            { color: colors.text.primary, borderColor: colors.outline.medium },
          ]}
          value={estimate.title}
          onChangeText={updateTitle}
          placeholder="Enter estimate title"
        />
        {estimate.sections.map((section) => (
          <View key={section.id} style={[styles.section]}>
            <View style={[styles.sectionHeader, { borderColor: colors.outline.medium }]}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: numbers.spacing['2xs'] }}
              >
                <Pressable onPress={() => handleSectionPress(section)}>
                  <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
                    {section.title}
                  </Text>
                </Pressable>
                <Pressable onPress={() => handleItemAddPress(section.id)}>
                  <View
                    style={{
                      width: numbers.sizing.icon.sm * 2,
                      height: numbers.sizing.icon.sm * 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: components.button.background.secondary.idle,
                      borderRadius: components.button.borderRadius,
                    }}
                  >
                    <Feather name="plus" size={24} color={colors.icon.primary} />
                  </View>
                </Pressable>
              </View>
              <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
                ${calculateSectionTotal(section).toFixed(2)}
              </Text>
            </View>
            {section.rows.map((row) => (
              <Pressable
                key={row.id}
                style={[
                  styles.row,
                  { borderColor: colors.outline.medium, backgroundColor: colors.layer.solid.light },
                ]}
                onPress={() => handleItemPress(row)}
              >
                <View style={styles.rowLeftContent}>
                  <Text style={[fonts.regular.text.md, { color: colors.text.primary }]}>
                    {row.title}
                  </Text>
                  <Text style={[fonts.regular.text.sm, { color: colors.text.secondary }]}>
                    ${row.price.toFixed(2)} × {row.quantity} {row.uom}
                  </Text>
                </View>
                <Text style={[fonts.regular.text.md, { color: colors.text.primary }]}>
                  ${(row.price * row.quantity).toFixed(2)}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
        <View style={styles.estimateTotal}>
          <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>Total:</Text>
          <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
            ${calculateEstimateTotal(estimate).toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      <BottomSheet ref={bottomSheetRef}>
        {editMode && (
          <EditForm
            key={editMode.data.id}
            mode={editMode.type}
            data={editMode.data}
            onSave={editMode.type === 'item' ? handleSaveItem : handleSaveSection}
            onDelete={editMode.type === 'item' ? handleDeleteItem : handleDeleteSection}
            onClose={handleCloseBottomSheet}
          />
        )}
        {addMode && (
          <AddForm
            key={addMode.type}
            mode={addMode.type}
            onSave={addMode.type === 'item' ? handleAddItem : handleAddSection}
            onClose={handleCloseBottomSheet}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleInput: {
    padding: 16,
    borderBottomWidth: 1,
  },
  section: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeftContent: {
    flex: 1,
    marginRight: 16,
  },
  rowTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  rowPriceDetails: {
    fontSize: 14,
  },
  estimateTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 8,
  },
});
