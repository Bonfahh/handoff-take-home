import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../common/components/Text';
import { Button } from '../common/components/Button';
import { EstimateRow, EstimateSection, UnitOfMeasure } from '@/data';
import { useState } from 'react';
import { useThemeTokens } from '../common/theme/useThemeTokens';
import { Feather } from '@expo/vector-icons';
import { FloatingLabelInput } from '../common/components/FloatingLabelInput';
import { numbersAliasTokens } from '../common/theme/tokens/alias/numbers';

type EditFormProps = {
  mode: 'item' | 'group';
  data: EstimateRow | EstimateSection | null;
  onSave: (updates: any) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
};

function isEstimateRow(data: any): data is EstimateRow {
  return 'price' in data && 'quantity' in data && 'uom' in data;
}

export function EditForm({ mode, data, onSave, onClose, onDelete }: EditFormProps): JSX.Element {
  const { fonts, colors, numbers, components } = useThemeTokens();

  const [title, setTitle] = useState(data?.title || '');
  const [price, setPrice] = useState(isEstimateRow(data) ? data.price.toString() : '0');
  const [quantity, setQuantity] = useState(isEstimateRow(data) ? data.quantity.toString() : '0');
  const [uom, setUom] = useState<UnitOfMeasure>(isEstimateRow(data) ? data.uom : 'EA');

  const handleSave = (): void => {
    if (mode === 'item') {
      onSave({
        ...data,
        title,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        uom,
      });
    } else {
      onSave({ title });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: numbers.spacing.lg,
        }}
      >
        <Pressable
          style={[
            styles.iconWrapper,
            { backgroundColor: components.button.background.secondary.idle },
          ]}
          onPress={onClose}
          accessibilityLabel="Cancel"
        >
          <Feather name="x" size={24} color={colors.icon.primary} />
        </Pressable>
        <Text style={[fonts.bold.text.md, { color: colors.text.primary }]}>
          {mode === 'item' ? 'Edit item' : 'Edit group'}
        </Text>
        <Pressable
          style={[styles.iconWrapper, { backgroundColor: colors.layer.solid.light }]}
          onPress={() => onDelete(data?.id || '')}
          accessibilityLabel="Delete"
        >
          <Feather name="trash-2" size={24} color={colors.icon.primary} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <FloatingLabelInput
          label={`${mode === 'item' ? 'Item' : 'Group'} title`}
          value={title}
          onChangeText={setTitle}
          placeholder={`Enter ${mode} title`}
        />
      </View>

      {mode === 'item' && (
        <>
          <View
            style={{
              flexDirection: 'row',
              gap: numbers.spacing.md,
              alignItems: 'stretch',
              justifyContent: 'space-between',
            }}
          >
            <View style={[styles.field, { flex: 1 }]}>
              <FloatingLabelInput
                label={`Cost`}
                prefix={
                  <Feather
                    name="dollar-sign"
                    size={24}
                    style={{ marginRight: numbers.spacing['3xs'] }}
                    color={colors.icon.secondary}
                  />
                }
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholder="Enter price"
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <FloatingLabelInput
                label={`Unit`}
                value={uom}
                onChangeText={(text) => setUom(text as UnitOfMeasure)}
                type="select"
                placeholder="Enter unit"
              />
            </View>
          </View>
          <View style={styles.field}>
            <FloatingLabelInput
              label={`Quantity`}
              value={quantity}
              type="quantity"
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
              placeholder="Enter quantity"
            />
          </View>
        </>
      )}

      <View style={styles.formActions}>
        <Button onPress={handleSave} style={styles.button}>
          Save changes
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: numbersAliasTokens.spacing.sm,
  },
  header: {
    marginBottom: numbersAliasTokens.spacing.sm,
  },
  field: {
    marginBottom: numbersAliasTokens.spacing.sm,
    width: '100%',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: numbersAliasTokens.spacing['2xs'],
    marginTop: numbersAliasTokens.spacing.lg,
  },
  button: {
    minWidth: 100,
  },
  iconWrapper: {
    width: numbersAliasTokens.sizing.icon.lg * 2,
    height: numbersAliasTokens.sizing.icon.lg * 2,
    borderRadius: numbersAliasTokens.borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
