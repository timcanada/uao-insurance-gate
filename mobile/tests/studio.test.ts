import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { audioPlayerHtml, episodeFromRss, safeAudioUrl, showFromRss, youtubeId } from '../src/api/studio.ts';
import { applicationError, applicationMailto, canEnterHouse, validPhone } from '../src/lib/garden.ts';
import { EMPLOYER_PORTALS, JOB_BOARDS, VERIFIED_ROLES_LIVE, isHiringSignal, isHttpsUrl } from '../src/lib/house.ts';

describe('youtubeId', () => {
  it('reads a watch URL', () => {
    assert.equal(youtubeId('https://www.youtube.com/watch?v=tskuEcBLXrI'), 'tskuEcBLXrI');
    assert.equal(youtubeId('https://www.youtube.com/v/tskuEcBLXrI?version=3'), 'tskuEcBLXrI');
    assert.equal(youtubeId('https://example.com'), null);
  });
});

describe('rss adapters', () => {
  it('keeps an audio enclosure and drops a flash YouTube enclosure as audio', () => {
    const episode = episodeFromRss('The Universal Owner', {
      title: 'The promise and the timetable',
      pubDate: 'Thu, 27 Aug 2026 06:37:42 -0400',
      description: 'Nvidia revenue rose 18%.',
      enclosure: { link: 'https://mcdn.podbean.com/x.mp3', type: 'audio/mpeg', duration: 362 },
    });
    assert.equal(episode?.audio.endsWith('.mp3'), true);
    assert.equal(
      episodeFromRss('x', { title: 'v', enclosure: { link: 'https://youtube.com/v/a', type: 'application/x-shockwave-flash' } }),
      null,
    );
  });

  it('reads a studio show from a YouTube item', () => {
    const show = showFromRss({
      title: 'UAO Live — Aug. 27, 2026',
      link: 'https://www.youtube.com/watch?v=tskuEcBLXrI',
      pubDate: '2026-08-27T14:26:11+00:00',
      thumbnail: 'https://i.ytimg.com/vi/tskuEcBLXrI/hqdefault.jpg',
    });
    assert.equal(show?.videoId, 'tskuEcBLXrI');
  });
});

describe('application', () => {
  it('requires name, work email and a real phone', () => {
    assert.equal(validPhone('+1 416 555 0199'), true);
    assert.equal(validPhone('123'), false);
    assert.ok(applicationError({ name: '', email: 'cio@cpp.ca', phone: '4165550199' }));
    assert.equal(
      applicationError({
        name: 'Jane Allocator',
        email: 'cio@cpp.ca',
        phone: '4165550199',
        institution: 'CPP',
        role: 'CIO',
        why: 'The liability number.',
      }),
      null,
    );
  });
});

describe('hiring signals', () => {
  it('flags a desk-reported seat, not a retail listing', () => {
    assert.equal(isHiringSignal('KIC reopens CIO hunt after one finalist joins rival fund'), true);
    assert.equal(isHiringSignal('A fund that is 35.8% cash'), false);
  });
});

describe('the book does not invent roles', () => {
  it('tracks real employer portals over https and admits none are individually live', () => {
    assert.equal(VERIFIED_ROLES_LIVE, false);
    assert.equal(EMPLOYER_PORTALS.length, 8);
    for (const row of [...EMPLOYER_PORTALS, ...JOB_BOARDS]) {
      assert.equal(isHttpsUrl(row.href), true);
    }
  });
});

describe('in-app audio', () => {
  it('keeps Podbean https and drops anything else', () => {
    assert.ok(safeAudioUrl('https://mcdn.podbean.com/mf/web/x.mp3'));
    assert.equal(safeAudioUrl('http://mcdn.podbean.com/x.mp3'), null);
    assert.equal(safeAudioUrl('https://evil.example/x.mp3'), null);
    assert.ok(audioPlayerHtml('https://mcdn.podbean.com/x.mp3')?.includes('mcdn.podbean.com'));
  });
});

describe('house keys', () => {
  it('pending may enter the house; only seated may be treated as a record', () => {
    assert.equal(
      canEnterHouse({
        email: 'cio@cpp.ca',
        institution: 'CPP',
        role: 'CIO',
        via: 'application',
        at: 1,
        status: 'pending',
      }),
      true,
    );
    assert.equal(canEnterHouse(null), false);
    assert.match(
      applicationMailto({
        name: 'Jane Allocator',
        email: 'cio@cpp.ca',
        phone: '+1 416 555 0199',
        institution: 'CPP',
        role: 'CIO',
        why: 'The liability number.',
      }),
      /^mailto:info@universalassetowners.com\?/,
    );
  });
});
