import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { HistoryDrawerContent } from '@/src/components/HistoryDrawerContent';
import { colors } from '@/src/constants/theme';
import { useOnboarding } from '@/src/hooks/useOnboarding';

export default function DrawerLayout() {
  const { ready, hasOnboarded } = useOnboarding();

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.orange} size="large" />
      </View>
    );
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <HistoryDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 320, backgroundColor: colors.white },
        overlayColor: 'rgba(0,0,0,0.35)',
      }}>
      <Drawer.Screen name="(tabs)" options={{ title: 'Dictionary' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.yellow },
});
