import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/constants/theme';

interface ScreenCanvasProps {
  children: ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  withBottomInset?: boolean;
}

export function ScreenCanvas({
  children,
  backgroundColor = colors.background,
  style,
  edges = ['top', 'left', 'right', 'bottom'],
  withBottomInset = false,
}: ScreenCanvasProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={edges}>
      <View
        style={[
          styles.inner,
          withBottomInset && { paddingBottom: Math.max(insets.bottom, spacing.sm) },
          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  inner: { flex: 1 },
});
