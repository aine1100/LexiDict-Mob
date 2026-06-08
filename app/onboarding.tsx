import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { illustrations } from '@/src/constants/illustrations';
import { colors, layout, spacing, typography } from '@/src/constants/theme';
import { useOnboarding } from '@/src/hooks/useOnboarding';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useOnboarding();

  const finishOnboarding = async () => {
    await completeOnboarding();
    router.replace('/(drawer)/(tabs)/');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <Pressable onPress={finishOnboarding} style={styles.skip}>
        <Text style={styles.skipText}>skip</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>Learning english easy with</Text>
        <Text style={styles.title}>Pocket dictionary</Text>
        <Text style={styles.subtitle}>Unlimited number of words.</Text>

        <View style={styles.illustrationWrap}>
          <Image
            source={illustrations.personReading}
            style={styles.illustration}
            resizeMode="contain"
            blendMode="multiply"
          />
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <View style={styles.redCurve} />
        <Pressable
          onPress={finishOnboarding}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
          <Text style={styles.ctaText}>Let&apos;s Start</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.yellow },
  skip: {
    alignSelf: 'flex-end',
    marginRight: layout.screenPadding,
    marginTop: spacing.sm,
    zIndex: 2,
  },
  skipText: { ...typography.caption, color: colors.textMuted },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
  },
  eyebrow: { ...typography.body, color: colors.textSecondary, marginBottom: 8 },
  title: { ...typography.wordDisplay, color: colors.black, marginBottom: 8 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
  illustrationWrap: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 24,
  },
  illustration: {
    width: '100%',
    height: '100%',
    maxHeight: 300,
    backgroundColor: colors.yellow,
  },
  footer: {
    height: 190,
    justifyContent: 'flex-end',
  },
  redCurve: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.red,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  cta: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginBottom: spacing.sm,
    minWidth: 160,
    alignItems: 'center',
    zIndex: 1,
  },
  ctaPressed: { opacity: 0.9 },
  ctaText: { ...typography.bodySemiBold, color: colors.white },
});
