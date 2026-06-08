import { type DrawerContentComponentProps } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WordListPanel } from '@/src/components/WordListPanel';
import { colors, layout, spacing, typography } from '@/src/constants/theme';
import { useDictionary } from '@/src/context/DictionaryContext';

export function HistoryDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const { history, removeWord, clearHistory } = useDictionary();

  return (
    <View style={[styles.root, { paddingTop: Math.max(insets.top, spacing.lg) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent searches</Text>
        <Text style={styles.subtitle}>
          {history.length === 0
            ? 'Your lookups will appear here'
            : `${history.length} word${history.length === 1 ? '' : 's'} saved`}
        </Text>
      </View>

      <WordListPanel
        words={history}
        emptyTitle="No searches yet"
        emptyMessage="Look up your first word and it will show up here."
        clearAllLabel="Clear all history"
        onRemoveWord={removeWord}
        onClearAll={clearHistory}
        onBeforeOpen={() => props.navigation.closeDrawer()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: {
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.sm,
  },
  title: { ...typography.screenTitle, fontSize: 22, color: colors.text, marginBottom: 4 },
  subtitle: { ...typography.caption, color: colors.textMuted },
});
