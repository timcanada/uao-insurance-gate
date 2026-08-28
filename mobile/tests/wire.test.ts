import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isJustIn, mergeWire, type WireItem } from '../src/api/wire.ts';

describe('mergeWire', () => {
  it('dedupes by url and sorts newest first', () => {
    const items: WireItem[] = [
      {
        id: '1',
        desk: 'UAO',
        source: 'The Universal Owner',
        title: 'Older',
        publishedAt: '2026-08-21T10:00:00.000Z',
        url: 'https://example.com/a',
      },
      {
        id: '2',
        desk: 'OFFICIAL',
        source: 'Federal Reserve',
        title: 'Newer',
        publishedAt: '2026-08-22T10:00:00.000Z',
        url: 'https://example.com/b',
      },
      {
        id: '3',
        desk: 'UAO',
        source: 'The Universal Owner',
        title: 'Older copy',
        publishedAt: '2026-08-21T12:00:00.000Z',
        url: 'https://example.com/a',
      },
    ];
    const merged = mergeWire(items);
    assert.equal(merged.length, 2);
    assert.equal(merged[0].title, 'Newer');
  });
});

describe('isJustIn', () => {
  it('flags items from the last half hour and ignores a missing stamp', () => {
    assert.equal(isJustIn(new Date().toISOString()), true);
    assert.equal(isJustIn('2020-01-01T00:00:00.000Z'), false);
    assert.equal(isJustIn(''), false);
    assert.equal(isJustIn(undefined), false);
  });
});
