import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AudioWaveVisualizer } from '@/src/components/AudioWaveVisualizer';
import { colors, layout, shadows, spacing, typography } from '@/src/constants/theme';
import type { AudioOption } from '@/src/types/audio';
import { type useAudioPlayer } from '@/src/hooks/useAudioPlayer';

type AudioPlayerApi = ReturnType<typeof useAudioPlayer>;

interface AudioPlaybackModalProps {
  visible: boolean;
  word?: string;
  phonetic?: string;
  audioOptions: AudioOption[];
  activeIndex: number;
  player: AudioPlayerApi;
  onClose: () => void;
  onSelectAccent: (index: number) => void;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  onReplay: () => void;
}

export function AudioPlaybackModal({
  visible,
  word,
  phonetic,
  audioOptions,
  activeIndex,
  player,
  onClose,
  onSelectAccent,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onReplay,
}: AudioPlaybackModalProps) {
  const insets = useSafeAreaInsets();
  const activeOption = audioOptions[activeIndex] ?? audioOptions[0];
  const isPlaying = activeOption ? player.isPlayingUrl(activeOption.url) : false;
  const isPaused = activeOption ? player.isPausedUrl(activeOption.url) : false;
  const isLoading = activeOption ? player.isLoadingUrl(activeOption.url) : false;
  const isLive = isPlaying || isLoading;
  const statusLabel = isLoading
    ? 'Loading…'
    : isPlaying
      ? 'Playing pronunciation'
      : isPaused
        ? 'Paused'
        : 'Finished';

  const handleClose = async () => {
    if (isPlaying || isPaused) {
      await player.pause();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={handleClose}>
      <View style={[styles.backdrop, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.panel}>
          <Pressable onPress={handleClose} style={styles.closeBtn} hitSlop={12} accessibilityLabel="Close player">
            <Ionicons name="close" size={22} color={colors.textMuted} />
          </Pressable>

          <Text style={styles.status}>{statusLabel}</Text>

          {word ? <Text style={styles.word}>{word}</Text> : null}
          {phonetic ? <Text style={styles.phonetic}>[ {phonetic} ]</Text> : null}

          <AudioWaveVisualizer isActive={isLive} />

          <View style={styles.progressBlock}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${player.progressRatio * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {player.progressLabel} / {player.durationLabel}
            </Text>
          </View>

          <View style={styles.transport}>
            <Pressable
              onPress={onSkipBack}
              disabled={!activeOption}
              style={({ pressed }) => [styles.transportBtn, pressed && styles.pressed]}>
              <Ionicons name="play-back" size={22} color={colors.text} />
            </Pressable>

            <Pressable
              onPress={onPlayPause}
              style={({ pressed }) => [styles.playBtn, pressed && styles.pressed]}>
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color={colors.white} />
              )}
            </Pressable>

            <Pressable
              onPress={onSkipForward}
              disabled={!activeOption}
              style={({ pressed }) => [styles.transportBtn, pressed && styles.pressed]}>
              <Ionicons name="play-forward" size={22} color={colors.text} />
            </Pressable>
          </View>

          <Pressable onPress={onReplay} style={styles.replayBtn}>
            <Ionicons name="refresh" size={16} color={colors.orange} />
            <Text style={styles.replayText}>Replay</Text>
          </Pressable>

          {audioOptions.length > 1 ? (
            <View style={styles.accentRow}>
              {audioOptions.map((option, index) => {
                const selected = index === activeIndex;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => onSelectAccent(index)}
                    style={[styles.accentChip, selected && styles.accentChipActive]}>
                    <Text style={[styles.accentText, selected && styles.accentTextActive]}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.glassDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
  },
  panel: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.white,
    borderRadius: layout.cardRadius + 8,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg + 8,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    ...shadows.card,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  status: {
    ...typography.caption,
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  word: {
    ...typography.screenTitle,
    fontSize: 28,
    color: colors.text,
    textTransform: 'capitalize',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  phonetic: {
    ...typography.phonetic,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  progressBlock: { width: '100%', marginTop: spacing.sm, marginBottom: spacing.lg, gap: 6 },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.orange,
    borderRadius: 3,
  },
  progressText: { ...typography.caption, color: colors.textMuted, textAlign: 'center' },
  transport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginBottom: spacing.md,
  },
  transportBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.97 }] },
  replayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  replayText: { ...typography.caption, color: colors.orange },
  accentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  accentChip: {
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    borderRadius: layout.pillRadius,
    backgroundColor: colors.iconBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accentChipActive: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  accentText: { ...typography.caption, color: colors.textSecondary },
  accentTextActive: { color: colors.white },
});
