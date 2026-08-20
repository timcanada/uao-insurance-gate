import { ScrollView, StyleSheet, Text } from 'react-native';

import { SubscribeCard } from '@/src/components/SubscribeCard';
import { Screen } from '@/src/components/Ui';
import { colors, fonts } from '@/src/theme';

export default function SubscribeScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>The morning briefing for people who allocate long-horizon capital.</Text>
        <Text style={styles.body}>
          Research, charts, video and podcast analysis — complimentary, five days a week. New
          subscribers are reviewed by the desk.
        </Text>
        <SubscribeCard />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, gap: 16 },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  body: { color: colors.muted, fontFamily: fonts.serif, fontSize: 16, lineHeight: 24 },
});
