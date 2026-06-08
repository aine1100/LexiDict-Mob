import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/src/constants/theme';

interface ContentSheetProps {
  children: ReactNode;
}

export function ContentSheet({ children }: ContentSheetProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = 100 + Math.max(insets.bottom, spacing.md);

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad }]}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    marginTop: -layout.sheetOverlap,
    backgroundColor: colors.white,
    borderTopLeftRadius: layout.sheetRadiusTop,
    borderTopRightRadius: layout.sheetRadiusTop,
    paddingTop: spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: layout.screenPadding,
  },
});
