import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { fetchWire, isJustIn, type WireItem } from '@/src/api/wire';
import { EmptyState, LoadingBlock, Screen } from '@/src/components/Ui';
import { BOOK_NAMES } from '@/src/lib/names';
import { normalizeWatch } from '@/src/lib/watch';
import {
  WIRE_OPENED_KEY,
  hitsWatch,
  itemFlowLabel,
  itemNames,
  parseLastOpen,
  printedSinceOpen,
  visibleWire,
  type WireDeskFilter,
  type WireNameFilter,
} from '@/src/lib/wire-desk';
import { colors, fonts } from '@/src/theme';

const DESKS: { id: WireDeskFilter; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'UAO', label: 'UAO desk' },
  { id: 'OFFICIAL', label: 'Official' },
  { id: 'BOOK', label: 'Allocators' },
  { id: 'FLOWS', label: 'Flows' },
];

function openItem(
  item: WireItem,
  router: ReturnType<typeof useRouter>,
) {
  if (item.slug) router.push({ pathname: '/article/[slug]', params: { slug: item.slug } });
  else if (item.url) WebBrowser.openBrowserAsync(item.url);
}

export default function WireScreen() {
  const router = useRouter();
  const [items, setItems] = useState<WireItem[]>([]);
  const [filter, setFilter] = useState<WireDeskFilter>('ALL');
  const [name, setName] = useState<WireNameFilter>('WATCH');
  const [watch, setWatch] = useState<string[]>(() => normalizeWatch(null));
  const [fresh, setFresh] = useState<WireItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setError(null);
    try {
      const storedWatch = normalizeWatch(JSON.parse((await AsyncStorage.getItem('uao.watch')) || 'null'));
      const lastOpen = parseLastOpen(await AsyncStorage.getItem(WIRE_OPENED_KEY));
      const next = await fetchWire();
      setWatch(storedWatch);
      setItems(next);
      setFresh(printedSinceOpen(next, storedWatch, lastOpen));
      setTick(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' ET',
      );
      if (!silent) {
        await AsyncStorage.setItem(WIRE_OPENED_KEY, String(Date.now()));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wire unreachable');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => load(true), 30000);
    return () => clearInterval(id);
  }, [load]);

  const visible = visibleWire(items, filter, name, watch);
  const watched = BOOK_NAMES.filter((item) => watch.includes(item.id));
  const rest = BOOK_NAMES.filter((item) => !watch.includes(item.id));

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={false} tintColor={colors.gold} onRefresh={() => load()} />
        }>
        <Text style={styles.kicker}>Streaming wire</Text>
        <Text style={styles.title}>What just moved the book.</Text>
        <Text style={styles.lede}>
          Defaults to the names you keep on TERM. Official prints, owner-side flows, then the
          allocator scan — not a newspaper. Ticks every 30 seconds.
        </Text>
        <Text style={styles.tick}>
          {tick
            ? `Last tick ${tick} · ${visible.length} on this filter`
            : 'Opening the wire…'}
        </Text>

        {fresh.length ? (
          <View style={styles.fresh}>
            <Text style={styles.kicker}>Printed on your names since last open</Text>
            {fresh.slice(0, 4).map((item) => (
              <Pressable key={item.id} onPress={() => openItem(item, router)} style={styles.freshRow}>
                <Text style={styles.names}>{itemNames(item).join(' · ')}</Text>
                <Text style={styles.freshTitle}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={styles.row}>
          {DESKS.map((chip) => (
            <Pressable
              key={chip.id}
              onPress={() => setFilter(chip.id)}
              style={[styles.chip, filter === chip.id ? styles.chipOn : null]}>
              <Text style={[styles.chipLabel, filter === chip.id ? styles.chipLabelOn : null]}>
                {chip.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.row}>
          <Pressable
            onPress={() => setName('WATCH')}
            style={[styles.chip, name === 'WATCH' ? styles.chipOn : null]}>
            <Text style={[styles.chipLabel, name === 'WATCH' ? styles.chipLabelOn : null]}>
              Your names
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setName('ALL')}
            style={[styles.chip, name === 'ALL' ? styles.chipOn : null]}>
            <Text style={[styles.chipLabel, name === 'ALL' ? styles.chipLabelOn : null]}>All names</Text>
          </Pressable>
          {[...watched, ...rest].map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setName(item.id)}
              style={[styles.chip, name === item.id ? styles.chipOn : null]}>
              <Text style={[styles.chipLabel, name === item.id ? styles.chipLabelOn : null]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
        {loading ? <LoadingBlock /> : null}
        {error && !items.length ? <EmptyState title="Wire is quiet" body={error} onRetry={load} /> : null}
        {!loading && !visible.length && items.length ? (
          <EmptyState
            title="No print on that filter"
            body="The wire is quiet on your names this tick. That is a fact, not an empty state we invented."
            onRetry={() => setName('ALL')}
          />
        ) : null}
        {visible.map((item) => {
          const names = itemNames(item);
          const flow = itemFlowLabel(item);
          const mine = hitsWatch(item, watch);
          return (
            <Pressable key={item.id} onPress={() => openItem(item, router)} style={styles.item}>
              <View style={styles.metaRow}>
                <Text style={styles.source}>
                  {flow ? `${flow} · ${item.source}` : item.source}
                </Text>
                {isJustIn(item.publishedAt) ? <Text style={styles.just}>JUST IN</Text> : null}
              </View>
              <Text style={styles.headline}>{item.title}</Text>
              {names.length ? (
                <Text style={styles.names}>
                  {mine ? 'On your book · ' : ''}
                  {names.join(' · ')}
                </Text>
              ) : null}
              {item.summary ? <Text style={styles.summary}>{item.summary}</Text> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48 },
  kicker: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase' },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, fontWeight: '700', marginTop: 6 },
  lede: { color: colors.muted, fontFamily: fonts.serif, fontSize: 15, lineHeight: 22, marginTop: 8 },
  tick: { color: colors.gold2, fontSize: 11, marginTop: 8, marginBottom: 12 },
  fresh: {
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.panel,
    marginBottom: 14,
    gap: 8,
  },
  freshRow: { gap: 2, paddingVertical: 6, borderBottomColor: colors.line, borderBottomWidth: 1 },
  freshTitle: { color: colors.text, fontFamily: fonts.serif, fontSize: 16, lineHeight: 22 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { borderColor: colors.line, borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipLabel: { color: colors.text, fontSize: 12, fontWeight: '700' },
  chipLabelOn: { color: colors.navy },
  item: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    paddingVertical: 12,
    gap: 4,
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  source: { color: colors.gold, fontSize: 10, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  just: { color: colors.danger, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headline: { color: colors.text, fontFamily: fonts.serif, fontSize: 18, lineHeight: 24 },
  names: { color: colors.gold2, fontSize: 11, fontWeight: '700', letterSpacing: 0.6 },
  summary: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
