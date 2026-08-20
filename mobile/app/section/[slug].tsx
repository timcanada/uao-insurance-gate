import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { Feed } from '@/src/components/Feed';
import { EmptyState, Screen } from '@/src/components/Ui';
import { PEOPLE, THEMES } from '@/src/lib/classify';

export default function SectionScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const section = [...THEMES, ...PEOPLE].find((item) => item.slug === slug);

  useEffect(() => {
    if (section) navigation.setOptions({ title: section.title });
  }, [navigation, section]);

  if (!section) {
    return (
      <Screen>
        <EmptyState title="Section not found" body="This theme or institution desk is not mapped." />
      </Screen>
    );
  }

  return (
    <Feed
      filter={section.filter}
      kicker={section.kicker}
      title={section.title}
      blurb={section.blurb}
    />
  );
}
