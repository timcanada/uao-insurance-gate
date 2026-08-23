import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { fetchWire, isJustIn, type WireDesk, type WireItem } from '@/src/api/wire';
import { EmptyState, LoadingBlock, Screen } from '@/src/components/Ui';
import { colors, fonts } from '@/src/theme';
import { useRouter } from 'expo-router';

const FILTERS: { id: WireDesk | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'UAO', label: 'UAO desk' },
  { id: 'OFFICIAL', label: 'Official' },
  { id: 'BOOK', label: 'Allocators' },
];

export default function WireScreen() {
  const router = useRouter();
  const [items, setItems] = useState<WireItem[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('ALL');
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setError(null);
    try {
      const next = await fetchWire();
      setItems(next);
      setTick(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' ET',
      );
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

  const visible = items.filter((item) => filter === 'ALL' || item.desk === filter);

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
          The UAO desk, then the official prints that reprice it — Fed, ECB, SEC, BIS — and a live
          allocator scan. Ticks every 30 seconds.
        </Text>
        <Text style={styles.tick}>{tick ? `Last tick ${tick}` : 'Opening the wire…'}</Text>
        <View style={styles.row}>
          {FILTERS.map((chip) => (
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
        {loading ? <LoadingBlock /> : null}
        {error && !items.length ? <EmptyState title="Wire is quiet" body={error} onRetry={load} /> : null}
        {visible.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (item.slug) router.push({ pathname: '/article/[slug]', params: { slug: item.slug } });
              else if (item.url) WebBrowser.openBrowserAsync(item.url);
            }}
            style={styles.item}>
            <View style={styles.metaRow}>
              <Text style={styles.source}>{item.source}</Text>
              {isJustIn(item.publishedAt) ? <Text style={styles.just}>JUST IN</Text> : null}
            </View>
            <Text style={styles.headline}>{item.title}</Text>
            {item.summary ? <Text style={styles.summary}>{item.summary}</Text> : null}
          </Pressable>
        ))}
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
  summary: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
