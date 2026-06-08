import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { WORD_CATEGORIES, type WordCategory } from '@/src/constants/categories';
import { colors, shadows, typography } from '@/src/constants/theme';

interface CategoryScrollProps {
  selectedCategoryId?: string;
  onSelectCategory: (category: WordCategory) => void;
}

export function CategoryScroll({ selectedCategoryId, onSelectCategory }: CategoryScrollProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore category</Text>
        <Text style={styles.link}>Filter words</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}>
        {WORD_CATEGORIES.map((item) => {
          const selected = selectedCategoryId === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectCategory(item)}
              style={({ pressed }) => [styles.chip, pressed && styles.pressed]}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: item.tint },
                  selected && styles.iconWrapSelected,
                ]}>
                <Ionicons
                  name={item.icon}
                  size={26}
                  color={selected ? colors.white : colors.text}
                />
              </View>
              <Text style={[styles.label, selected && styles.labelSelected]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 16,
    paddingLeft: 16,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingRight: 16,
  },
  title: { ...typography.sectionTitle, color: colors.text, fontSize: 17 },
  link: { ...typography.caption, color: colors.orange },
  row: { gap: 14, paddingRight: 16 },
  chip: { width: 78, alignItems: 'center', gap: 8 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.orangeSoft,
  },
  iconWrapSelected: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  label: { ...typography.caption, color: colors.textSecondary, textAlign: 'center', fontSize: 12 },
  labelSelected: { ...typography.bodySemiBold, color: colors.orange, fontSize: 12 },
});
