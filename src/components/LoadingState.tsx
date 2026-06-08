import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/src/constants/theme';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Looking up…' }: LoadingStateProps) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={colors.orange} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48, gap: 12 },
  text: { ...typography.body, color: colors.textMuted },
});
