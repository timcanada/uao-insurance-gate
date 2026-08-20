import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { EmptyState, LoadingBlock, PostCard, Screen, Wordmark } from '@/src/components/Ui';
import { usePosts } from '@/src/hooks/usePosts';
import { colors, fonts } from '@/src/theme';

export function Feed({
  filter,
  kicker,
  title,
  blurb,
}: {
  filter: string;
  kicker: string;
  title: string;
  blurb: string;
}) {
  const feed = usePosts(filter, 12);

  return (
    <Screen>
      <FlatList
        data={feed.posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={feed.refreshing}
            onRefresh={feed.refresh}
            tintColor={colors.gold}
          />
        }
        onEndReached={feed.loadMore}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <View style={styles.header}>
            <Wordmark compact />
            <Text style={styles.kicker}>{kicker}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.blurb}>{blurb}</Text>
            {feed.total ? (
              <Text style={styles.count}>
                {feed.total} {feed.total === 1 ? 'piece' : 'pieces'} from the live desk
              </Text>
            ) : null}
          </View>
        }
        renderItem={({ item, index }) => <PostCard post={item} hero={index === 0} />}
        ListEmptyComponent={
          feed.loading ? (
            <LoadingBlock />
          ) : (
            <EmptyState
              title="Nothing from this desk yet"
              body={feed.error ?? 'Pull to refresh, or try another section.'}
              onRetry={feed.retry}
            />
          )
        }
        ListFooterComponent={
          feed.loadingMore ? <ActivityIndicator color={colors.gold} style={{ margin: 16 }} /> : null
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 18, paddingBottom: 40 },
  header: { marginBottom: 18, gap: 6 },
  kicker: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginTop: 12,
    fontFamily: fonts.serif,
  },
  title: { color: colors.text, fontSize: 30, fontFamily: fonts.serif, fontWeight: '700' },
  blurb: { color: colors.muted, fontSize: 15, lineHeight: 22, fontFamily: fonts.serif },
  count: { color: colors.creamMuted, fontSize: 12, marginTop: 4 },
});
