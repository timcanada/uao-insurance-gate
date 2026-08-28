import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { searchPosts } from '@/src/api/ghost';
import { EmptyState, PostCard, Screen } from '@/src/components/Ui';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<ClassifiedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(next: string) {
    setQuery(next);
    if (next.trim().length < 2) {
      setPosts([]);
      setError(null);
      return;
    }
    setLoading(true);
    try {
      setPosts(await searchPosts(next));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={styles.head}>
            <Text style={styles.title}>Search the live library</Text>
            <TextInput
              autoFocus
              value={query}
              onChangeText={run}
              placeholder="Hormuz, CPP, private credit…"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={colors.gold} style={{ marginTop: 24 }} />
          ) : (
            <EmptyState
              title={query.length < 2 ? 'Type to search' : 'No matching briefs'}
              body={error ?? 'Titles are searched against the same Ghost library as the website.'}
            />
          )
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 18, paddingBottom: 40 },
  head: { marginBottom: 16, gap: 10 },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 26, fontWeight: '700' },
  input: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    backgroundColor: colors.navy2,
  },
});
