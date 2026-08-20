import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { portalSignupUrl } from '@/src/api/subscribe';
import { isWorkEmail } from '@/src/lib/format';
import { colors, fonts } from '@/src/theme';

export function SubscribeCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'opened'>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    if (!isWorkEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid work email. Consumer inboxes are reviewed last.');
      return;
    }
    setStatus('opened');
    setMessage('Opening the same editorial desk review used on the website.');
    await WebBrowser.openBrowserAsync(portalSignupUrl(email));
  }

  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>The Daily Brief</Text>
      <Text style={styles.title}>Get tomorrow’s brief in your inbox — and in this app.</Text>
      <Text style={styles.body}>
        Complimentary, five days a week. Each subscriber is reviewed by the editorial desk. You’ll
        receive a notice once access is approved.
      </Text>
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
        <Text style={styles.buttonLabel}>Get the daily brief</Text>
      </Pressable>
      {message ? (
        <Text style={[styles.note, status === 'error' && styles.error]}>{message}</Text>
      ) : (
        <Text style={styles.note}>Same Ghost portal as universalassetowners.com.</Text>
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
    fontSize: 22,
    lineHeight: 28,
    fontFamily: fonts.serif,
    fontWeight: '700',
  },
  body: { color: colors.muted, fontSize: 14, lineHeight: 21, fontFamily: fonts.serif },
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
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonLabel: { color: colors.navy, fontWeight: '800', letterSpacing: 0.3 },
  note: { color: colors.creamMuted, fontSize: 12, lineHeight: 18 },
  error: { color: colors.danger },
});
