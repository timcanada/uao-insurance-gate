import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { fetchLiveStatus, liveEmbedUrl } from '@/src/api/live';
import {
  audioPlayerHtml,
  fetchEpisodes,
  fetchStudioShows,
  type Episode,
  type StudioShow,
} from '@/src/api/studio';
import { Screen } from '@/src/components/Ui';
import { canEnterHouse, getMember, seatLabel, type Member } from '@/src/lib/garden';
import { colors, fonts } from '@/src/theme';
import { useRouter } from 'expo-router';

export default function LiveScreen() {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [ready, setReady] = useState(false);
  const [shows, setShows] = useState<StudioShow[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [liveId, setLiveId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [nextMember, studio, audio, live] = await Promise.all([
      getMember(),
      fetchStudioShows().catch(() => []),
      fetchEpisodes().catch(() => []),
      fetchLiveStatus().catch(() => null),
    ]);
    setMember(nextMember);
    setShows(studio);
    setEpisodes(audio);
    setLiveId(live?.live ? live.videoId : null);
    setActive((current) => current || (live?.live ? live.videoId : studio[0]?.videoId || null));
    setReady(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (!ready) return <Screen><View /></Screen>;

  if (!canEnterHouse(member)) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.kicker}>Studio · apply</Text>
          <Text style={styles.title}>Name, work email, direct line.</Text>
          <Text style={styles.lede}>
            Live, just-missed and the podcasts play here after the desk has a record on you. The
            brief stays complimentary.
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/room')} style={styles.primary}>
            <Text style={styles.primaryLabel}>Apply for the house</Text>
          </Pressable>
        </ScrollView>
      </Screen>
    );
  }

  const onAir = Boolean(liveId);
  const playing = active || liveId;
  const liveMode = Boolean(onAir && playing && playing === liveId);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>Studio · members</Text>
        <Text style={styles.title}>{liveMode ? 'We are live.' : 'Just missed. The book is still on the tape.'}</Text>
        <Text style={styles.lede}>
          The same YouTube player as the website. Podcasts play here — they do not bounce you to
          Apple. Seated as {member ? seatLabel(member) : 'Member'}.
        </Text>
        {onAir ? (
          <Pressable onPress={() => liveId && setActive(liveId)} style={styles.primary}>
            <Text style={styles.primaryLabel}>Watch live</Text>
          </Pressable>
        ) : null}
        {playing ? (
          <View style={styles.frame}>
            <WebView
              source={{ uri: liveEmbedUrl(playing, liveMode) }}
              style={styles.web}
              allowsInlineMediaPlayback
            />
          </View>
        ) : null}
        <Text style={styles.kicker}>Listen in the house</Text>
        {episodes.slice(0, 6).map((episode) => {
          const html = audioPlayerHtml(episode.audio);
          if (!html) return null;
          return (
            <View key={episode.audio} style={styles.card}>
              <Text style={styles.kicker}>{episode.show}</Text>
              <Text style={styles.headline}>{episode.title}</Text>
              {episode.summary ? <Text style={styles.lede}>{episode.summary}</Text> : null}
              <WebView
                source={{ html }}
                style={styles.audio}
                allowsInlineMediaPlayback
              />
            </View>
          );
        })}
        <Text style={styles.kicker}>The most recent shows</Text>
        {shows.map((show) => (
          <Pressable key={show.videoId} onPress={() => setActive(show.videoId)} style={styles.card}>
            <Text style={styles.headline}>{show.title}</Text>
            <Text style={styles.lede}>{show.publishedAt ? new Date(show.publishedAt).toDateString() : ''}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48, gap: 10 },
  kicker: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  lede: { color: colors.muted, fontFamily: fonts.serif, fontSize: 15, lineHeight: 22 },
  headline: { color: colors.text, fontFamily: fonts.serif, fontSize: 18, lineHeight: 24 },
  primary: { backgroundColor: colors.gold, borderRadius: 8, paddingVertical: 13, alignItems: 'center' },
  primaryLabel: { color: colors.navy, fontWeight: '800' },
  frame: { height: 210, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
  web: { flex: 1, backgroundColor: '#000' },
  audio: { height: 44, backgroundColor: colors.panel },
  card: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.navy2,
    gap: 6,
  },
});
