import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '../theme/useThemeTokens';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingLabelInput } from './FloatingLabelInput';
import { numbersAliasTokens } from '../theme/tokens/alias/numbers';
import { UNIT_SECTIONS } from '@/data';

type UnitModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setUom: (uom: string) => void;
};

const UnitModal = ({ showModal, setShowModal, setUom }: UnitModalProps): JSX.Element => {
  const { colors, components, fonts, numbers } = useThemeTokens();

  const [unitSearch, setUnitSearch] = useState('');

  const filteredSections = UNIT_SECTIONS.map((section) => ({
    ...section,
    data: section.data.filter(
      (u) =>
        u.name.toLowerCase().includes(unitSearch.toLowerCase()) ||
        u.abbr.toLowerCase().includes(unitSearch.toLowerCase()),
    ),
  })).filter((section) => section.data.length > 0);

  return (
    <Modal visible={showModal} animationType="slide">
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.layer.solid.light }} edges={['top']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: numbers.spacing.sm,
          }}
        >
          <Pressable
            onPress={() => setShowModal(false)}
            style={[
              styles.iconWrapper,
              { backgroundColor: components.button.background.secondary.idle },
            ]}
          >
            <Feather name="arrow-left" size={24} color={colors.icon.primary} />
          </Pressable>
          <Text style={{ ...fonts.bold.text.md, color: colors.text.primary }}>
            Unit of measurement
          </Text>
          <View style={styles.iconWrapper} />
        </View>
        <View style={{ padding: numbers.spacing.sm }}>
          <FloatingLabelInput
            placeholder="Search"
            value={unitSearch}
            onChangeText={setUnitSearch}
            prefix={
              <Feather
                name="search"
                size={24}
                style={{ marginRight: numbers.spacing.sm }}
                color={colors.icon.secondary}
              />
            }
          />
        </View>
        <SectionList
          sections={filteredSections}
          keyExtractor={(item) => item.abbr}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ backgroundColor: colors.layer.solid.light }}>
              <Text
                style={{
                  padding: numbers.spacing.sm,
                  color: colors.text.tertiary,
                  ...fonts.bold.text.xs,
                }}
              >
                {title}
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Pressable
              style={{
                paddingVertical: numbers.spacing.sm,
                paddingHorizontal: numbers.spacing.md,
                borderBottomWidth: 1,
                borderColor: colors.outline.light,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                setUom(item.abbr);
                setShowModal(false);
                setUnitSearch('');
              }}
            >
              <Text style={{ ...fonts.regular.text.md, color: colors.text.primary }}>
                {item.name}
              </Text>
              <Text style={{ ...fonts.regular.text.md, color: colors.text.secondary }}>
                {item.abbr}
              </Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: numbersAliasTokens.spacing['4xl'],
    height: numbersAliasTokens.spacing['4xl'],
    borderRadius: numbersAliasTokens.borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UnitModal;
