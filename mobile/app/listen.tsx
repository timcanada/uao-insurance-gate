import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';
import { colors } from '@/src/theme';

const SHOWS = [
  {
    title: 'The Universal Owner',
    apple: 'https://podcasts.apple.com/us/podcast/the-universal-owner/id1896768422',
    spotify: 'https://open.spotify.com/show/033o3co88wewrXkK06HLNS',
    rss: 'https://feed.podbean.com/universalassetowners/feed.xml',
  },
  {
    title: 'The Probability Desk',
    apple: 'https://podcasts.apple.com/us/podcast/the-probability-desk/id1896827275',
    spotify: 'https://open.spotify.com/show/033juuhRnLkCz2IbKwAOqr',
    rss: 'https://feed.podbean.com/probabilitydesk/feed.xml',
  },
];

export default function ListenScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bar}>
        {SHOWS.map((show) => (
          <View key={show.title} style={styles.show}>
            <Text style={styles.showTitle}>{show.title}</Text>
            <View style={styles.row}>
              <Pressable onPress={() => WebBrowser.openBrowserAsync(show.apple)}>
                <Text style={styles.link}>Apple</Text>
              </Pressable>
              <Pressable onPress={() => WebBrowser.openBrowserAsync(show.spotify)}>
                <Text style={styles.link}>Spotify</Text>
              </Pressable>
              <Pressable onPress={() => WebBrowser.openBrowserAsync(show.rss)}>
                <Text style={styles.link}>RSS</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      <Feed
        filter={FILTERS.podcast}
        kicker="Listen"
        title="Two daily podcasts"
        blurb="Eight to twelve minutes of audio per show — the same episodes that post to Apple, Spotify and Podbean."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.navy2,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 10,
  },
  show: { gap: 4 },
  showTitle: { color: colors.text, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 14 },
  link: { color: colors.gold2, fontSize: 13, fontWeight: '600' },
});
