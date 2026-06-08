export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused';

export interface AudioOption {
  id: string;
  label: string;
  url: string;
  text?: string;
}
