import * as WebBrowser from 'expo-web-browser';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { sitePath } from '@/src/api/subscribe';
import { colors, fonts } from '@/src/theme';

export function PartnerPlate({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress ?? (() => WebBrowser.openBrowserAsync(sitePath('/briefings/')))}
      style={styles.plate}>
      <Text style={styles.tag}>Briefing partner</Text>
      <Text style={styles.title}>This position sits next to the morning brief.</Text>
      <Text style={styles.body}>
        One disclosed slot, firewalled from the desk. For houses that already sit across from
        sovereigns, pensions and family offices — not for anyone buying a banner.
      </Text>
      <Text style={styles.cta}>Request the media kit →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  plate: {
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    backgroundColor: colors.panel,
    gap: 8,
  },
  tag: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  body: { color: colors.muted, fontFamily: fonts.serif, fontSize: 14, lineHeight: 21 },
  cta: { color: colors.gold2, fontWeight: '700', fontSize: 13, marginTop: 4 },
});
