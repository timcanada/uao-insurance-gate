import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Screen } from '@/src/components/Ui';
import { sitePath } from '@/src/api/subscribe';
import { colors, fonts, SITE_PITCH } from '@/src/theme';

const LINKS = [
  { label: 'About', path: '/about/' },
  { label: 'Membership', path: '/membership/' },
  { label: 'Editorial standards', path: '/editorial-standards/' },
  { label: 'Methodology', path: '/methodology/' },
  { label: 'Masthead', path: '/masthead/' },
  { label: 'Contact', path: '/contact/' },
];

export default function AboutScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>Universal Asset Owners</Text>
        <Text style={styles.title}>The same news. The same desk. In your pocket.</Text>
        <Text style={styles.body}>{SITE_PITCH}</Text>
        <Text style={styles.body}>
          This app reads the live Ghost Content API that powers universalassetowners.com — daily
          briefs, Probability Desk scenarios, research, charts, video and podcasts — so hard-core
          readers are not stuck on a laptop for the five-minute morning read.
        </Text>
        {LINKS.map((link) => (
          <Pressable
            key={link.path}
            onPress={() => WebBrowser.openBrowserAsync(sitePath(link.path))}
            style={styles.row}>
            <Text style={styles.link}>{link.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 40 },
  kicker: {
    color: colors.gold,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 11,
    fontFamily: fonts.serif,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    marginVertical: 10,
  },
  body: { color: colors.muted, fontFamily: fonts.serif, fontSize: 16, lineHeight: 24, marginBottom: 12 },
  row: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  link: { color: colors.gold2, fontSize: 16, fontFamily: fonts.serif },
});
