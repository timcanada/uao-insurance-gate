export const LIVE_ENDPOINT = 'https://uao-live-production.up.railway.app/';
export const LIVE_WATCH = 'https://www.youtube.com/@UniversalOwners/live';

export type LiveStatus = {
  live: boolean;
  videoId: string | null;
  title: string | null;
  watchUrl: string;
  checkedAt?: string;
};

export function liveEmbedUrl(videoId: string, autoplay = true): string {
  return (
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` +
    `?autoplay=${autoplay ? '1' : '0'}&mute=1&playsinline=1&rel=0&modestbranding=1`
  );
}

export function normalizeLiveStatus(data: Partial<LiveStatus> | null | undefined): LiveStatus {
  return {
    live: Boolean(data?.live && data.videoId),
    videoId: data?.videoId ?? null,
    title: data?.title ?? null,
    watchUrl: data?.watchUrl || LIVE_WATCH,
    checkedAt: data?.checkedAt,
  };
}

export function livePlayerState(
  status: LiveStatus,
  dismissedVideoId: string | null,
  announcedVideoId: string | null,
): { showPlayer: boolean; showAlert: boolean } {
  if (!status.live || !status.videoId || status.videoId === dismissedVideoId) {
    return { showPlayer: false, showAlert: false };
  }
  return {
    showPlayer: true,
    showAlert: status.videoId !== announcedVideoId,
  };
}

export function briefAlertState(
  latestId: string | undefined,
  lastSeenId: string | null,
): { storeId: string | null; showAlert: boolean } {
  if (!latestId) return { storeId: lastSeenId, showAlert: false };
  if (!lastSeenId) return { storeId: latestId, showAlert: false };
  return { storeId: latestId, showAlert: latestId !== lastSeenId };
}

export async function fetchLiveStatus(): Promise<LiveStatus> {
  const response = await fetch(LIVE_ENDPOINT, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    return normalizeLiveStatus(null);
  }
  return normalizeLiveStatus((await response.json()) as LiveStatus);
}
