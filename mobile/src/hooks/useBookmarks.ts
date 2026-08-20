import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import type { ClassifiedPost } from '@/src/types';

const KEY = 'uao.saved.v1';

export function useBookmarks() {
  const [saved, setSaved] = useState<ClassifiedPost[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setSaved(JSON.parse(raw) as ClassifiedPost[]);
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const persist = useCallback((next: ClassifiedPost[]) => {
    setSaved(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const isSaved = useCallback((id: string) => saved.some((post) => post.id === id), [saved]);

  const toggle = useCallback(
    (post: ClassifiedPost) => {
      persist(isSaved(post.id) ? saved.filter((item) => item.id !== post.id) : [post, ...saved]);
    },
    [isSaved, persist, saved],
  );

  return { saved, ready, isSaved, toggle };
}
