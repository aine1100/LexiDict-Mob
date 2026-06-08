import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IllustrationFrame } from '@/src/components/IllustrationFrame';
import { illustrations } from '@/src/constants/illustrations';
import { colors, layout, typography } from '@/src/constants/theme';

interface UnavailableWordNoticeProps {
  word: string;
  onDismiss: () => void;
  onTryAnother?: () => void;
}

export function UnavailableWordNotice({ word, onDismiss, onTryAnother }: UnavailableWordNoticeProps) {
  return (
    <View style={styles.wrap}>
      <IllustrationFrame source={illustrations.bookStack} size="sm" style={styles.illustration} />
      <View style={styles.header}>
        <Ionicons name="book-outline" size={20} color={colors.orange} />
        <Text style={styles.title}>No dictionary entry</Text>
        <Pressable onPress={onDismiss} hitSlop={8}>
          <Ionicons name="close" size={18} color={colors.textMuted} />
        </Pressable>
      </View>
      <Text style={styles.message}>
        “{word}” is in the word list but our dictionary does not have a definition for it yet. Try a
        similar spelling or pick another word.
      </Text>
      {onTryAnother ? (
        <Pressable onPress={onTryAnother} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <Text style={styles.buttonText}>Keep browsing</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
    borderRadius: layout.cardRadius,
    borderWidth: 2,
    borderColor: colors.black,
    padding: layout.screenPadding,
    marginBottom: 12,
    alignItems: 'center',
  },
  illustration: { alignSelf: 'stretch', marginBottom: 8 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    alignSelf: 'stretch',
  },
  title: { ...typography.bodySemiBold, color: colors.text, flex: 1 },
  message: { ...typography.body, color: colors.textMuted, lineHeight: 22, alignSelf: 'stretch' },
  button: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: layout.pillRadius,
    backgroundColor: colors.orangeHighlight,
    borderWidth: 1,
    borderColor: colors.orangeSoft,
  },
  pressed: { opacity: 0.9 },
  buttonText: { ...typography.caption, color: colors.orange },
});
