import type { Ionicons } from '@expo/vector-icons';

export interface WordCategory {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  words: string[];
}

export const WORD_CATEGORIES: WordCategory[] = [
  {
    id: 'education',
    label: 'Education',
    icon: 'school-outline',
    tint: '#E0E7FF',
    words: ['learn', 'study', 'knowledge', 'teacher', 'school', 'wisdom'],
  },
  {
    id: 'science',
    label: 'Science',
    icon: 'flask-outline',
    tint: '#DCFCE7',
    words: ['atom', 'energy', 'gravity', 'biology', 'chemistry', 'physics'],
  },
  {
    id: 'art',
    label: 'Art',
    icon: 'color-palette-outline',
    tint: '#FEF3C7',
    words: ['create', 'design', 'paint', 'music', 'beauty', 'canvas'],
  },
  {
    id: 'nature',
    label: 'Nature',
    icon: 'leaf-outline',
    tint: '#FCE7F3',
    words: ['forest', 'ocean', 'mountain', 'river', 'animal', 'garden'],
  },
  {
    id: 'ideas',
    label: 'Ideas',
    icon: 'bulb-outline',
    tint: '#FFEDD5',
    words: ['idea', 'think', 'imagine', 'concept', 'logic', 'reason'],
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: 'airplane-outline',
    tint: '#E0F2FE',
    words: ['journey', 'explore', 'adventure', 'voyage', 'destination', 'wander'],
  },
];

export function getCategoryById(id: string): WordCategory | undefined {
  return WORD_CATEGORIES.find((category) => category.id === id);
}
