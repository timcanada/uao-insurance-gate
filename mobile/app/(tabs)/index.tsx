import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SubscribeCard } from '@/src/components/SubscribeCard';
import {
  Chip,
  EmptyState,
  LoadingBlock,
  PostCard,
  Screen,
  SectionHeader,
  Wordmark,
} from '@/src/components/Ui';
import { fetchPosts } from '@/src/api/ghost';
import { FILTERS } from '@/src/lib/classify';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

export default function TodayScreen() {
  const router = useRouter();
  const [hero, setHero] = useState<ClassifiedPost | null>(null);
  const [desk, setDesk] = useState<ClassifiedPost[]>([]);
  const [charts, setCharts] = useState<ClassifiedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const [briefs, pd, chartFeed] = await Promise.all([
        fetchPosts({ filter: FILTERS.dailyBrief, limit: 4 }),
        fetchPosts({ filter: FILTERS.probabilityDesk, limit: 3 }),
        fetchPosts({ filter: FILTERS.charts, limit: 3 }),
      ]);
      setHero(briefs.posts[0] ?? null);
      setDesk(pd.posts);
      setCharts(chartFeed.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach the UAO desk.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={colors.gold}
            onRefresh={() => {
              setRefreshing(true);
              load();
            }}
          />
        }>
        <View style={styles.top}>
          <Wordmark />
          <Pressable onPress={() => router.push('/search')} style={styles.search}>
            <Text style={styles.searchLabel}>Search briefs, scenarios, research…</Text>
          </Pressable>
        </View>

        <Text style={styles.lede}>
          For investors who own the whole market, the largest risks cannot be diversified away.
        </Text>

        <View style={styles.formats}>
          <Chip label="Read" onPress={() => router.push('/(tabs)/brief')} />
          <Chip label="Watch" onPress={() => router.push('/watch')} />
          <Chip label="Listen" onPress={() => router.push('/listen')} />
          <Chip label="Chart" onPress={() => router.push('/charts')} />
        </View>

        {loading ? <LoadingBlock /> : null}
        {error && !hero ? (
          <EmptyState title="The desk is unreachable" body={error} onRetry={load} />
        ) : null}

        {hero ? (
          <>
            <SectionHeader
              kicker="Today’s intelligence"
              title="The Universal Owner"
              actionLabel="All briefs →"
              href="/(tabs)/brief"
            />
            <PostCard post={hero} hero />
          </>
        ) : null}

        {desk.length ? (
          <>
            <SectionHeader
              kicker="Afternoon scenario desk"
              title="The Probability Desk"
              actionLabel="All scenarios →"
              href="/(tabs)/desk"
            />
            {desk.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        ) : null}

        {charts.length ? (
          <>
            <SectionHeader
              kicker="Chart of the day"
              title="One visual signal"
              actionLabel="All charts →"
              href="/charts"
            />
            {charts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        ) : null}

        <SubscribeCard />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48, gap: 14 },
  top: { gap: 14 },
  search: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.navy2,
  },
  searchLabel: { color: colors.muted, fontSize: 14 },
  lede: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 30,
  },
  formats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
