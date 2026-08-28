import { useCallback, useEffect, useState } from 'react';

import { fetchPosts } from '@/src/api/ghost';
import type { ClassifiedPost } from '@/src/types';

export function usePosts(filter: string, limit = 12) {
  const [posts, setPosts] = useState<ClassifiedPost[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (nextPage = 1, mode: 'replace' | 'append' | 'refresh' = 'replace') => {
      if (mode === 'refresh') setRefreshing(true);
      else if (mode === 'append') setLoadingMore(true);
      else setLoading(true);
      setError(null);
      try {
        const result = await fetchPosts({ filter, page: nextPage, limit });
        setPosts((current) => (mode === 'append' ? [...current, ...result.posts] : result.posts));
        setPage(result.page);
        setPages(result.pages);
        setTotal(result.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load UAO intelligence.');
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [filter, limit],
  );

  useEffect(() => {
    load(1, 'replace');
  }, [load]);

  return {
    posts,
    page,
    pages,
    total,
    loading,
    refreshing,
    loadingMore,
    error,
    refresh: () => load(1, 'refresh'),
    loadMore: () => {
      if (loading || loadingMore || page >= pages) return;
      load(page + 1, 'append');
    },
    retry: () => load(1, 'replace'),
  };
}
