import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/src/constants/theme';

interface ContentSheetProps {
  children: ReactNode;
  centerContent?: boolean;
}

export function ContentSheet({ children, centerContent = false }: ContentSheetProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = 100 + Math.max(insets.bottom, spacing.md);

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPad },
          centerContent && styles.scrollContentCentered,
        ]}
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
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: layout.screenPadding,
  },
  scrollContentCentered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
