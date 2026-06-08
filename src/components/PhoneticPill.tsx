import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, typography } from '@/src/constants/theme';

interface PhoneticPillProps {
  phonetic: string;
  onPlay?: () => void;
  variant?: 'onRed' | 'onCard';
  showSpeaker?: boolean;
}

export function PhoneticPill({
  phonetic,
  onPlay,
  variant = 'onCard',
  showSpeaker = true,
}: PhoneticPillProps) {
  const isOnRed = variant === 'onRed';

  return (
    <Pressable
      onPress={showSpeaker ? onPlay : undefined}
      disabled={!showSpeaker || !onPlay}
      style={[styles.pill, isOnRed ? styles.onRed : styles.onCard]}>
      {showSpeaker && onPlay ? (
        <Ionicons
          name="volume-medium"
          size={18}
          color={isOnRed ? colors.red : colors.orange}
          style={styles.icon}
        />
      ) : null}
      <Text style={[styles.text, isOnRed ? styles.textOnRed : styles.textOnCard]}>
        [ {phonetic} ]
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: layout.pillRadius,
  },
  onRed: { backgroundColor: colors.white },
  onCard: { backgroundColor: colors.iconBg },
  icon: { marginRight: 6 },
  text: { ...typography.phonetic },
  textOnRed: { color: colors.red },
  textOnCard: { color: colors.textMuted },
});
