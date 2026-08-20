import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PartnerPlate } from '@/src/components/PartnerPlate';
import { SubscribeCard } from '@/src/components/SubscribeCard';
import { ProbabilityMeters, TerminalHeader, Ticker } from '@/src/components/Terminal';
import {
  Chip,
  EmptyState,
  LoadingBlock,
  PostCard,
  Screen,
  SectionHeader,
} from '@/src/components/Ui';
import { fetchPosts, snapshotToday } from '@/src/api/ghost';
import { FILTERS } from '@/src/lib/classify';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

const initial = snapshotToday();

export default function TodayScreen() {
  const router = useRouter();
  const [hero, setHero] = useState<ClassifiedPost | null>(initial.hero);
  const [desk, setDesk] = useState<ClassifiedPost[]>(initial.desk);
  const [charts, setCharts] = useState<ClassifiedPost[]>(initial.charts);
  const [tape, setTape] = useState<ClassifiedPost[]>([]);
  const [loading, setLoading] = useState(!initial.hero);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const [briefs, pd, chartFeed, latest] = await Promise.all([
        fetchPosts({ filter: FILTERS.dailyBrief, limit: 4 }),
        fetchPosts({ filter: FILTERS.probabilityDesk, limit: 3 }),
        fetchPosts({ filter: FILTERS.charts, limit: 4 }),
        fetchPosts({ filter: FILTERS.latest, limit: 12 }),
      ]);
      setHero(briefs.posts[0] ?? null);
      setDesk(pd.posts);
      setCharts(chartFeed.posts);
      setTape(latest.posts);
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
          <TerminalHeader />
          <Ticker posts={tape} />
          <Pressable onPress={() => router.push('/search')} style={styles.search}>
            <Text style={styles.searchLabel}>Search the live library…</Text>
          </Pressable>
        </View>

        <Text style={styles.edition}>Today’s intelligence · New York</Text>
        <Text style={styles.lede}>
          For investors who own the whole market, the largest risks cannot be diversified away.
        </Text>
        <Text style={styles.sublede}>
          Two desks. Four formats. Reviewed subscribers only. The same book the website ships every
          weekday — built to be used on a phone.
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
            <ProbabilityMeters />
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

        <PartnerPlate onPress={() => router.push('/advertise')} />
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
  edition: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  lede: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 26,
    lineHeight: 32,
  },
  sublede: {
    color: colors.muted,
    fontFamily: fonts.serif,
    fontSize: 15,
    lineHeight: 22,
  },
  formats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
