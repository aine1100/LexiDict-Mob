import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, typography } from '@/src/constants/theme';

interface BottomActionBarProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
}

export function BottomActionBar({
  onPrevious,
  onNext,
  onToggleFavorite,
  isFavorite = false,
  canGoPrevious = false,
  canGoNext = false,
}: BottomActionBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <Pressable
        onPress={onPrevious}
        disabled={!canGoPrevious}
        style={[styles.circle, !canGoPrevious && styles.disabled]}>
        <Ionicons name="chevron-back" size={22} color={colors.white} />
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        style={({ pressed }) => [styles.favorite, isFavorite && styles.favoriteActive, pressed && styles.pressed]}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? colors.white : colors.black}
        />
        <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}>
          {isFavorite ? 'Favorited' : 'Add to favorites'}
        </Text>
      </Pressable>

      <Pressable
        onPress={onNext}
        disabled={!canGoNext}
        style={[styles.circle, !canGoNext && styles.disabled]}>
        <Ionicons name="chevron-forward" size={22} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.yellow,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 14,
    minHeight: layout.bottomBarHeight,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.35 },
  favorite: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 12,
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: layout.pillRadius,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  favoriteActive: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  favoriteText: {
    ...typography.bodySemiBold,
    color: colors.black,
    fontSize: 14,
  },
  favoriteTextActive: { color: colors.white },
  pressed: { opacity: 0.85 },
});
