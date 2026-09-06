import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isJustIn, mergeWire, type WireItem } from '../src/api/wire.ts';
import {
  hitsWatch,
  itemFlowLabel,
  itemNameIds,
  parseLastOpen,
  printedSinceOpen,
  visibleWire,
} from '../src/lib/wire-desk.ts';

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

const cpp: WireItem = {
  id: 'cpp',
  desk: 'UAO',
  source: 'The Universal Owner',
  title: 'CPP Investments reopens a CIO hunt after one finalist joins a rival',
  publishedAt: '2026-09-06T18:00:00.000Z',
  summary: 'A mandate, not gossip.',
};
const fed: WireItem = {
  id: 'fed',
  desk: 'OFFICIAL',
  source: 'Federal Reserve',
  title: 'Federal Reserve announces enforcement action',
  publishedAt: '2026-09-06T19:10:00.000Z',
};
const brent: WireItem = {
  id: 'brent',
  desk: 'UAO',
  source: 'The Probability Desk',
  title: 'Does Brent print $100 by 30 September?',
  publishedAt: '2026-09-06T16:00:00.000Z',
};

describe('name-level wire', () => {
  it('defaults the book to watched names, not the newspaper', () => {
    assert.deepEqual(itemNameIds(cpp), ['cpp']);
    assert.equal(hitsWatch(cpp, ['cpp', 'nbim']), true);
    assert.equal(hitsWatch(brent, ['cpp', 'nbim']), false);
    const mine = visibleWire([cpp, fed, brent], 'ALL', 'WATCH', ['cpp', 'calpers', 'nbim']);
    assert.deepEqual(mine.map((item) => item.id), ['cpp']);
    const onlyCpp = visibleWire([cpp, fed, brent], 'ALL', 'cpp', ['cpp']);
    assert.deepEqual(onlyCpp.map((item) => item.id), ['cpp']);
  });

  it('labels owner-side flows and keeps the rest of the wire unlabelled', () => {
    assert.equal(itemFlowLabel(cpp), 'Appointment');
    assert.equal(itemFlowLabel(fed), null);
    const flows = visibleWire([cpp, fed, brent], 'FLOWS', 'ALL', ['cpp']);
    assert.deepEqual(flows.map((item) => item.id), ['cpp']);
  });

  it('surfaces a name print only after the last open, never as theatre', () => {
    assert.equal(parseLastOpen(null), null);
    assert.equal(printedSinceOpen([cpp], ['cpp'], null).length, 0);
    const before = Date.parse('2026-09-06T17:00:00.000Z');
    const after = Date.parse('2026-09-06T20:00:00.000Z');
    assert.equal(printedSinceOpen([cpp, brent], ['cpp'], before)[0]?.id, 'cpp');
    assert.equal(printedSinceOpen([cpp], ['cpp'], after).length, 0);
  });
});
