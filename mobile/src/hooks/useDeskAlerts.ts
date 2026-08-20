import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { fetchPosts } from '@/src/api/ghost';
import {
  briefAlertState,
  fetchLiveStatus,
  livePlayerState,
  type LiveStatus,
} from '@/src/api/live';
import { FILTERS } from '@/src/lib/classify';
import type { ClassifiedPost } from '@/src/types';

const BRIEF_KEY = 'uao.lastBriefId';
const LIVE_DISMISS = 'uao.liveDismissed';

export type DeskAlertsValue = {
  live: LiveStatus | null;
  showPlayer: boolean;
  liveAlert: boolean;
  briefAlert: ClassifiedPost | null;
  dismissLiveAlert: () => void;
  hideLivePlayer: () => Promise<void>;
  dismissBrief: () => void;
  refresh: () => Promise<void>;
};

export const DeskAlertsContext = createContext<DeskAlertsValue | null>(null);

export function useDeskAlertsContext(): DeskAlertsValue | null {
  return useContext(DeskAlertsContext);
}

export function useDeskAlerts(): DeskAlertsValue {
  const [live, setLive] = useState<LiveStatus | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [briefAlert, setBriefAlert] = useState<ClassifiedPost | null>(null);
  const [liveAlert, setLiveAlert] = useState(false);
  const announcedVideoId = useRef<string | null>(null);
  const liveRef = useRef<LiveStatus | null>(null);

  const dismissLiveAlert = useCallback(() => {
    setLiveAlert(false);
    if (liveRef.current?.videoId) announcedVideoId.current = liveRef.current.videoId;
  }, []);

  const hideLivePlayer = useCallback(async () => {
    setLiveAlert(false);
    setShowPlayer(false);
    const videoId = liveRef.current?.videoId;
    if (videoId) {
      announcedVideoId.current = videoId;
      await AsyncStorage.setItem(LIVE_DISMISS, videoId);
    }
  }, []);

  const dismissBrief = useCallback(() => setBriefAlert(null), []);

  const poll = useCallback(async () => {
    try {
      const [status, briefs] = await Promise.all([
        fetchLiveStatus(),
        fetchPosts({ filter: FILTERS.dailyBrief, limit: 1 }),
      ]);
      liveRef.current = status;
      setLive(status);
      const dismissed = await AsyncStorage.getItem(LIVE_DISMISS);
      const next = livePlayerState(status, dismissed, announcedVideoId.current);
      setShowPlayer(next.showPlayer);
      if (next.showAlert) {
        if (status.videoId) announcedVideoId.current = status.videoId;
        setLiveAlert(true);
      } else if (!status.live) {
        setLiveAlert(false);
        announcedVideoId.current = null;
      }

      const latest = briefs.posts[0];
      const lastId = await AsyncStorage.getItem(BRIEF_KEY);
      const brief = briefAlertState(latest?.id, lastId);
      if (brief.storeId && brief.storeId !== lastId) {
        await AsyncStorage.setItem(BRIEF_KEY, brief.storeId);
      }
      if (brief.showAlert && latest) setBriefAlert(latest);
    } catch {
      /* keep the last good state */
    }
  }, []);

  useEffect(() => {
    poll();
    const id = setInterval(poll, 45000);
    return () => clearInterval(id);
  }, [poll]);

  return {
    live,
    showPlayer,
    liveAlert,
    briefAlert,
    dismissLiveAlert,
    hideLivePlayer,
    dismissBrief,
    refresh: poll,
  };
}
