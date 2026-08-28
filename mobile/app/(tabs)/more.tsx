import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { MenuRow, Screen, Wordmark } from '@/src/components/Ui';
import { SubscribeCard } from '@/src/components/SubscribeCard';
import { PEOPLE, THEMES } from '@/src/lib/classify';
import { getMember, seatLabel, seatStatus, type Member } from '@/src/lib/garden';
import { sitePath } from '@/src/api/subscribe';
import { colors, fonts } from '@/src/theme';

export default function MoreScreen() {
  const [member, setMember] = useState<Member | null>(null);
  useEffect(() => {
    getMember().then(setMember);
  }, []);
  const status = seatStatus(member);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Wordmark />
        <Text style={styles.lede}>
          Watchlist, institutions and the same four formats as the website. Save a brief from any
          story — it stays on this phone.
        </Text>
        <View style={styles.house}>
          <Text style={styles.heading}>The Room</Text>
          <Text style={styles.lede}>
            {status === 'seated'
              ? `Seated · ${seatLabel(member!)}${member?.peerCode ? ` · ${member.peerCode}` : ''}.`
              : status === 'pending'
                ? `Application with the desk · ${seatLabel(member!)}. The floor is still closed.`
                : 'The brief is complimentary. The room is not open.'}
          </Text>
          <MenuRow kicker="Access" title={status ? 'Open the room' : 'Request a seat'} href="/(tabs)/room" />
        </View>

        <Text style={styles.heading}>Watchlist</Text>
        <MenuRow kicker="Saved" title="Briefings on this device" href="/saved" />
        <MenuRow kicker="Search" title="Search the live library" href="/search" />
        <MenuRow kicker="Signals" title="Command Center" href="/command-center" />
        <MenuRow kicker="Research" title="UAO Research library" href="/section/research" />
        <MenuRow kicker="Video" title="Daily video briefings" href="/watch" />

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

        <Text style={styles.heading}>The house</Text>
        <MenuRow kicker="Commercial" title="Advertise — request the media kit" href="/advertise" />
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
  house: { marginTop: 8 },
});
