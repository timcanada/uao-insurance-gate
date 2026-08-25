import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatDelta, parseDeskWeights, weightDelta } from '../src/lib/weights.ts';

describe('parseDeskWeights', () => {
  it('reads the house split and ignores other percents', () => {
    const html =
      'The Desk puts 58% on a $100 print. Desk split 42/36/22 against the model. BASE 35%.';
    assert.deepEqual(parseDeskWeights(html), { base: 42, upside: 36, tail: 22 });
    assert.equal(parseDeskWeights('Markets are volatile — here is 12%'), null);
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
