import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { fetchThirtyYear } from '@/src/api/rates';
import { fetchPosts, snapshotToday } from '@/src/api/ghost';
import { fetchWire } from '@/src/api/wire';
import { IcPack, LiabilityTape, SleeveMap, WatchBook } from '@/src/components/CioDesk';
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
import { FILTERS } from '@/src/lib/classify';
import { assemblePack, isPublicDeskCopy, parseLastIc, type PackItem, type PackSeed } from '@/src/lib/ic';
import { BOOK_NAMES, nameHits } from '@/src/lib/names';
import { yieldFromCopy, type ThirtyYearPrint } from '@/src/lib/rates';
import { deskSession } from '@/src/lib/session';
import { lightSleeves } from '@/src/lib/sleeves';
import { normalizeWatch, toggleWatch } from '@/src/lib/watch';
import { parseDeskWeights, weightDelta, type DeskWeights } from '@/src/lib/weights';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

const initial = snapshotToday();

export default function TodayScreen() {
  const router = useRouter();
  const [hero, setHero] = useState<ClassifiedPost | null>(initial.hero);
  const [desk, setDesk] = useState<ClassifiedPost[]>(initial.desk);
  const [charts, setCharts] = useState<ClassifiedPost[]>(initial.charts);
  const [tape, setTape] = useState<ClassifiedPost[]>([]);
  const [pack, setPack] = useState<PackItem[]>([]);
  const [sleeves, setSleeves] = useState(lightSleeves([]));
  const [watch, setWatch] = useState<string[]>([]);
  const [hits, setHits] = useState<{ id: string; label: string; title: string; slug?: string; url?: string }[]>(
    [],
  );
  const [lastIc, setLastIc] = useState(parseLastIc(null));
  const [print, setPrint] = useState<ThirtyYearPrint | null>(null);
  const [loading, setLoading] = useState(!initial.hero);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weights, setWeights] = useState<DeskWeights | null>(null);
  const [delta, setDelta] = useState<DeskWeights | null>(null);

  async function load(nextWatch?: string[], nextIc?: string) {
    setError(null);
    try {
      const storedWatch = nextWatch ?? normalizeWatch(JSON.parse((await AsyncStorage.getItem('uao.watch')) || 'null'));
      const storedIc = nextIc ?? parseLastIc(await AsyncStorage.getItem('uao.lastIc'));
      setWatch(storedWatch);
      setLastIc(storedIc);
      const [briefs, pd, chartFeed, latest, people, research, wire, curve] = await Promise.all([
        fetchPosts({ filter: FILTERS.dailyBrief, limit: 8 }),
        fetchPosts({ filter: FILTERS.probabilityDesk, limit: 4, includeHtml: true }),
        fetchPosts({ filter: FILTERS.charts, limit: 4 }),
        fetchPosts({ filter: FILTERS.latest, limit: 24 }),
        fetchPosts({ filter: 'tag:people', limit: 8 }).catch(() => ({ posts: [] as ClassifiedPost[] })),
        fetchPosts({ filter: FILTERS.research, limit: 8 }).catch(() => ({ posts: [] as ClassifiedPost[] })),
        fetchWire().catch(() => []),
        fetchThirtyYear().catch(() => null),
      ]);
      const publicBriefs = briefs.posts.filter((post) => isPublicDeskCopy(post.title));
      const publicLatest = latest.posts.filter((post) => isPublicDeskCopy(post.title));
      setHero(publicBriefs[0] ?? briefs.posts[0] ?? null);
      setDesk(pd.posts);
      setCharts(chartFeed.posts);
      setTape(publicLatest);
      const nextWeights = pd.posts[0]?.html ? parseDeskWeights(pd.posts[0].html) : null;
      setWeights(nextWeights);
      if (nextWeights) {
        const raw = await AsyncStorage.getItem('uao.pdWeights');
        const prev = raw ? (JSON.parse(raw) as DeskWeights) : null;
        setDelta(weightDelta(prev, nextWeights));
        await AsyncStorage.setItem('uao.pdWeights', JSON.stringify(nextWeights));
      } else {
        setDelta(null);
      }
      const seeds: PackSeed[] = [
        ...publicBriefs.map((post) => ({
          id: post.id,
          title: post.title,
          publishedAt: post.published_at,
          slug: post.slug,
          source: 'The Universal Owner',
          kind: 'brief' as const,
        })),
        ...pd.posts.map((post) => ({
          id: post.id,
          title: post.title,
          publishedAt: post.published_at,
          slug: post.slug,
          source: 'The Probability Desk',
          kind: 'desk' as const,
        })),
        ...research.posts.map((post) => ({
          id: post.id,
          title: post.title,
          publishedAt: post.published_at,
          slug: post.slug,
          source: 'UAO Research',
          kind: 'research' as const,
        })),
        ...people.posts.map((post) => ({
          id: post.id,
          title: post.title,
          publishedAt: post.published_at,
          slug: post.slug,
          source: 'People',
          kind: 'people' as const,
        })),
        ...wire
          .filter((item) => item.desk === 'OFFICIAL')
          .map((item) => ({
            id: item.id,
            title: item.title,
            publishedAt: item.publishedAt,
            url: item.url,
            source: item.source,
            kind: 'official' as const,
          })),
      ];
      setPack(assemblePack(seeds, storedIc, 10));
      setSleeves(
        lightSleeves(
          [publicBriefs[0], pd.posts[0], ...publicLatest.slice(0, 6), ...wire.slice(0, 8)].filter(
            (item): item is NonNullable<typeof item> => Boolean(item),
          ),
        ),
      );
      const pool = [
        ...publicLatest.map((post) => ({
          title: post.title,
          slug: post.slug as string | undefined,
          url: undefined as string | undefined,
        })),
        ...wire.map((item) => ({ title: item.title, slug: item.slug, url: item.url })),
      ];
      setHits(
        storedWatch.map((id) => {
          const label = BOOK_NAMES.find((name) => name.id === id)?.label || id;
          const hit = pool.find((item) => nameHits(item.title).some((name) => name.id === id));
          return hit
            ? { id, label, title: hit.title, slug: hit.slug, url: hit.url }
            : { id, label, title: 'No print on this name since the last tick.' };
        }),
      );
      const fromNote = pd.posts[0]?.html ? yieldFromCopy(pd.posts[0].html) : null;
      setPrint(curve || fromNote);
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

  async function changeIc(next: string) {
    setLastIc(next);
    if (/^\d{4}-\d{2}-\d{2}$/.test(next)) {
      await AsyncStorage.setItem('uao.lastIc', next);
      load(watch, next);
    }
  }

  async function flipWatch(id: string) {
    const next = toggleWatch(watch, id);
    setWatch(next);
    await AsyncStorage.setItem('uao.watch', JSON.stringify(next));
    load(next, lastIc);
  }

  function openPack(item: PackItem) {
    if (item.slug) router.push({ pathname: '/article/[slug]', params: { slug: item.slug } });
    else if (item.url) WebBrowser.openBrowserAsync(item.url);
  }

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

        <Text style={styles.edition}>CIO terminal · New York</Text>
        <Text style={styles.lede}>
          What you would have to tell the board that you did not know at the last IC.
        </Text>
        <Text style={styles.sublede}>
          The 30-year. Which sleeve is carrying today’s print. Your names. Not a newspaper —
          Bloomberg already is. MandateWire already is.
        </Text>

        <LiabilityTape print={print} session={deskSession()} weights={weights} delta={delta} />
        <SleeveMap sleeves={sleeves} />
        <IcPack lastIc={lastIc} onChangeLastIc={changeIc} items={pack} onOpen={openPack} />
        <WatchBook
          watch={watch}
          onToggle={flipWatch}
          hits={hits}
          onOpen={(hit) => {
            if (hit.slug) router.push({ pathname: '/article/[slug]', params: { slug: hit.slug } });
            else if (hit.url) WebBrowser.openBrowserAsync(hit.url);
          }}
        />

        <View style={styles.formats}>
          <Chip label="Read" onPress={() => router.push('/(tabs)/brief')} />
          <Chip label="Watch" onPress={() => router.push('/watch')} />
          <Chip label="Listen" onPress={() => router.push('/(tabs)/live')} />
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
            <ProbabilityMeters weights={weights} delta={delta} />
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
        <Pressable onPress={() => router.push('/(tabs)/room')} style={styles.room}>
          <Text style={styles.edition}>The Room · invite only</Text>
          <Text style={styles.roomTitle}>Four chambers. One rule.</Text>
          <Text style={styles.sublede}>
            Chatham House. Desk spine. Member notes stay on this device until the house server
            exists. The newspaper stays complimentary.
          </Text>
        </Pressable>
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
  room: {
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    backgroundColor: colors.panel,
    gap: 8,
  },
  roomTitle: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
});
