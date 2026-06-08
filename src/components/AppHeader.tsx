import { type ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { colors, layout, spacing, typography } from '@/src/constants/theme';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  style?: ViewStyle;
}

export function AppHeader({
  title = 'LexiDict',
  subtitle,
  leftAction,
  rightAction,
  style,
}: AppHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.topRow}>
        {leftAction ? <View style={styles.sideSlot}>{leftAction}</View> : <View style={styles.sideSpacer} />}
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {rightAction ? <View style={styles.sideSlot}>{rightAction}</View> : <View style={styles.sideSpacer} />}
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sideSlot: { width: layout.iconButtonSize },
  sideSpacer: { width: layout.iconButtonSize },
  center: { flex: 1, alignItems: 'center' },
  title: { ...typography.screenTitle, fontSize: 22, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.caption, color: colors.textMuted, marginTop: 6, textAlign: 'center' },
});
