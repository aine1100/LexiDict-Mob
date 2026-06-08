import { Image, StyleSheet, View, type ImageSourcePropType, type ViewStyle } from 'react-native';

import { spacing } from '@/src/constants/theme';

interface IllustrationFrameProps {
  source: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

const imageSizes = {
  sm: { width: 140, height: 112 },
  md: { width: 200, height: 160 },
  lg: { width: 260, height: 208 },
  xl: { width: 300, height: 240 },
} as const;

export function IllustrationFrame({ source, size = 'md', style }: IllustrationFrameProps) {
  const dimensions = imageSizes[size];

  return (
    <View style={[styles.frame, style]}>
      <Image source={source} style={dimensions} resizeMode="contain" accessibilityIgnoresInvertColors />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
});
