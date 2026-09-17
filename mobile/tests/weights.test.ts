import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatDelta, gridDelta, parseDeskGrid, parseDeskWeights, weightDelta } from '../src/lib/weights.ts';

describe('parseDeskWeights', () => {
  it('reads the house split and ignores other percents', () => {
    const html =
      'The Desk puts 58% on a $100 print. Desk split 42/36/22 against the model. BASE 35%.';
    assert.deepEqual(parseDeskWeights(html), { base: 42, upside: 36, tail: 22 });
    assert.equal(parseDeskWeights('Markets are volatile — here is 12%'), null);
    assert.equal(
      parseDeskWeights("The base case in the Desk's single most likely path (27%). UPSIDE talk. TAIL risk."),
      null,
    );
  });
});

describe('weightDelta', () => {
  it('prints the move versus the last stored book', () => {
    const next = { base: 42, upside: 36, tail: 22 };
    assert.equal(weightDelta(null, next), null);
    assert.deepEqual(weightDelta({ base: 40, upside: 38, tail: 22 }, next), {
      base: 2,
      upside: -2,
      tail: 0,
    });
    assert.equal(formatDelta(2), '+2');
    assert.equal(formatDelta(0), 'unch');
  });
});

describe('parseDeskGrid', () => {
  it('reads the stated 5% grid and ignores the futures strip that follows', () => {
    const html =
      'Desk stated (5% grid) 5% 10% 35% 30% 20% Futures, 11 Sep <1% 1% 15% 51% 33%';
    assert.deepEqual(parseDeskGrid(html), [5, 10, 35, 30, 20]);
    assert.equal(parseDeskGrid('Markets are volatile — here is 12%'), null);
    assert.equal(parseDeskGrid('Desk stated (5% grid) 5% 10% 35% 30% 21%'), null);
    assert.deepEqual(
      parseDeskGrid(
        'Desk stated (5% grid) 5% 10% 35% 30% 20% Futures, 11 Sep &lt;1% 1% 15% 51% 33% Polymarket end-2026 upper bound, 14 Sep 4% 7% 36% 36%',
      ),
      [5, 10, 35, 30, 20],
    );
  });
});

describe('gridDelta', () => {
  it('prints the move versus the last stored grid', () => {
    const next = [5, 10, 35, 30, 20];
    assert.equal(gridDelta(null, next), null);
    assert.deepEqual(gridDelta([10, 10, 30, 30, 20], next), [-5, 0, 5, 0, 0]);
  });
});
