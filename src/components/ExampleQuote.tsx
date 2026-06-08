import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/src/constants/theme';

interface ExampleQuoteProps {
  example: string;
  highlightWord?: string;
  variant?: 'hero' | 'card';
}

export function ExampleQuote({ example, highlightWord, variant = 'card' }: ExampleQuoteProps) {
  const parts = highlightWord
    ? splitByWord(example, highlightWord)
    : [{ text: example, highlight: false }];

  return (
    <View style={[styles.wrap, variant === 'hero' ? styles.hero : styles.card]}>
      <Text style={[styles.text, variant === 'hero' && styles.heroText]}>
        {parts.map((part, index) => (
          <Text
            key={`${part.text}-${index}`}
            style={
              part.highlight
                ? variant === 'hero'
                  ? styles.heroHighlight
                  : styles.highlight
                : undefined
            }>
            {part.text}
          </Text>
        ))}
      </Text>
    </View>
  );
}

function splitByWord(sentence: string, word: string) {
  const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
  return sentence.split(regex).map((text) => ({
    text,
    highlight: text.toLowerCase() === word.toLowerCase(),
  }));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const styles = StyleSheet.create({
  wrap: {
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    paddingLeft: 12,
    marginTop: 8,
  },
  card: {},
  hero: { borderLeftColor: colors.white, paddingLeft: 0, borderLeftWidth: 0 },
  text: { ...typography.body, color: colors.textMuted, fontStyle: 'italic' },
  heroText: { color: colors.white, fontStyle: 'normal' },
  highlight: { fontWeight: '700', color: colors.orange },
  heroHighlight: { fontWeight: '700', color: colors.yellow },
});
