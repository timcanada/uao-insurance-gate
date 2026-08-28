import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { formatBp, type ThirtyYearPrint } from '@/src/lib/rates';
import type { PackItem } from '@/src/lib/ic';
import type { DeskSession } from '@/src/lib/session';
import type { LitSleeve } from '@/src/lib/sleeves';
import { BOOK_NAMES } from '@/src/lib/names';
import { formatDelta, type DeskWeights } from '@/src/lib/weights';
import { colors, fonts } from '@/src/theme';

export function LiabilityTape({
  print,
  session,
  weights,
  delta,
}: {
  print: ThirtyYearPrint | null;
  session: DeskSession;
  weights?: DeskWeights | null;
  delta?: DeskWeights | null;
}) {
  return (
    <View style={styles.mast}>
      <View style={styles.num}>
        <Text style={styles.kicker}>30-year</Text>
        <Text style={styles.yield}>{print ? `${print.yield.toFixed(2)}%` : '—'}</Text>
        <Text style={styles.note}>
          {print
            ? `${formatBp(print.deltaBp)}${print.deltaBp != null ? ' · ' : ''}${print.label}${
                print.date ? ` · ${print.date}` : ''
              }`
            : 'Treasury curve did not print on this desk. We do not invent a liability number.'}
        </Text>
      </View>
      <View style={styles.sess}>
        <Text style={styles.kicker}>{session.id === 'official' ? 'Print window' : 'Session'}</Text>
        <Text style={styles.sessTitle}>{session.title}</Text>
        <Text style={styles.note}>{session.blurb}</Text>
        {weights ? (
          <View style={styles.meters}>
            <Text style={styles.meter}>BASE {weights.base}%{delta ? ` · ${formatDelta(delta.base)}` : ''}</Text>
            <Text style={styles.meter}>UPSIDE {weights.upside}%{delta ? ` · ${formatDelta(delta.upside)}` : ''}</Text>
            <Text style={styles.meter}>TAIL {weights.tail}%{delta ? ` · ${formatDelta(delta.tail)}` : ''}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function SleeveMap({ sleeves }: { sleeves: LitSleeve[] }) {
  return (
    <View>
      <Text style={styles.kicker}>The book’s sleeves · lit from the desk, not a risk system</Text>
      <View style={styles.sleeves}>
        {sleeves.map((sleeve) => (
          <View key={sleeve.id} style={[styles.sleeve, sleeve.lit ? styles.sleeveLit : null]}>
            <Text style={styles.sleeveLabel}>{sleeve.label}</Text>
            <Text style={styles.note} numberOfLines={3}>
              {sleeve.lit ? sleeve.titles[0] : 'Quiet'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function IcPack({
  lastIc,
  onChangeLastIc,
  items,
  onOpen,
}: {
  lastIc: string;
  onChangeLastIc: (next: string) => void;
  items: PackItem[];
  onOpen: (item: PackItem) => void;
}) {
  return (
    <View style={styles.pack}>
      <Text style={styles.kicker}>Since last IC</Text>
      <Text style={styles.packTitle}>{items.length} items the board did not have.</Text>
      <Text style={styles.note}>
        Set the last committee date (YYYY-MM-DD). Friday you screenshot this. We assemble the
        intelligence half. We do not write the minutes.
      </Text>
      <TextInput
        value={lastIc}
        onChangeText={onChangeLastIc}
        placeholder="2026-07-31"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        style={styles.input}
      />
      {items.map((item) => (
        <Pressable key={item.id} onPress={() => onOpen(item)} style={styles.row}>
          <Text style={styles.kicker}>{item.source}</Text>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.note}>{item.why}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function WatchBook({
  watch,
  onToggle,
  hits,
  onOpen,
}: {
  watch: string[];
  onToggle: (id: string) => void;
  hits: { id: string; label: string; title: string; slug?: string; url?: string }[];
  onOpen: (hit: { slug?: string; url?: string }) => void;
}) {
  return (
    <View>
      <Text style={styles.kicker}>On your names</Text>
      <Text style={styles.note}>
        Funds read names they hold about five times more than names they do not. This is that screen.
      </Text>
      <View style={styles.chips}>
        {BOOK_NAMES.map((name) => (
          <Pressable
            key={name.id}
            onPress={() => onToggle(name.id)}
            style={[styles.chip, watch.includes(name.id) ? styles.chipOn : null]}>
            <Text style={[styles.chipLabel, watch.includes(name.id) ? styles.chipOnLabel : null]}>
              {name.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {hits.map((hit) => (
        <Pressable key={hit.id} onPress={() => onOpen(hit)} style={styles.row}>
          <Text style={styles.kicker}>{hit.label}</Text>
          <Text style={styles.rowTitle}>{hit.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mast: { gap: 8 },
  num: {
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.panel,
    gap: 6,
  },
  sess: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.panel,
    gap: 6,
  },
  yield: { color: colors.gold2, fontSize: 32, fontWeight: '800' },
  kicker: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase' },
  sessTitle: { color: colors.text, fontFamily: fonts.serif, fontSize: 18, lineHeight: 24 },
  note: { color: colors.muted, fontFamily: fonts.serif, fontSize: 13, lineHeight: 18 },
  meters: { gap: 2, marginTop: 4 },
  meter: { color: colors.gold2, fontSize: 11, fontWeight: '700' },
  sleeves: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  sleeve: {
    width: '31%',
    flexGrow: 1,
    minWidth: 96,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    backgroundColor: colors.panel,
    minHeight: 72,
  },
  sleeveLit: { borderColor: colors.gold },
  sleeveLabel: { color: colors.gold2, fontSize: 10, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  pack: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.navy2,
    gap: 8,
  },
  packTitle: { color: colors.text, fontFamily: fonts.serif, fontSize: 22, lineHeight: 28, fontWeight: '700' },
  input: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: colors.text,
    backgroundColor: colors.panel,
  },
  row: { borderBottomColor: colors.line, borderBottomWidth: 1, paddingVertical: 10, gap: 4 },
  rowTitle: { color: colors.text, fontFamily: fonts.serif, fontSize: 16, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 8 },
  chip: { borderColor: colors.line, borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipLabel: { color: colors.text, fontSize: 12, fontWeight: '700' },
  chipOnLabel: { color: colors.navy },
});
