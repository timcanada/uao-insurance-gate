import * as WebBrowser from 'expo-web-browser';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { MenuRow, Screen, Wordmark } from '@/src/components/Ui';
import { SubscribeCard } from '@/src/components/SubscribeCard';
import { PEOPLE, THEMES } from '@/src/lib/classify';
import { sitePath } from '@/src/api/subscribe';
import { colors, fonts } from '@/src/theme';

export default function MoreScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Wordmark />
        <Text style={styles.lede}>
          Two daily shows. Four formats. The same news and experience as universalassetowners.com.
        </Text>

        <Text style={styles.heading}>Formats</Text>
        <MenuRow kicker="Watch" title="Three-minute video briefings" href="/watch" />
        <MenuRow kicker="Listen" title="Two daily podcasts" href="/listen" />
        <MenuRow kicker="Chart" title="Chart of the Day from each desk" href="/charts" />
        <MenuRow kicker="Read" title="Morning brief and afternoon scenario" href="/(tabs)/brief" />

        <Text style={styles.heading}>People & institutions</Text>
        <MenuRow title="The hub" href="/people" />
        {PEOPLE.map((section) => (
          <MenuRow
            key={section.slug}
            title={section.title}
            href={`/section/${section.slug}`}
          />
        ))}

        <Text style={styles.heading}>Themes</Text>
        {THEMES.map((section) => (
          <MenuRow
            key={section.slug}
            title={section.title}
            href={`/section/${section.slug}`}
          />
        ))}

        <Text style={styles.heading}>The desk</Text>
        <MenuRow title="Command Center — live signals" href="/command-center" />
        <MenuRow title="Saved briefings" href="/saved" />
        <MenuRow title="Search the library" href="/search" />
        <MenuRow title="About Universal Asset Owners" href="/about" />
        <MenuRow
          title="Open the website"
          onPress={() => WebBrowser.openBrowserAsync(sitePath('/'))}
        />

        <View style={{ height: 8 }} />
        <SubscribeCard />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48 },
  lede: {
    color: colors.muted,
    fontFamily: fonts.serif,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 8,
  },
  heading: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginTop: 22,
    marginBottom: 4,
    fontFamily: fonts.serif,
  },
});
