import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { portalSignupUrl } from '@/src/api/subscribe';
import { colors, fonts } from '@/src/theme';

const REASONS = [
  ['Systemic risk', 'The risks a diversified owner cannot diversify away.'],
  ['Capital that moves the book', 'Sovereigns, pensions, private markets, infrastructure, AI.'],
  ['Written for decades', 'For institutions, not for the trading day.'],
  ['Five minutes, five days', 'Morning brief. Afternoon scenario. Four formats.'],
];

export function SubscribeCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'opened'>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error');
      setMessage('Enter a work email. The desk reviews every request.');
      return;
    }
    setStatus('opened');
    setMessage('Opening the same editorial review as the website.');
    await WebBrowser.openBrowserAsync(portalSignupUrl(value));
  }

  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Request desk access</Text>
      <Text style={styles.title}>The brief is complimentary. The room is not open.</Text>
      <Text style={styles.body}>
        Five days a week, for people who allocate at the scale of the world. Each subscriber is
        reviewed by the editorial desk — you receive a notice once access is approved.
      </Text>
      {REASONS.map(([title, line]) => (
        <View key={title} style={styles.reason}>
          <Text style={styles.reasonTitle}>{title}</Text>
          <Text style={styles.reasonBody}>{line}</Text>
        </View>
      ))}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder="you@institution.com"
        placeholderTextColor={colors.muted}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Pressable onPress={submit} style={styles.button}>
        <Text style={styles.buttonLabel}>Request the daily brief</Text>
      </Pressable>
      {message ? (
        <Text style={status === 'error' ? styles.error : styles.note}>{message}</Text>
      ) : (
        <Text style={styles.note}>Same Ghost portal as universalassetowners.com. No paywall theatre.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navy2,
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    gap: 10,
  },
  kicker: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontFamily: fonts.serif,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fonts.serif,
    fontWeight: '700',
  },
  body: { color: colors.muted, fontSize: 15, lineHeight: 22, fontFamily: fonts.serif },
  reason: { borderTopColor: colors.line, borderTopWidth: 1, paddingTop: 8 },
  reasonTitle: { color: colors.gold2, fontSize: 13, fontWeight: '700' },
  reasonBody: { color: colors.muted, fontFamily: fonts.serif, fontSize: 13, lineHeight: 18, marginTop: 2 },
  input: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text,
    backgroundColor: colors.panel,
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonLabel: { color: colors.navy, fontWeight: '800', letterSpacing: 0.3 },
  note: { color: colors.creamMuted, fontSize: 12, lineHeight: 18 },
  error: { color: colors.danger },
});
