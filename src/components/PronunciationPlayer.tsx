import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { AudioPlaybackModal } from '@/src/components/AudioPlaybackModal';
import { FormHint } from '@/src/components/FormHint';
import { useAudioPlayer } from '@/src/hooks/useAudioPlayer';
import { colors, layout, typography } from '@/src/constants/theme';
import type { AudioOption } from '@/src/types/audio';

interface PronunciationPlayerProps {
  word?: string;
  audioOptions: AudioOption[];
  phonetic?: string;
  variant?: 'onRed' | 'onCard';
}

export function PronunciationPlayer({
  word,
  audioOptions,
  phonetic,
  variant = 'onCard',
}: PronunciationPlayerProps) {
  const player = useAudioPlayer();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const hasAudio = audioOptions.length > 0;
  const isOnRed = variant === 'onRed';

  useEffect(() => {
    setActiveIndex(0);
  }, [audioOptions]);

  const activeOption = audioOptions[activeIndex] ?? audioOptions[0];
  const isPlaying = activeOption ? player.isPlayingUrl(activeOption.url) : false;
  const isPaused = activeOption ? player.isPausedUrl(activeOption.url) : false;
  const isLoading = activeOption ? player.isLoadingUrl(activeOption.url) : false;

  const runAudioAction = useCallback(async (action: () => void | Promise<void>) => {
    try {
      setAudioError(null);
      await action();
    } catch {
      setAudioError('Could not play pronunciation. Try another accent or check your connection.');
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const selectIndex = useCallback(
    async (index: number) => {
      if (index < 0 || index >= audioOptions.length || index === activeIndex) return;
      if (player.activeUrl) {
        await player.stop();
      }
      setActiveIndex(index);
      setAudioError(null);
    },
    [activeIndex, audioOptions.length, player],
  );

  const handleListenPress = async () => {
    if (!activeOption) return;
    setModalVisible(true);
    if (isPlaying) {
      await runAudioAction(() => player.pause());
      return;
    }
    if (isPaused && player.isActiveUrl(activeOption.url)) {
      await runAudioAction(() => player.resume());
      return;
    }
    await runAudioAction(() => player.play(activeOption.url));
  };

  const handlePlayPause = async () => {
    if (!activeOption) return;
    await runAudioAction(() => player.toggle(activeOption.url));
  };

  if (!phonetic && !hasAudio) return null;

  const listenLabel = isLoading ? 'Loading…' : isPlaying ? 'Playing' : 'Listen';
  const accentColor = isOnRed ? colors.red : colors.orange;
  const pillBg = isOnRed ? colors.white : colors.iconBg;
  const phoneticColor = isOnRed ? colors.red : colors.textMuted;

  return (
    <View style={styles.wrap}>
      <View style={[styles.pill, { backgroundColor: pillBg }]}>
        {phonetic ? (
          <Text style={[styles.phonetic, { color: phoneticColor }]}>[ {phonetic} ]</Text>
        ) : null}

        {hasAudio ? (
          <Pressable
            onPress={handleListenPress}
            style={({ pressed }) => [
              styles.listenBtn,
              isPlaying && styles.listenBtnActive,
              pressed && styles.listenPressed,
            ]}
            accessibilityLabel="Open pronunciation player">
            {isLoading ? (
              <ActivityIndicator size="small" color={isPlaying ? colors.white : accentColor} />
            ) : (
              <Ionicons
                name={isPlaying ? 'radio' : 'volume-high'}
                size={18}
                color={isPlaying ? colors.white : accentColor}
              />
            )}
            <Text style={[styles.listenText, isPlaying && styles.listenTextActive]}>{listenLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      <AudioPlaybackModal
        visible={modalVisible}
        word={word}
        phonetic={phonetic}
        audioOptions={audioOptions}
        activeIndex={activeIndex}
        player={player}
        onClose={closeModal}
        onSelectAccent={(index) => void selectIndex(index)}
        onPlayPause={handlePlayPause}
        onSkipBack={() => runAudioAction(() => player.skipBackward())}
        onSkipForward={() => runAudioAction(() => player.skipForward())}
        onReplay={() => activeOption && runAudioAction(() => player.replay(activeOption.url))}
      />

      {audioError ? (
        <FormHint message={audioError} variant="error" onDismiss={() => setAudioError(null)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: layout.pillRadius,
  },
  phonetic: { ...typography.phonetic },
  listenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: layout.pillRadius,
    backgroundColor: colors.orangeHighlight,
    borderWidth: 1,
    borderColor: colors.orangeSoft,
  },
  listenBtnActive: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  listenPressed: { opacity: 0.9 },
  listenText: { ...typography.bodySemiBold, fontSize: 13, color: colors.orange },
  listenTextActive: { color: colors.white },
});
