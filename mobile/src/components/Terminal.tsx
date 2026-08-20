import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useDeskAlertsContext } from '@/src/hooks/useDeskAlerts';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

function etClock(): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function sessionLabel(): string {
  const hour = Number(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }),
  );
  if (hour < 12) return 'Morning desk · The Universal Owner';
  if (hour < 17) return 'Afternoon desk · The Probability Desk';
  return 'After close · overnight book';
}

export function TerminalHeader() {
  const [clock, setClock] = useState(etClock);
  const [session, setSession] = useState(sessionLabel);
  const onAir = Boolean(useDeskAlertsContext()?.live?.live);
  useEffect(() => {
    const id = setInterval(() => {
      setClock(etClock());
      setSession(sessionLabel());
    }, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={styles.head}>
      <View style={{ flex: 1 }}>
        <Text style={styles.brand}>UNIVERSAL ASSET OWNERS</Text>
        <Text style={styles.session}>{session}</Text>
      </View>
      <Text style={onAir ? styles.live : styles.standby}>{onAir ? 'LIVE' : 'STANDBY'}</Text>
      <Text style={styles.clock}>{clock} ET</Text>
    </View>
  );
}

export function Ticker({ posts }: { posts: ClassifiedPost[] }) {
  if (!posts.length) return null;
  const line = posts.map((post) => `${post.kicker} · ${post.title}`).join('     ');
  return (
    <View style={styles.tape}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.tapeText}>{line}</Text>
      </ScrollView>
    </View>
  );
}

export function ProbabilityMeters() {
  return (
    <View style={styles.meters}>
      <View style={styles.meter}>
        <Text style={styles.base}>BASE</Text>
        <Text style={styles.meterSub}>central case</Text>
      </View>
      <View style={styles.meter}>
        <Text style={styles.up}>UPSIDE</Text>
        <Text style={styles.meterSub}>second-order</Text>
      </View>
      <View style={styles.meter}>
        <Text style={styles.tail}>TAIL</Text>
        <Text style={styles.meterSub}>break case</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  brand: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    fontFamily: fonts.serif,
  },
  session: { color: colors.muted, fontSize: 12, marginTop: 3, fontFamily: fonts.serif },
  live: { color: colors.danger, fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  standby: { color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 0.8, opacity: 0.55 },
  clock: { color: colors.gold2, fontSize: 11, fontWeight: '700' },
  tape: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tapeText: { color: colors.gold2, fontSize: 12, fontFamily: fonts.serif },
  meters: { flexDirection: 'row', gap: 6, marginVertical: 8 },
  meter: {
    flex: 1,
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  base: { color: colors.gold2, fontWeight: '800', fontSize: 12 },
  up: { color: colors.success, fontWeight: '800', fontSize: 12 },
  tail: { color: colors.danger, fontWeight: '800', fontSize: 12 },
  meterSub: { color: colors.muted, fontSize: 10, marginTop: 3 },
});
