import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { AlphabetGrid } from '@/src/components/AlphabetGrid';
import { TabScreenLayout } from '@/src/components/TabScreenLayout';
import { layout, spacing } from '@/src/constants/theme';

export default function AlphabetTabScreen() {
  const handleLetter = (letter: string) => {
    router.push({ pathname: '/alphabet-words', params: { letter } });
  };

  return (
    <TabScreenLayout title="Learn by alphabet" subtitle="Pick a letter to browse words">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <AlphabetGrid onSelectLetter={handleLetter} />
      </ScrollView>
    </TabScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
