import { Link, useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatMeta } from '@/src/lib/format';
import { colors, fonts } from '@/src/theme';
import type { ClassifiedPost } from '@/src/types';

export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {children}
    </SafeAreaView>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <View>
      <Text style={styles.kicker}>Universal Asset Owners</Text>
      {!compact ? <Text style={styles.tagline}>Capital at the scale of the world.</Text> : null}
    </View>
  );
}

export function SectionHeader({
  kicker,
  title,
  actionLabel,
  href,
}: {
  kicker?: string;
  title: string;
  actionLabel?: string;
  href?: string;
}) {
  return (
    <View style={styles.sectionHead}>
      <View style={{ flex: 1 }}>
        {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {href && actionLabel ? (
        <Link href={href as never} style={styles.action}>
          {actionLabel}
        </Link>
      ) : null}
    </View>
  );
}

export function PostCard({
  post,
  hero = false,
}: {
  post: ClassifiedPost;
  hero?: boolean;
}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/article/[slug]', params: { slug: post.slug } })
      }
      style={StyleSheet.flatten([styles.card, hero ? styles.heroCard : undefined])}>
      {post.feature_image ? (
        <Image
          source={{ uri: post.feature_image }}
          style={hero ? styles.heroImage : styles.thumb}
        />
      ) : null}
      <Text style={styles.cardKicker}>{post.kicker}</Text>
      <Text style={StyleSheet.flatten([styles.cardTitle, hero ? styles.heroTitle : undefined])}>
        {post.title}
      </Text>
      {post.summary ? (
        <Text style={styles.cardSummary} numberOfLines={hero ? 5 : 3}>
          {post.summary}
        </Text>
      ) : null}
      <Text style={styles.meta}>{formatMeta(post.published_at, post.reading_time)}</Text>
    </Pressable>
  );
}

export function EmptyState({
  title,
  body,
  onRetry,
}: {
  title: string;
  body?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.empty}>
      <Text style={styles.cardTitle}>{title}</Text>
      {body ? <Text style={styles.cardSummary}>{body}</Text> : null}
      {onRetry ? (
        <Pressable onPress={onRetry} style={styles.button}>
          <Text style={styles.buttonLabel}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function LoadingBlock() {
  return (
    <View style={styles.empty}>
      <ActivityIndicator color={colors.gold} />
      <Text style={StyleSheet.flatten([styles.cardSummary, { marginTop: 12 }])}>
        Loading today’s intelligence…
      </Text>
    </View>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={StyleSheet.flatten([styles.chip, active ? styles.chipActive : undefined])}>
      <Text
        style={StyleSheet.flatten([
          styles.chipLabel,
          active ? styles.chipLabelActive : undefined,
        ])}>
        {label}
      </Text>
    </Pressable>
  );
}

export function MenuRow({
  kicker,
  title,
  href,
  onPress,
}: {
  kicker?: string;
  title: string;
  href?: string;
  onPress?: () => void;
}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        if (onPress) onPress();
        else if (href) router.push(href as never);
      }}
      style={styles.menuRow}>
      <View style={{ flex: 1 }}>
        {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export function PageScroll({ children }: { children: ReactNode }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.navy },
  scroll: { padding: 18, paddingBottom: 48, gap: 16 },
  kicker: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontFamily: fonts.serif,
  },
  tagline: {
    color: colors.creamMuted,
    fontSize: 14,
    marginTop: 4,
    fontFamily: fonts.serif,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontFamily: fonts.serif,
    fontWeight: '700',
    marginTop: 4,
  },
  action: { color: colors.gold2, fontSize: 13, paddingBottom: 4 },
  card: {
    backgroundColor: colors.navy2,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  heroCard: { padding: 0, overflow: 'hidden' },
  heroImage: { width: '100%', height: 180, backgroundColor: colors.panel },
  thumb: { width: '100%', height: 140, borderRadius: 8, backgroundColor: colors.panel },
  cardKicker: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    paddingHorizontal: 0,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: fonts.serif,
    fontWeight: '700',
  },
  heroTitle: { fontSize: 26, lineHeight: 32, paddingHorizontal: 16 },
  cardSummary: { color: colors.muted, fontSize: 15, lineHeight: 22, fontFamily: fonts.serif },
  meta: { color: colors.creamMuted, fontSize: 12, marginTop: 2 },
  empty: { paddingVertical: 40, alignItems: 'center', gap: 8 },
  button: {
    backgroundColor: colors.gold,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
  },
  buttonLabel: { color: colors.navy, fontWeight: '700' },
  chip: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: colors.navy3,
  },
  chipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipLabel: { color: colors.cream, fontSize: 13, fontWeight: '600' },
  chipLabelActive: { color: colors.navy },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    paddingVertical: 14,
    gap: 12,
  },
  menuTitle: { color: colors.text, fontSize: 17, fontFamily: fonts.serif },
  chevron: { color: colors.gold, fontSize: 24, lineHeight: 24 },
});
