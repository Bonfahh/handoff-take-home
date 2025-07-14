import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useThemeTokens } from '../theme/useThemeTokens';
import { numbersAliasTokens } from '../theme/tokens/alias/numbers';
import { Feather } from '@expo/vector-icons';
import UnitModal from './UnitModal';

type FloatingLabelInputProps = TextInputProps & {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  prefix?: string | React.ReactNode;
  type?: 'select' | 'quantity' | 'common';
};

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type = 'common',
  prefix,
  value,
  onChangeText,
  ...props
}) => {
  const { colors, fonts, numbers } = useThemeTokens();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: colors.outline.medium,
            borderRadius: numbers.borderRadius.lg,
            backgroundColor: colors.layer.solid.light,
          },
        ]}
      >
        {label && (
          <View
            style={[
              styles.labelWrapper,
              {
                left: 16,
                top: -9,
                backgroundColor: colors.layer.solid.light,
                paddingHorizontal: 4,
              },
            ]}
          >
            <Text style={[fonts.regular.text.xxs, { color: colors.text.secondary }]}>{label}</Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: numbers.spacing.sm,
            paddingHorizontal: numbers.spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {prefix}
          {type === 'select' ? (
            <Pressable
              style={[styles.inputBox, { paddingVertical: numbers.spacing['3xs'] }]}
              onPress={() => setShowModal(true)}
            >
              <Text style={{ color: colors.text.primary, ...fonts.regular.text.md }}>{value}</Text>
              <Feather
                name="chevron-down"
                size={20}
                color={colors.icon.secondary}
                style={{ marginRight: 12 }}
              />
            </Pressable>
          ) : type === 'quantity' ? (
            <View style={[styles.inputBox, { paddingVertical: numbers.spacing['3xs'] }]}>
              <Pressable
                onPress={() => onChangeText(String(Math.max(0, Number(value) - 1)))}
                style={styles.qtyBtn}
              >
                <Feather name="minus" size={22} color={colors.icon.primary} />
              </Pressable>
              <Text style={{ fontSize: 22, color: colors.text.primary }}>{value}</Text>
              <Pressable
                onPress={() => onChangeText(String(Number(value) + 1))}
                style={styles.qtyBtn}
              >
                <Feather name="plus" size={22} color={colors.icon.primary} />
              </Pressable>
            </View>
          ) : (
            <TextInput
              style={[
                fonts.regular.text.md,
                {
                  color: colors.text.primary,
                  paddingBottom: Platform.OS === 'web' ? 0 : numbers.spacing['2xs'],
                  flex: 1,
                  outline: 'none',
                },
              ]}
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={colors.text.secondary}
              {...props}
            />
          )}
        </View>
      </View>
      <UnitModal showModal={showModal} setShowModal={setShowModal} setUom={onChangeText} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    marginBottom: numbersAliasTokens.spacing.md,
  },
  labelWrapper: {
    position: 'absolute',
    zIndex: 2,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyBtn: {
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
