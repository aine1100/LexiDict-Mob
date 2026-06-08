import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { illustrations } from '@/src/constants/illustrations';
import { colors, layout, typography } from '@/src/constants/theme';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  onSecondaryAction?: () => void;
  secondaryLabel?: string;
}

export function ErrorState({
  title,
  message,
  onRetry,
  retryLabel = 'Try again',
  onSecondaryAction,
  secondaryLabel = 'Go back',
}: ErrorStateProps) {
  return (
    <View style={styles.wrap}>
      <Image source={illustrations.bookStack} style={styles.image} contentFit="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        {onRetry ? (
          <Pressable onPress={onRetry} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>{retryLabel}</Text>
          </Pressable>
        ) : null}
        {onSecondaryAction ? (
          <Pressable
            onPress={onSecondaryAction}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.secondaryButtonText}>{secondaryLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 16 },
  image: { width: 160, height: 120, marginBottom: 16 },
  title: { ...typography.sectionTitle, color: colors.text, marginBottom: 8, textAlign: 'center' },
  message: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginBottom: 20 },
  actions: { gap: 10, alignItems: 'center' },
  button: {
    backgroundColor: colors.orange,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: layout.pillRadius,
  },
  pressed: { opacity: 0.9 },
  buttonText: { ...typography.bodySemiBold, color: colors.white },
  secondaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: layout.pillRadius,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  secondaryButtonText: { ...typography.bodySemiBold, color: colors.text },
});
