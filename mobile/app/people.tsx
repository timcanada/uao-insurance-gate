import { ScrollView, StyleSheet, Text } from 'react-native';

import { MenuRow, Screen } from '@/src/components/Ui';
import { PEOPLE } from '@/src/lib/classify';
import { colors, fonts } from '@/src/theme';

export default function PeopleScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>People and Institutions</Text>
        <Text style={styles.body}>
          Tracking the sovereign funds, pensions, endowments, family offices, asset managers,
          policymakers and allocators shaping long-horizon capital.
        </Text>
        {PEOPLE.map((section) => (
          <MenuRow
            key={section.slug}
            kicker={section.kicker}
            title={section.title}
            href={`/section/${section.slug}`}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 40 },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 28, fontWeight: '700' },
  body: {
    color: colors.muted,
    fontFamily: fonts.serif,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 12,
  },
});
