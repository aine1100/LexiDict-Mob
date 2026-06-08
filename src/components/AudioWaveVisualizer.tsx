import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/src/constants/theme';

const BAR_COUNT = 7;
const BAR_DELAYS = [0, 80, 160, 240, 160, 80, 0];

interface AudioWaveVisualizerProps {
  isActive: boolean;
  color?: string;
}

function WaveBar({ isActive, delay, color }: { isActive: boolean; delay: number; color: string }) {
  const scale = useSharedValue(0.35);

  useEffect(() => {
    if (isActive) {
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 380, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.3, { duration: 380, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          false,
        ),
      );
      return;
    }
    scale.value = withTiming(0.3, { duration: 200 });
  }, [delay, isActive, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: scale.value }],
  }));

  return <Animated.View style={[styles.bar, { backgroundColor: color }, animatedStyle]} />;
}

export function AudioWaveVisualizer({
  isActive,
  color = colors.orange,
}: AudioWaveVisualizerProps) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
      return;
    }
    pulse.value = withTiming(1, { duration: 200 });
  }, [isActive, pulse]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: isActive ? 0.35 : 0.15,
  }));

  const ringInnerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.82 + (pulse.value - 1) * 2 }],
    opacity: isActive ? 0.55 : 0.2,
  }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.ring, ringStyle]} />
      <Animated.View style={[styles.ringInner, ringInnerStyle]} />
      <View style={styles.bars}>
        {Array.from({ length: BAR_COUNT }).map((_, index) => (
          <WaveBar key={index} isActive={isActive} delay={BAR_DELAYS[index]} color={color} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.orangeHighlight,
  },
  ringInner: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.orangeHighlight,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 56,
  },
  bar: {
    width: 6,
    height: 48,
    borderRadius: 3,
  },
});
