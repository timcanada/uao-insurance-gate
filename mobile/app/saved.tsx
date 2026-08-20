import { FlatList, StyleSheet, View } from 'react-native';

import { EmptyState, PostCard, Screen } from '@/src/components/Ui';
import { useBookmarks } from '@/src/hooks/useBookmarks';

export default function SavedScreen() {
  const { saved, ready } = useBookmarks();
  return (
    <Screen>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={
          ready ? (
            <EmptyState
              title="No saved briefings yet"
              body="Open any brief and tap Save to keep it on this device."
            />
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 18, paddingBottom: 40 },
});
