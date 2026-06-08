import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { FormHint } from '@/src/components/FormHint';
import { colors, layout, typography } from '@/src/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  showSubmit?: boolean;
  hint?: string | null;
  hintVariant?: 'info' | 'warning' | 'error';
  onDismissHint?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search a word…',
  autoFocus = false,
  showSubmit = true,
  hint,
  hintVariant = 'warning',
  onDismissHint,
}: SearchBarProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View
          style={[
            styles.inputWrap,
            !showSubmit && styles.inputWrapFull,
            hint ? styles.inputWrapHint : null,
          ]}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            style={styles.input}
            returnKeyType="search"
            onSubmitEditing={onSubmit}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={autoFocus}
          />
        </View>
        {showSubmit ? (
          <Pressable onPress={onSubmit} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Ionicons name="arrow-forward" size={22} color={colors.white} />
          </Pressable>
        ) : null}
      </View>
      {hint ? (
        <FormHint
          message={hint}
          variant={hintVariant}
          onDismiss={onDismissHint}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputWrapHint: { borderColor: colors.orangeSoft },
  inputWrapFull: { flex: 1 },
  searchIcon: { marginRight: 8 },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: 12,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
