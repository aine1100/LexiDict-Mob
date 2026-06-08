import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { colors, layout } from '@/src/constants/theme';

interface GlassIconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
  color?: string;
  size?: number;
  variant?: 'default' | 'onDark';
}

export function GlassIconButton({
  name,
  onPress,
  style,
  color = colors.text,
  size = 22,
  variant = 'default',
}: GlassIconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'onDark' ? styles.onDark : styles.default,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button">
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: layout.iconButtonSize,
    height: layout.iconButtonSize,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: { backgroundColor: colors.iconBg },
  onDark: { backgroundColor: colors.glassDark },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
});
