import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ConfirmDialog } from '@/src/components/ConfirmDialog';
import { illustrations } from '@/src/constants/illustrations';
import { colors, layout, spacing, typography } from '@/src/constants/theme';

const PAGE_SIZE = 10;

type ConfirmState =
  | { kind: 'single'; word: string }
  | { kind: 'all' }
  | null;

interface WordListPanelProps {
  words: string[];
  emptyTitle: string;
  emptyMessage: string;
  clearAllLabel?: string;
  onRemoveWord: (word: string) => Promise<void>;
  onClearAll?: () => Promise<void>;
  onBeforeOpen?: () => void;
}

export function WordListPanel({
  words,
  emptyTitle,
  emptyMessage,
  clearAllLabel = 'Clear all',
  onRemoveWord,
  onClearAll,
  onBeforeOpen,
}: WordListPanelProps) {
  const [page, setPage] = useState(0);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const totalPages = Math.max(1, Math.ceil(words.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return words.slice(start, start + PAGE_SIZE);
  }, [page, words]);

  useEffect(() => {
    const lastPage = Math.max(0, totalPages - 1);
    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [page, totalPages]);

  const openWord = (word: string) => {
    onBeforeOpen?.();
    router.push({ pathname: '/word', params: { q: word } });
  };

  const handleConfirm = async () => {
    if (!confirm) return;

    if (confirm.kind === 'single') {
      await onRemoveWord(confirm.word);
    } else if (onClearAll) {
      await onClearAll();
      setPage(0);
    }

    setConfirm(null);
  };

  if (words.length === 0) {
    return (
      <View style={styles.empty}>
        <Image source={illustrations.bookStack} style={styles.emptyImage} contentFit="contain" />
        <Text style={styles.emptyTitle}>{emptyTitle}</Text>
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={pageItems}
        keyExtractor={(item) => item}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const position = page * PAGE_SIZE + index + 1;

          return (
            <View style={styles.row}>
              <Pressable
                onPress={() => openWord(item)}
                style={({ pressed }) => [styles.wordButton, pressed && styles.rowPressed]}
                accessibilityLabel={`Open ${item}`}>
                <View style={styles.indexBadge}>
                  <Text style={styles.indexText}>{position}</Text>
                </View>
                <Text style={styles.word} numberOfLines={1}>
                  {item}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
              </Pressable>
              <Pressable
                onPress={() => setConfirm({ kind: 'single', word: item })}
                style={({ pressed }) => [styles.deleteButton, pressed && styles.deletePressed]}
                accessibilityLabel={`Remove ${item}`}
                hitSlop={6}>
                <Ionicons name="trash-outline" size={18} color={colors.error} />
              </Pressable>
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        {totalPages > 1 ? (
          <View style={styles.pagination}>
            <Pressable
              onPress={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              style={[styles.pageButton, page === 0 && styles.pageButtonDisabled]}>
              <Ionicons name="chevron-back" size={16} color={page === 0 ? colors.textLight : colors.text} />
              <Text style={[styles.pageButtonText, page === 0 && styles.pageButtonTextDisabled]}>Previous</Text>
            </Pressable>
            <Text style={styles.pageIndicator}>
              {page + 1} / {totalPages}
            </Text>
            <Pressable
              onPress={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
              disabled={page >= totalPages - 1}
              style={[styles.pageButton, page >= totalPages - 1 && styles.pageButtonDisabled]}>
              <Text
                style={[
                  styles.pageButtonText,
                  page >= totalPages - 1 && styles.pageButtonTextDisabled,
                ]}>
                Next
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={page >= totalPages - 1 ? colors.textLight : colors.text}
              />
            </Pressable>
          </View>
        ) : null}

        {onClearAll ? (
          <Pressable onPress={() => setConfirm({ kind: 'all' })} style={styles.clearButton}>
            <Ionicons name="trash" size={14} color={colors.error} />
            <Text style={styles.clearText}>{clearAllLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      <ConfirmDialog
        visible={confirm !== null}
        title={confirm?.kind === 'all' ? 'Clear all items?' : 'Delete this word?'}
        message={
          confirm?.kind === 'all'
            ? 'This will remove every item from the list. You cannot undo this action.'
            : `Are you sure you want to delete “${confirm?.word ?? ''}”?`
        }
        confirmLabel={confirm?.kind === 'all' ? 'Clear all' : 'Delete'}
        cancelLabel="Cancel"
        destructive
        onCancel={() => setConfirm(null)}
        onConfirm={() => void handleConfirm()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: layout.screenPadding },
  list: { flex: 1 },
  listContent: { paddingTop: spacing.sm, paddingBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  wordButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowPressed: { backgroundColor: colors.backgroundSoft },
  indexBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.orangeHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: { ...typography.caption, color: colors.orange, fontSize: 11 },
  word: {
    ...typography.bodyMedium,
    color: colors.text,
    textTransform: 'capitalize',
    flex: 1,
  },
  deleteButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.2)',
  },
  deletePressed: { opacity: 0.85 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.iconBg,
  },
  pageButtonDisabled: { opacity: 0.45 },
  pageButtonText: { ...typography.caption, color: colors.text },
  pageButtonTextDisabled: { color: colors.textLight },
  pageIndicator: { ...typography.caption, color: colors.textMuted },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  clearText: { ...typography.caption, color: colors.error },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.screenPadding,
  },
  emptyImage: { width: 140, height: 100, marginBottom: spacing.md },
  emptyTitle: { ...typography.sectionTitle, color: colors.text, marginBottom: 8, textAlign: 'center' },
  emptyMessage: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
