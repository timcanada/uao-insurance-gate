import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  briefAlertState,
  liveEmbedUrl,
  livePlayerState,
  normalizeLiveStatus,
} from '../src/api/live.ts';

describe('liveEmbedUrl', () => {
  it('matches the website YouTube-nocookie player with autoplay', () => {
    assert.equal(
      liveEmbedUrl('abc123XYZ'),
      'https://www.youtube-nocookie.com/embed/abc123XYZ?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1',
    );
  });
});

describe('normalizeLiveStatus', () => {
  it('requires both live and a video id', () => {
    assert.equal(normalizeLiveStatus({ live: true, videoId: null }).live, false);
    assert.equal(normalizeLiveStatus({ live: true, videoId: 'abc' }).live, true);
  });
});

describe('livePlayerState', () => {
  const onAir = { live: true, videoId: 'abc', title: 'Desk', watchUrl: 'https://example.com' };

  it('shows the player and one alert when a new stream starts', () => {
    assert.deepEqual(livePlayerState(onAir, null, null), { showPlayer: true, showAlert: true });
  });

  it('keeps the player without repeating the alert', () => {
    assert.deepEqual(livePlayerState(onAir, null, 'abc'), { showPlayer: true, showAlert: false });
  });

  it('hides everything after the viewer dismisses this video', () => {
    assert.deepEqual(livePlayerState(onAir, 'abc', 'abc'), { showPlayer: false, showAlert: false });
  });
});

describe('briefAlertState', () => {
  it('stores the first brief silently', () => {
    assert.deepEqual(briefAlertState('brief-1', null), { storeId: 'brief-1', showAlert: false });
  });

  it('pops when a newer brief id appears', () => {
    assert.deepEqual(briefAlertState('brief-2', 'brief-1'), { storeId: 'brief-2', showAlert: true });
  });

  it('does not pop for the same brief', () => {
    assert.deepEqual(briefAlertState('brief-1', 'brief-1'), { storeId: 'brief-1', showAlert: false });
  });
});
