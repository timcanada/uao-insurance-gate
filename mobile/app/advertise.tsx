import * as WebBrowser from 'expo-web-browser';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PartnerPlate } from '@/src/components/PartnerPlate';
import { Screen } from '@/src/components/Ui';
import { sitePath } from '@/src/api/subscribe';
import { colors, fonts } from '@/src/theme';

const INVENTORY = [
  ['Morning brief', 'One disclosed adjacency next to The Universal Owner. The first thing the desk opens.'],
  ['Probability Desk', 'Afternoon scenario. Base, upside, tail. For houses that already think in decades.'],
  ['YouTube live', 'The same player as the website, when we go on air.'],
  ['UAO Research', 'Partner research is labelled, firewalled, and never mixed into the daily brief.'],
  ['Briefings', 'Chatham House conversations with the people who allocate the book.'],
];

const ROOM = [
  'Sovereign wealth',
  'Public pensions',
  'Endowments & foundations',
  'Insurers',
  'Family offices',
  'The people who advise them',
];

export default function AdvertiseScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>Advertising & sponsorship</Text>
        <Text style={styles.title}>Reach the people who allocate at the scale of the world.</Text>
        <Text style={styles.body}>
          This is not a remnant banner. Universal Asset Owners partners selectively with
          organisations that already serve or study long-horizon capital. Sponsorship is disclosed.
          Editorial is firewalled. If a sponsor asks for influence, the relationship ends.
        </Text>

        <PartnerPlate
          onPress={() =>
            Linking.openURL(
              'mailto:info@universalassetowners.com?subject=Media%20kit%20%E2%80%94%20UAO%20Terminal',
            )
          }
        />

        <Text style={styles.heading}>Who sits in this room</Text>
        {ROOM.map((name) => (
          <View key={name} style={styles.row}>
            <Text style={styles.rowTitle}>{name}</Text>
          </View>
        ))}

        <Text style={styles.heading}>Inventory</Text>
        {INVENTORY.map(([title, line]) => (
          <View key={title} style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardBody}>{line}</Text>
          </View>
        ))}

        <Text style={styles.heading}>The rule</Text>
        <Text style={styles.body}>
          Sponsored and partner items are excluded from the homepage lead, the daily brief and the
          research stream unless they are separately labelled. See the editorial standards.
        </Text>

        <Pressable
          onPress={() =>
            Linking.openURL(
              'mailto:info@universalassetowners.com?subject=Media%20kit%20%E2%80%94%20UAO%20Terminal',
            )
          }
          style={styles.primary}>
          <Text style={styles.primaryLabel}>Email the desk for the media kit</Text>
        </Pressable>
        <Pressable onPress={() => WebBrowser.openBrowserAsync(sitePath('/briefings/'))}>
          <Text style={styles.link}>Briefings & conversations →</Text>
        </Pressable>
        <Pressable onPress={() => WebBrowser.openBrowserAsync(sitePath('/editorial-standards/'))}>
          <Text style={styles.link}>Editorial standards →</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48, gap: 12 },
  kicker: {
    color: colors.gold,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 11,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  body: { color: colors.muted, fontFamily: fonts.serif, fontSize: 16, lineHeight: 24 },
  heading: { color: colors.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginTop: 8 },
  row: { borderBottomColor: colors.line, borderBottomWidth: 1, paddingVertical: 10 },
  rowTitle: { color: colors.text, fontFamily: fonts.serif, fontSize: 17 },
  card: {
    backgroundColor: colors.navy2,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  cardTitle: { color: colors.gold2, fontWeight: '700', marginBottom: 4 },
  cardBody: { color: colors.muted, fontFamily: fonts.serif, fontSize: 14, lineHeight: 20 },
  primary: {
    backgroundColor: colors.gold,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryLabel: { color: colors.navy, fontWeight: '800' },
  link: { color: colors.gold2, fontFamily: fonts.serif, fontSize: 16, paddingVertical: 6 },
});
