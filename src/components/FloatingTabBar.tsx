import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, shadows, typography } from '@/src/constants/theme';

type TabIconName = keyof typeof Ionicons.glyphMap;

const TAB_CONFIG: Record<string, { label: string; icon: TabIconName; iconFocused: TabIconName }> = {
  index: { label: 'Home', icon: 'home-outline', iconFocused: 'home' },
  alphabet: { label: 'Alphabet', icon: 'grid-outline', iconFocused: 'grid' },
  favorites: { label: 'Favorites', icon: 'heart-outline', iconFocused: 'heart' },
};

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, layout.floatingTabBarBottomGap) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name] ?? TAB_CONFIG.index;
          const { options } = descriptors[route.key];
          const label = options.title ?? config.label;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}>
              <View style={[styles.iconWrap, isFocused && styles.iconWrapFocused]}>
                <Ionicons
                  name={isFocused ? config.iconFocused : config.icon}
                  size={22}
                  color={isFocused ? colors.white : colors.textSecondary}
                />
              </View>
              <Text style={[styles.label, isFocused && styles.labelFocused]} numberOfLines={1}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: layout.screenPadding,
    pointerEvents: 'box-none',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 28,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: layout.floatingTabBarHeight,
    ...shadows.card,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  tabPressed: { opacity: 0.85 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: { backgroundColor: colors.orange },
  label: { ...typography.caption, fontSize: 11, color: colors.textMuted },
  labelFocused: { color: colors.orange, fontFamily: typography.bodySemiBold.fontFamily },
});
