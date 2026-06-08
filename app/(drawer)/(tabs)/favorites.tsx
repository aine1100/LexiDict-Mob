import { TabScreenLayout } from '@/src/components/TabScreenLayout';
import { WordListPanel } from '@/src/components/WordListPanel';
import { useDictionary } from '@/src/context/DictionaryContext';

export default function FavoritesScreen() {
  const { favorites, removeFavorite, clearFavorites } = useDictionary();

  return (
    <TabScreenLayout
      title="Favorites"
      subtitle={
        favorites.length === 0
          ? 'Words you save will appear here'
          : `${favorites.length} saved word${favorites.length === 1 ? '' : 's'}`
      }>
      <WordListPanel
        words={favorites}
        emptyTitle="No favorites yet"
        emptyMessage="Tap the heart on a word page to save words you want to revisit."
        clearAllLabel="Clear all favorites"
        onRemoveWord={removeFavorite}
        onClearAll={clearFavorites}
      />
    </TabScreenLayout>
  );
}
