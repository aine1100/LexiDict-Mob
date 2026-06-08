import { StyleSheet, Text, View } from 'react-native';

import { ExampleQuote } from '@/src/components/ExampleQuote';
import { GlassIconButton } from '@/src/components/GlassIconButton';
import { PronunciationPlayer } from '@/src/components/PronunciationPlayer';
import { colors, layout, spacing, typography } from '@/src/constants/theme';
import type { AudioOption } from '@/src/types/audio';

interface HeroHeaderProps {
  word: string;
  phonetic?: string;
  audioOptions?: AudioOption[];
  example?: string;
  onBack?: () => void;
  onSearch?: () => void;
}

export function HeroHeader({
  word,
  phonetic,
  audioOptions = [],
  example,
  onBack,
  onSearch,
}: HeroHeaderProps) {
  return (
    <View style={styles.hero}>
      <View style={styles.topRow}>
        {onBack ? (
          <GlassIconButton name="arrow-back" onPress={onBack} color={colors.white} variant="onDark" />
        ) : (
          <View style={styles.spacer} />
        )}
        <View style={styles.topRight}>
          {onSearch ? (
            <GlassIconButton name="search" onPress={onSearch} color={colors.white} variant="onDark" />
          ) : null}
        </View>
      </View>

      <Text style={styles.word}>{word.toLowerCase()}</Text>

      {phonetic || audioOptions.length > 0 ? (
        <PronunciationPlayer
          phonetic={phonetic}
          audioOptions={audioOptions}
          variant="onRed"
        />
      ) : null}

      {example ? (
        <View style={styles.exampleBlock}>
          <Text style={styles.exampleLabel}>Example</Text>
          <ExampleQuote example={example} highlightWord={word} variant="hero" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.red,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: layout.sheetOverlap + spacing.lg,
    minHeight: layout.heroMinHeight,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  topRight: { flexDirection: 'row', gap: 8 },
  spacer: { width: layout.iconButtonSize },
  word: { ...typography.wordDisplay, color: colors.white, marginBottom: spacing.sm },
  exampleBlock: { marginTop: spacing.md },
  exampleLabel: { ...typography.caption, color: colors.redMuted, marginBottom: 4 },
});
