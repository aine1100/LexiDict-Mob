import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { FormHint } from '@/src/components/FormHint';
import { useAudioPlayer } from '@/src/hooks/useAudioPlayer';
import { colors, layout, typography } from '@/src/constants/theme';
import type { AudioOption } from '@/src/types/audio';

interface PronunciationPlayerProps {
  audioOptions: AudioOption[];
  phonetic?: string;
  variant?: 'onRed' | 'onCard';
}

export function PronunciationPlayer({
  audioOptions,
  phonetic,
  variant = 'onCard',
}: PronunciationPlayerProps) {
  const player = useAudioPlayer();
  const [activeIndex, setActiveIndex] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const hasAudio = audioOptions.length > 0;
  const isOnRed = variant === 'onRed';

  useEffect(() => {
    setActiveIndex(0);
  }, [audioOptions]);

  const activeOption = audioOptions[activeIndex] ?? audioOptions[0];
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < audioOptions.length - 1;
  const isActive = activeOption ? player.isActiveUrl(activeOption.url) : false;
  const isPlaying = activeOption ? player.isPlayingUrl(activeOption.url) : false;
  const isPaused = activeOption ? player.isPausedUrl(activeOption.url) : false;
  const isLoading = activeOption ? player.isLoadingUrl(activeOption.url) : false;
  const showTransport = hasAudio && isActive && (isPlaying || isPaused);

  const runAudioAction = useCallback(async (action: () => void | Promise<void>) => {
    try {
      setAudioError(null);
      await action();
    } catch {
      setAudioError('Could not play pronunciation. Try another accent or check your connection.');
    }
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

  const handlePlayPause = async () => {
    if (!activeOption) return;
    await runAudioAction(() => player.toggle(activeOption.url));
  };

  const handlePreviousAccent = () => {
    if (!canGoPrevious) return;
    void selectIndex(activeIndex - 1);
  };

  const handleNextAccent = () => {
    if (!canGoNext) return;
    void selectIndex(activeIndex + 1);
  };

  const mainIcon = isLoading ? null : isPlaying ? 'pause' : isPaused ? 'play' : 'volume-medium';

  if (!phonetic && !hasAudio) return null;

  return (
    <View style={styles.wrap}>
      <View style={[styles.mainPill, isOnRed ? styles.onRed : styles.onCard]}>
        {hasAudio ? (
          <View style={styles.controls}>
            {audioOptions.length > 1 ? (
              <Pressable
                onPress={handlePreviousAccent}
                disabled={!canGoPrevious}
                style={[styles.controlBtn, !canGoPrevious && styles.controlBtnDisabled]}
                accessibilityLabel="Previous pronunciation">
                <Ionicons
                  name="chevron-back"
                  size={18}
                  color={canGoPrevious ? colors.text : colors.textLight}
                />
              </Pressable>
            ) : null}

            {showTransport ? (
              <Pressable
                onPress={() => runAudioAction(() => player.skipBackward())}
                style={styles.controlBtn}
                accessibilityLabel="Rewind five seconds">
                <Ionicons name="play-back" size={18} color={colors.textSecondary} />
              </Pressable>
            ) : null}

            <Pressable
              onPress={handlePlayPause}
              style={styles.speakerBtn}
              accessibilityLabel="Play or pause pronunciation"
              accessibilityHint="Tap to play, pause, or resume from where you left off.">
              {isLoading ? (
                <ActivityIndicator size="small" color={isOnRed ? colors.red : colors.orange} />
              ) : (
                <Ionicons
                  name={mainIcon ?? 'volume-medium'}
                  size={22}
                  color={isOnRed ? colors.red : colors.orange}
                />
              )}
            </Pressable>

            {showTransport ? (
              <Pressable
                onPress={() => runAudioAction(() => player.skipForward())}
                style={styles.controlBtn}
                accessibilityLabel="Forward five seconds">
                <Ionicons name="play-forward" size={18} color={colors.textSecondary} />
              </Pressable>
            ) : null}

            {audioOptions.length > 1 ? (
              <Pressable
                onPress={handleNextAccent}
                disabled={!canGoNext}
                style={[styles.controlBtn, !canGoNext && styles.controlBtnDisabled]}
                accessibilityLabel="Next pronunciation">
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={canGoNext ? colors.text : colors.textLight}
                />
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {phonetic ? (
          <Text style={[styles.phonetic, isOnRed ? styles.textOnRed : styles.textOnCard]}>
            [ {phonetic} ]
          </Text>
        ) : null}

        {hasAudio && activeOption && audioOptions.length > 1 ? (
          <Text style={styles.accentLabel} numberOfLines={1}>
            {activeOption.label}
          </Text>
        ) : null}

        {hasAudio && isActive ? (
          <Pressable onPress={() => player.stop()} style={styles.stopBtn}>
            <Ionicons name="stop" size={16} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </View>

      {showTransport ? (
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${player.progressRatio * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {player.progressLabel} / {player.durationLabel}
          </Text>
        </View>
      ) : null}

      {audioError ? (
        <FormHint message={audioError} variant="error" onDismiss={() => setAudioError(null)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  mainPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    paddingRight: 10,
    paddingLeft: 6,
    paddingVertical: 8,
    borderRadius: layout.pillRadius,
    gap: 6,
    maxWidth: '100%',
  },
  onRed: { backgroundColor: colors.white },
  onCard: { backgroundColor: colors.iconBg },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  controlBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnDisabled: { opacity: 0.35 },
  speakerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonetic: { ...typography.phonetic, paddingRight: 4 },
  textOnRed: { color: colors.red },
  textOnCard: { color: colors.textMuted },
  accentLabel: { ...typography.caption, color: colors.textSecondary, maxWidth: 72 },
  stopBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border,
  },
  progressWrap: { gap: 4, paddingHorizontal: 4 },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.orange,
    borderRadius: 2,
  },
  progressText: { ...typography.caption, color: colors.textMuted, fontSize: 11 },
});
