import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/src/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This briefing is not on the desk.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Back to today’s intelligence</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.serif,
    color: colors.text,
    textAlign: 'center',
  },
  link: { marginTop: 16, paddingVertical: 12 },
  linkText: { fontSize: 15, color: colors.gold2 },
});
