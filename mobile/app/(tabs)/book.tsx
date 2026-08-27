import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { fetchWire } from '@/src/api/wire';
import { fetchPosts } from '@/src/api/ghost';
import { PostCard, Screen } from '@/src/components/Ui';
import { FILTERS } from '@/src/lib/classify';
import { canEnterHouse, getMember, seatLabel, seatStatus, type Member } from '@/src/lib/garden';
import {
  DIARY,
  EMPLOYER_PORTALS,
  JOB_BOARDS,
  TALENT_DESKS,
  VERIFIED_ROLES_COPY,
  isHiringSignal,
} from '@/src/lib/house';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

export default function BookScreen() {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [people, setPeople] = useState<ClassifiedPost[]>([]);
  const [research, setResearch] = useState<ClassifiedPost[]>([]);
  const [signals, setSignals] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      getMember(),
      fetchPosts({ filter: 'tag:people', limit: 6 }).catch(() => ({ posts: [] })),
      fetchPosts({ filter: FILTERS.research, limit: 6 }).catch(() => ({ posts: [] })),
      fetchWire().catch(() => []),
    ]).then(([next, who, reports, wire]) => {
      setMember(next);
      setPeople(who.posts);
      setResearch(reports.posts);
      setSignals(wire.filter((item) => isHiringSignal(item.title)).slice(0, 6).map((item) => item.title));
      setReady(true);
    });
  }, []);

  if (!ready) return <Screen><View /></Screen>;

  if (!canEnterHouse(member)) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.kicker}>The book · apply</Text>
          <Text style={styles.title}>Jobs the desk verified. Appointments the house will take.</Text>
          <Text style={styles.lede}>
            Apply with name, work email and a direct line. The desk confirms. We do not invent a
            mandate we have not confirmed.
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/room')} style={styles.primary}>
            <Text style={styles.primaryLabel}>Apply for the house</Text>
          </Pressable>
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>The book · members</Text>
        <Text style={styles.title}>Jobs the desk verified. Appointments the house will take.</Text>
        <Text style={styles.lede}>
          {seatStatus(member) === 'pending' ? 'Application with the desk' : 'Seated'} ·{' '}
          {member ? seatLabel(member) : ''}.
        </Text>
        {TALENT_DESKS.map((desk) => (
          <Pressable key={desk.id} onPress={() => WebBrowser.openBrowserAsync(desk.href)} style={styles.card}>
            <Text style={styles.kicker}>{desk.kicker}</Text>
            <Text style={styles.headline}>{desk.title}</Text>
            <Text style={styles.lede}>{desk.blurb}</Text>
          </Pressable>
        ))}
        <Text style={styles.kicker}>Verified roles</Text>
        <Text style={styles.lede}>{VERIFIED_ROLES_COPY}</Text>
        <Text style={styles.kicker}>Houses we track</Text>
        {EMPLOYER_PORTALS.map((house) => (
          <Pressable key={house.id} onPress={() => WebBrowser.openBrowserAsync(house.href)} style={styles.card}>
            <Text style={styles.headline}>{house.name}</Text>
            <Text style={styles.lede}>{house.line}</Text>
          </Pressable>
        ))}
        <Text style={styles.kicker}>Institutional boards</Text>
        {JOB_BOARDS.map((board) => (
          <Pressable key={board.id} onPress={() => WebBrowser.openBrowserAsync(board.href)} style={styles.card}>
            <Text style={styles.headline}>{board.name}</Text>
            <Text style={styles.lede}>{board.line}</Text>
          </Pressable>
        ))}
        <Text style={styles.kicker}>Signals the desk reported</Text>
        {signals.map((title) => (
          <Text key={title} style={styles.headline}>
            {title}
          </Text>
        ))}
        <Text style={styles.kicker}>Who moved</Text>
        {people.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Text style={styles.kicker}>The diary</Text>
        {DIARY.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => (item.href ? WebBrowser.openBrowserAsync(item.href) : undefined)}
            style={styles.card}>
            <Text style={styles.kicker}>{item.when}</Text>
            <Text style={styles.headline}>{item.title}</Text>
            <Text style={styles.lede}>{item.blurb}</Text>
          </Pressable>
        ))}
        <Text style={styles.kicker}>Reports</Text>
        {research.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48, gap: 12 },
  kicker: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  lede: { color: colors.muted, fontFamily: fonts.serif, fontSize: 15, lineHeight: 22 },
  headline: { color: colors.text, fontFamily: fonts.serif, fontSize: 17, lineHeight: 23 },
  primary: { backgroundColor: colors.gold, borderRadius: 8, paddingVertical: 13, alignItems: 'center' },
  primaryLabel: { color: colors.navy, fontWeight: '800' },
  card: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.navy2,
    gap: 6,
  },
});
