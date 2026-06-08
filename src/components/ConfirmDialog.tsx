import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, typography } from '@/src/constants/theme';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.pressed]}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.button,
                destructive ? styles.destructiveButton : styles.confirmButton,
                pressed && styles.pressed,
              ]}>
              <Text style={destructive ? styles.destructiveText : styles.confirmText}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.screenPadding,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.white,
   
    padding: layout.screenPadding,
  },
  title: { ...typography.sectionTitle, color: colors.text, marginBottom: 8 },
  message: { ...typography.body, color: colors.textMuted, marginBottom: 20, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: 10 },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: layout.pillRadius,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.iconBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmButton: { backgroundColor: colors.orange },
  destructiveButton: { backgroundColor: colors.error },
  cancelText: { ...typography.bodySemiBold, color: colors.text },
  confirmText: { ...typography.bodySemiBold, color: colors.white },
  destructiveText: { ...typography.bodySemiBold, color: colors.white },
  pressed: { opacity: 0.9 },
});
