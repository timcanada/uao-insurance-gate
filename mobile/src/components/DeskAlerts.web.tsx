import { useRouter } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { liveEmbedUrl } from '@/src/api/live';
import { useDeskAlertsContext } from '@/src/hooks/useDeskAlerts';
import { colors, fonts } from '@/src/theme';

export function DeskAlerts() {
  const alerts = useDeskAlertsContext();
  const router = useRouter();
  if (!alerts) return null;

  const { live, showPlayer, liveAlert, briefAlert, dismissLiveAlert, hideLivePlayer, dismissBrief } =
    alerts;

  return (
    <>
      {showPlayer && live?.videoId ? (
        <View style={styles.dock}>
          <View style={styles.bar}>
            <Text style={styles.tag}>Live now</Text>
            <Text style={styles.title} numberOfLines={1}>
              {live.title || 'Universal Asset Owners is live'}
            </Text>
            <Pressable onPress={hideLivePlayer} style={styles.hide}>
              <Text style={styles.hideLabel}>Hide</Text>
            </Pressable>
          </View>
          <iframe
            src={liveEmbedUrl(live.videoId)}
            title={live.title || 'Universal Asset Owners live stream'}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ width: '100%', height: 210, border: 0, background: '#000' }}
          />
        </View>
      ) : null}

      <Modal visible={Boolean(liveAlert && live?.live)} transparent animationType="fade">
        <View style={styles.scrim}>
          <View style={styles.card}>
            <Text style={styles.tag}>Live broadcast</Text>
            <Text style={styles.headline}>We are live on YouTube</Text>
            <Text style={styles.body}>
              {live?.title || 'Universal Asset Owners is on air now — the same player as the website.'}
            </Text>
            <Pressable onPress={dismissLiveAlert} style={styles.primary}>
              <Text style={styles.primaryLabel}>Watch in the app</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={Boolean(briefAlert)} transparent animationType="fade">
        <View style={styles.scrim}>
          <View style={styles.card}>
            <Text style={styles.tag}>Daily brief</Text>
            <Text style={styles.headline}>This morning’s brief is out</Text>
            <Text style={styles.body}>{briefAlert?.title}</Text>
            <Pressable
              onPress={() => {
                const slug = briefAlert?.slug;
                dismissBrief();
                if (slug) router.push({ pathname: '/article/[slug]', params: { slug } });
              }}
              style={styles.primary}>
              <Text style={styles.primaryLabel}>Read it now</Text>
            </Pressable>
            <Pressable onPress={dismissBrief}>
              <Text style={styles.later}>Later</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dock: {
    backgroundColor: colors.navy,
    borderBottomColor: colors.gold,
    borderBottomWidth: 3,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tag: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { flex: 1, color: colors.text, fontFamily: fonts.serif, fontSize: 14 },
  hide: { borderColor: colors.line, borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  hideLabel: { color: colors.gold2, fontSize: 12 },
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(6,12,20,0.72)',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    backgroundColor: colors.navy2,
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 10,
  },
  headline: { color: colors.text, fontFamily: fonts.serif, fontSize: 24, fontWeight: '700' },
  body: { color: colors.muted, fontFamily: fonts.serif, fontSize: 15, lineHeight: 22 },
  primary: {
    backgroundColor: colors.gold,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryLabel: { color: colors.navy, fontWeight: '800' },
  later: { color: colors.gold2, textAlign: 'center', paddingVertical: 8 },
});
