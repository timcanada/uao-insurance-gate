import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isAllocatorGrade, nameHits } from '../src/lib/names.ts';

describe('nameHits', () => {
  it('finds house names and ignores loose substrings', () => {
    assert.deepEqual(nameHits('KIC reopens CIO hunt after one finalist joins NPS').map((n) => n.id), [
      'kic',
    ]);
    assert.equal(nameHits('A logical path for credit').length, 0);
    assert.equal(nameHits('Hormuz traffic and the 30-year').map((n) => n.id).join(','), 'hormuz,30y');
  });
});

describe('isAllocatorGrade', () => {
  it('drops MarketBeat theatre and keeps a name print', () => {
    assert.equal(
      isAllocatorGrade({
        title: 'Callan Family Office LLC Makes New Investment in Everest Group, Ltd. $EG - MarketBeat',
      }),
      false,
    );
    assert.equal(isAllocatorGrade({ title: 'KIC reopens CIO hunt after one finalist joins rival fund' }), true);
    assert.equal(isAllocatorGrade({ title: 'Should Trump create an AI sovereign wealth fund?' }), false);
  });
});
