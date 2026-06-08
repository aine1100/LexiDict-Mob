import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PronunciationPlayer } from '@/src/components/PronunciationPlayer';
import { illustrations } from '@/src/constants/illustrations';
import { colors, layout, shadows, typography } from '@/src/constants/theme';
import type { AudioOption } from '@/src/types/audio';

interface WordOfDayCardProps {
  word: string;
  phonetic?: string;
  audioOptions?: AudioOption[];
  snippet?: string;
  onPress: () => void;
}

export function WordOfDayCard({
  word,
  phonetic,
  audioOptions = [],
  snippet,
  onPress,
}: WordOfDayCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.content}>
        <Text style={styles.label}>Word of the day</Text>
        <Text style={styles.word}>{word}</Text>
        {phonetic || audioOptions.length > 0 ? (
          <Pressable onPress={() => undefined}>
            <PronunciationPlayer
              word={word}
              phonetic={phonetic}
              audioOptions={audioOptions}
              variant="onCard"
            />
          </Pressable>
        ) : null}
        {snippet ? <Text style={styles.snippet} numberOfLines={2}>{snippet}</Text> : null}
      </View>
      <Image source={illustrations.cuteBook} style={styles.mascot} contentFit="contain" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: layout.cardRadius,
    borderWidth: 2,
    borderColor: colors.orangeSoft,
    padding: layout.screenPadding,
    minHeight: 150,
    ...shadows.card,
  },
  pressed: { opacity: 0.95, transform: [{ scale: 0.99 }] },
  content: { flex: 1, paddingRight: 8 },
  label: { ...typography.caption, color: colors.orange, marginBottom: 6 },
  word: { ...typography.screenTitle, color: colors.text, marginBottom: 8 },
  snippet: { ...typography.caption, color: colors.textMuted, marginTop: 10 },
  mascot: { width: 96, height: 96, alignSelf: 'center' },
});
