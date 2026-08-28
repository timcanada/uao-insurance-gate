import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { flowKind } from '../src/lib/flows.ts';
import { assemblePack, defaultLastIc, isPublicDeskCopy, parseLastIc, publishedOnOrAfter } from '../src/lib/ic.ts';
import {
  formatBp,
  latestThirtyYear,
  parseTreasuryYieldRows,
  treasuryMonthUrl,
  yieldFromCopy,
} from '../src/lib/rates.ts';
import { deskSession } from '../src/lib/session.ts';
import { lightSleeves, sleeveHits } from '../src/lib/sleeves.ts';
import { DEFAULT_WATCH, normalizeWatch, toggleWatch, watchedNames } from '../src/lib/watch.ts';

describe('isPublicDeskCopy', () => {
  it('drops QC theatre and keeps the sent brief', () => {
    assert.equal(isPublicDeskCopy('[QC — NOT SENT TO LIST] Revenue rose 18%.'), false);
    assert.equal(isPublicDeskCopy("Nvidia's customers got 15 more days to pay."), true);
  });
});

describe('assemblePack', () => {
  it('builds a board pack since the last IC and skips charts and QC', () => {
    const pack = assemblePack(
      [
        {
          id: 'qc',
          title: '[QC — NOT SENT TO LIST] Draft',
          publishedAt: '2026-08-27T12:00:00.000Z',
          source: 'TUO',
          kind: 'brief',
        },
        {
          id: 'chart',
          title: 'Chart of the day — 2026-08-27',
          publishedAt: '2026-08-27T12:00:00.000Z',
          source: 'CHT',
          kind: 'brief',
        },
        {
          id: 'old',
          title: 'Old brief',
          publishedAt: '2026-06-01T12:00:00.000Z',
          source: 'TUO',
          kind: 'brief',
        },
        {
          id: 'b1',
          title: 'Committed to a discipline, not a decision.',
          publishedAt: '2026-08-28T11:00:00.000Z',
          slug: 'discipline',
          source: 'The Universal Owner',
          kind: 'brief',
        },
        {
          id: 'd1',
          title: 'Does Brent print $100 by 30 September?',
          publishedAt: '2026-08-22T16:00:00.000Z',
          slug: 'brent',
          source: 'The Probability Desk',
          kind: 'desk',
        },
        {
          id: 'p1',
          title: 'Marcie Frost: Three Words in Blue Ink',
          publishedAt: '2026-08-22T10:00:00.000Z',
          slug: 'frost',
          source: 'People',
          kind: 'people',
        },
        {
          id: 'o1',
          title: 'Federal Reserve announces enforcement action',
          publishedAt: '2026-08-20T18:00:00.000Z',
          url: 'https://www.federalreserve.gov/x',
          source: 'Federal Reserve',
          kind: 'official',
        },
      ],
      '2026-07-29',
      12,
    );
    assert.equal(pack.some((item) => item.title.startsWith('[QC')), false);
    assert.equal(pack.some((item) => item.title.startsWith('Chart of the day')), false);
    assert.equal(pack.some((item) => item.title === 'Old brief'), false);
    assert.ok(pack.find((item) => item.kind === 'brief'));
    assert.ok(pack.find((item) => item.kind === 'desk'));
    assert.ok(pack.find((item) => item.kind === 'official'));
    assert.ok(pack[0].why.includes('board'));
  });

  it('stays standing when a kind is missing after the IC date', () => {
    const pack = assemblePack(
      [
        {
          id: 'b1',
          title: 'Committed to a discipline, not a decision.',
          publishedAt: '2026-08-28T11:00:00.000Z',
          slug: 'discipline',
          source: 'The Universal Owner',
          kind: 'brief',
        },
      ],
      '2026-08-01',
      12,
    );
    assert.equal(pack.length, 1);
    assert.equal(pack[0].kind, 'brief');
  });

  it('defaults last IC to a dated day, not theatre', () => {
    assert.equal(parseLastIc('2026-07-31'), '2026-07-31');
    assert.match(defaultLastIc(new Date('2026-08-28T12:00:00Z')), /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(publishedOnOrAfter('2026-08-01T00:00:00.000Z', '2026-08-01'), true);
    assert.equal(publishedOnOrAfter('2026-07-31T23:00:00.000Z', '2026-08-01'), false);
  });
});

describe('sleeves', () => {
  it('lights the sleeves the desk actually wrote, not a risk system', () => {
    assert.deepEqual(
      sleeveHits('The Hormuz corridor rally is pricing ships that have not sailed').map((s) => s.id),
      ['lanes'],
    );
    const lit = lightSleeves([
      { title: 'The Hormuz corridor rally is pricing ships that have not sailed' },
      { title: '38% of $15.6bn. The private-markets exit is rationed.' },
      { title: 'Does Brent print $100 by 30 September?' },
    ]);
    assert.equal(lit.find((s) => s.id === 'lanes')?.lit, true);
    assert.equal(lit.find((s) => s.id === 'credit')?.lit, true);
    assert.equal(lit.find((s) => s.id === 'energy')?.lit, true);
    assert.equal(lit.find((s) => s.id === 'dc')?.lit, false);
  });
});

describe('watch', () => {
  it('keeps a house book and ignores junk ids', () => {
    assert.deepEqual(normalizeWatch(['nope']), [...DEFAULT_WATCH]);
    assert.ok(watchedNames(toggleWatch(['cpp'], 'hormuz')).some((n) => n.id === 'hormuz'));
    assert.equal(toggleWatch(['cpp', 'hormuz'], 'hormuz').includes('hormuz'), false);
  });
});

describe('treasury 30-year', () => {
  it('reads the last two columns as 20s and 30s', () => {
    const rows = parseTreasuryYieldRows(`
      Date 1 Mo 2 Mo 3 Mo 20 Yr 30 Yr
      08/26/2026 3.80 3.79 3.81 5.17 5.18
      | 08/27/2026 | N/A | 3.81 | 5.18 | 5.19 |
    `);
    const print = latestThirtyYear(rows);
    assert.equal(print?.date, '2026-08-27');
    assert.equal(print?.yield, 5.19);
    assert.equal(print?.deltaBp, 1);
    assert.equal(formatBp(1), '+1 bp vs prior print');
    assert.match(treasuryMonthUrl(new Date('2026-08-28T16:00:00Z')), /202608/);
  });

  it('will not invent a curve; desk-note extract is labelled as such', () => {
    assert.equal(latestThirtyYear([]), null);
    const fromNote = yieldFromCopy('If the 30-year prints through 5.50%, the tail is a liability number.');
    assert.equal(fromNote?.yield, 5.5);
    assert.equal(fromNote?.source, 'desk-note');
  });
});

describe('desk session', () => {
  it('opens the official window at 08:30 and 14:00 ET', () => {
    assert.equal(deskSession(new Date('2026-08-28T11:10:00Z')).id, 'morning');
    assert.equal(deskSession(new Date('2026-08-28T12:35:00Z')).id, 'official');
    assert.equal(deskSession(new Date('2026-08-28T18:05:00Z')).id, 'official');
    assert.equal(deskSession(new Date('2026-08-28T17:10:00Z')).id, 'probability');
    assert.equal(deskSession(new Date('2026-08-28T22:40:00Z')).id, 'overnight');
  });
});

describe('owner-side flows', () => {
  it('labels a real print, never an invented RFP', () => {
    assert.equal(flowKind('KIC reopens CIO hunt after one finalist joins rival fund'), 'appointment');
    assert.equal(flowKind('38% of $15.6bn. The private-markets exit is rationed.'), 'private-markets');
    assert.equal(flowKind('A fund that is 35.8% cash'), null);
  });
});
