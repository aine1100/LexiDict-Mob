import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

let player = createAudioPlayer(null);

/** Simple one-shot playback helper */
export async function playPronunciation(url: string): Promise<void> {
  try {
    await setAudioModeAsync({ playsInSilentMode: true });
    player.replace(url);
    await player.seekTo(0);
    player.play();
  } catch {
    throw new Error('Could not play pronunciation.');
  }
}

export async function stopPronunciation(): Promise<void> {
  player.pause();
  await player.seekTo(0);
}
