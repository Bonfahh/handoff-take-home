import React, { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../common/components/Text';
import { calculateEstimateTotal, calculateSectionTotal } from '../common/lib/estimate';
import { EditForm } from './EditForm';
import { useEstimateScreen } from './useEstimateScreen';
import { TextField } from '../common/components/TextField';
import { useThemeTokens } from '../common/theme/useThemeTokens';
import { AnimatedThemeSwitch } from '../common/components/AnimatedThemeSwitch';
import { Feather } from '@expo/vector-icons';
import { AddForm } from './AddForm';
import { numbersAliasTokens } from '../common/theme/tokens/alias/numbers';

export default function EstimateScreenDesktop(): JSX.Element {
  const { colors, fonts, numbers, components } = useThemeTokens();
  const {
    estimate,
    updateTitle,
    editMode,
    addMode,
    handleStartItemEdit,
    handleStartSectionEdit,
    handleSaveItem,
    handleSaveSection,
    handleStopEdit,
    handleStartItemAdd,
    handleAddItem,
    handleDeleteItem,
    handleDeleteSection,
  } = useEstimateScreen();

  const renderEditForm = (): JSX.Element => {
    if (!editMode && !addMode) {
      return (
        <View style={[styles.noSelection, { backgroundColor: colors.layer.solid.light }]}>
          <Text style={[fonts.regular.text.md, { color: colors.text.primary }]}>
            Select an item or section to edit
          </Text>
        </View>
      );
    }

    if (addMode) {
      return <AddForm mode={addMode.type} onClose={handleStopEdit} onSave={handleAddItem} />;
    }

    return (
      <>
        {editMode && (
          <EditForm
            key={editMode?.data.id}
            mode={editMode.type}
            data={editMode.data}
            onSave={editMode.type === 'item' ? handleSaveItem : handleSaveSection}
            onDelete={editMode.type === 'item' ? handleDeleteItem : handleDeleteSection}
            onClose={handleStopEdit}
          />
        )}
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
      {/* Header */}
      <View style={styles.header}>
        <TextField
          style={[fonts.bold.headline.sm, styles.titleInput, { color: colors.text.primary }]}
          value={estimate.title}
          onChangeText={updateTitle}
          placeholder="Enter estimate title"
        />
        <AnimatedThemeSwitch />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Left side - Table */}
        <View style={styles.tableContainer}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {estimate.sections.map((section, index) => (
              <View key={section.id} style={styles.section}>
                <View
                  style={[
                    styles.sectionHeader,
                    {
                      backgroundColor: colors.layer.solid.medium,
                      borderColor: colors.outline.medium,
                    },
                    index === 0 && {
                      borderTopLeftRadius: numbers.borderRadius.lg,
                      borderTopRightRadius: numbers.borderRadius.lg,
                    },
                    editMode?.type === 'group' &&
                      editMode.data.id === section.id && {
                        backgroundColor: colors.layer.solid.dark,
                      },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: numbers.spacing['2xs'],
                    }}
                  >
                    <Pressable onPress={() => handleStartSectionEdit(section)}>
                      <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
                        {section.title}
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => handleStartItemAdd(section.id)}>
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

                {/* Table rows */}
                {section.rows.map((row) => (
                  <Pressable
                    key={row.id}
                    style={[
                      styles.tableRow,
                      {
                        backgroundColor: colors.layer.solid.light,
                        borderColor: colors.outline.medium,
                      },
                      editMode?.type === 'item' &&
                        editMode.data.id === row.id &&
                        styles.selectedRow,
                    ]}
                    onPress={() => handleStartItemEdit(row)}
                  >
                    <View style={styles.rowLeftContent}>
                      <Text
                        style={[
                          styles.rowTitle,
                          fonts.regular.text.md,
                          { color: colors.text.primary },
                        ]}
                      >
                        {row.title}
                      </Text>
                      <View style={styles.rowDetails}>
                        <Text style={[fonts.regular.text.sm, { color: colors.text.secondary }]}>
                          ${row.price.toFixed(2)} × {row.quantity} {row.uom}
                        </Text>
                      </View>
                    </View>
                    <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
                      ${(row.price * row.quantity).toFixed(2)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </ScrollView>

          <View
            style={[
              styles.estimateTotal,
              { backgroundColor: colors.layer.solid.dark, borderColor: colors.outline.medium },
            ]}
          >
            <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>Total:</Text>
            <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
              ${calculateEstimateTotal(estimate).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Right side - Edit form */}
        <View style={styles.formContainer}>{renderEditForm()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: numbersAliasTokens.spacing.sm,
  },
  titleInput: {
    flex: 1,
    padding: numbersAliasTokens.spacing.xs,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  tableContainer: {
    flex: 2,
    padding: numbersAliasTokens.spacing.sm,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: numbersAliasTokens.spacing.sm,
  },
  section: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: numbersAliasTokens.spacing.sm,
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: numbersAliasTokens.spacing.xs,
    borderWidth: 1,
    cursor: 'pointer',
  },
  selectedRow: {
    backgroundColor: '#f0f7ff',
  },
  rowLeftContent: {
    flex: 1,
    marginRight: numbersAliasTokens.spacing.sm,
  },
  rowTitle: {
    marginBottom: numbersAliasTokens.spacing['3xs'],
  },
  rowDetails: {
    opacity: 0.7,
  },
  estimateTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: numbersAliasTokens.spacing.sm,
    borderBottomLeftRadius: numbersAliasTokens.borderRadius.sm,
    borderBottomRightRadius: numbersAliasTokens.borderRadius.sm,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noSelection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
