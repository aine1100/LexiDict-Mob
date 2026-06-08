import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/src/constants/theme';

interface FormHintProps {
  message: string;
  variant?: 'info' | 'warning' | 'error';
  onDismiss?: () => void;
}

export function FormHint({ message, variant = 'warning', onDismiss }: FormHintProps) {
  const iconName =
    variant === 'error' ? 'alert-circle' : variant === 'info' ? 'information-circle' : 'bulb-outline';

  return (
    <View style={[styles.wrap, styles[variant]]}>
      <Ionicons name={iconName} size={18} color={styles[`${variant}Icon`].color} style={styles.icon} />
      <Text style={[styles.text, styles[`${variant}Text`]]}>{message}</Text>
      {onDismiss ? (
        <Pressable onPress={onDismiss} hitSlop={8} style={styles.dismiss}>
          <Ionicons name="close" size={16} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: { marginTop: 1 },
  text: { ...typography.body, flex: 1, fontSize: 14, lineHeight: 20 },
  dismiss: { padding: 2 },
  warning: {
    backgroundColor: colors.orangeHighlight,
    borderColor: colors.orangeSoft,
  },
  warningIcon: { color: colors.orange },
  warningText: { color: colors.text },
  error: {
    backgroundColor: 'rgba(229, 57, 53, 0.12)',
    borderColor: 'rgba(229, 57, 53, 0.35)',
  },
  errorIcon: { color: colors.error },
  errorText: { color: colors.text },
  info: {
    backgroundColor: colors.iconBg,
    borderColor: colors.border,
  },
  infoIcon: { color: colors.textSecondary },
  infoText: { color: colors.textSecondary },
});
