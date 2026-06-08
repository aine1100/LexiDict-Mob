import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/src/components/AppHeader';
import { colors, layout } from '@/src/constants/theme';

interface TabScreenLayoutProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  children: ReactNode;
}

export function TabScreenLayout({
  title,
  subtitle,
  leftAction,
  rightAction,
  children,
}: TabScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <AppHeader title={title} subtitle={subtitle} leftAction={leftAction} rightAction={rightAction} />
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: {
    flex: 1,
    paddingBottom: layout.tabContentBottomInset,
  },
});
