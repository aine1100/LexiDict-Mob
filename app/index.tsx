import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '@/src/constants/theme';
import { useOnboarding } from '@/src/hooks/useOnboarding';

export default function Index() {
  const { ready, hasOnboarded } = useOnboarding();

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.orange} size="large" />
      </View>
    );
  }

  return hasOnboarded ? <Redirect href="/(drawer)/(tabs)/" /> : <Redirect href="/onboarding" />;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.yellow },
});
