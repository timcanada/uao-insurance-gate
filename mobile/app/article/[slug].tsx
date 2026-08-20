import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';

import { fetchPostBySlug } from '@/src/api/ghost';
import { ArticleHtml } from '@/src/components/ArticleHtml';
import { EmptyState, LoadingBlock, Screen } from '@/src/components/Ui';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { formatMeta } from '@/src/lib/format';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const bookmarks = useBookmarks();
  const [post, setPost] = useState<ClassifiedPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchPostBySlug(slug)
      .then((next) => {
        setPost(next);
        navigation.setOptions({ title: next.kicker });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to open this brief.'));
  }, [navigation, slug]);

  if (!post && !error) {
    return (
      <Screen>
        <LoadingBlock />
      </Screen>
    );
  }

  if (!post) {
    return (
      <Screen>
        <EmptyState title="Briefing unavailable" body={error ?? undefined} />
      </Screen>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.mast}>
        <Text style={styles.kicker}>{post.kicker}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.meta}>
          {(post.authors?.[0]?.name ?? 'UAO Editorial') +
            ' · ' +
            formatMeta(post.published_at, post.reading_time)}
        </Text>
        <View style={styles.actions}>
          <Pressable onPress={() => bookmarks.toggle(post)} style={styles.ghostBtn}>
            <Text style={styles.ghostLabel}>{bookmarks.isSaved(post.id) ? 'Saved' : 'Save'}</Text>
          </Pressable>
          <Pressable
            onPress={() => Share.share({ title: post.title, message: post.url })}
            style={styles.ghostBtn}>
            <Text style={styles.ghostLabel}>Share</Text>
          </Pressable>
          <Pressable onPress={() => WebBrowser.openBrowserAsync(post.url)} style={styles.ghostBtn}>
            <Text style={styles.ghostLabel}>Web</Text>
          </Pressable>
        </View>
      </View>
      {post.html ? (
        <ArticleHtml html={post.html} title={post.title} />
      ) : (
        <Text style={styles.fallback}>{post.summary}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.cream },
  mast: {
    backgroundColor: colors.navy,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 8,
  },
  kicker: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: fonts.serif,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  meta: { color: colors.muted, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  ghostBtn: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ghostLabel: { color: colors.gold2, fontSize: 13, fontWeight: '600' },
  fallback: {
    color: colors.ink,
    fontFamily: fonts.serif,
    fontSize: 17,
    lineHeight: 26,
    padding: 18,
  },
});
