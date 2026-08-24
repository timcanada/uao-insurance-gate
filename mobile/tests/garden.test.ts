import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  canMintPeer,
  canPost,
  consumerInbox,
  keepNotes,
  mintPeerCode,
  normalizeInvite,
  sanitizeNote,
  seatLabel,
  seatStatus,
  validInvite,
  type Member,
  type RoomNote,
} from '../src/lib/garden.ts';

const seated: Member = {
  email: 'cio@pension.ca',
  institution: 'Public pension',
  role: 'CIO',
  via: 'UAO-DESK',
  at: 1,
  status: 'seated',
};

const pending: Member = {
  email: 'cio@pension.ca',
  institution: 'Public pension',
  role: 'CIO',
  via: 'application',
  at: 1,
  status: 'pending',
};

describe('invites', () => {
  it('accepts house codes, case-insensitive', () => {
    assert.equal(validInvite('uao-desk'), true);
    assert.equal(validInvite('UAO-BOOK'), true);
    assert.equal(validInvite(' UAO-IC-2026 '), true);
  });

  it('accepts well-formed peer codes and rejects theatre', () => {
    assert.equal(validInvite('UAO-PEER-A7K3'), true);
    assert.equal(validInvite('uao-peer-a7k3'), true);
    assert.equal(validInvite('guest'), false);
    assert.equal(validInvite('UAO-PEER'), false);
    assert.equal(validInvite('UAO-PEER-IO01'), false);
  });

  it('mints a format-valid peer code', () => {
    const code = mintPeerCode(1_787_597_000_000);
    assert.equal(validInvite(code), true);
    assert.match(code, /^UAO-PEER-[A-Z2-9]{4}$/);
  });

  it('normalizes spaces', () => {
    assert.equal(normalizeInvite('uao desk'), 'UAODESK');
  });
});

describe('seats', () => {
  it('application does not grant the floor', () => {
    assert.equal(canPost(pending), false);
    assert.equal(canPost(seated), true);
    assert.equal(canPost(null), false);
    assert.equal(seatStatus(pending), 'pending');
  });

  it('legacy house-code records still seat', () => {
    const legacy = { ...seated, status: undefined as unknown as Member['status'] };
    assert.equal(seatStatus({ ...legacy, via: 'UAO-BOOK' }), 'seated');
    assert.equal(seatStatus({ ...legacy, via: 'application' }), 'pending');
  });

  it('one peer code per seated member', () => {
    assert.equal(canMintPeer(seated), true);
    assert.equal(canMintPeer({ ...seated, peerCode: 'UAO-PEER-A7K3' }), false);
    assert.equal(canMintPeer(pending), false);
  });

  it('labels the seat by mandate, never the inbox', () => {
    assert.equal(seatLabel(seated), 'Public pension · CIO');
    assert.ok(!seatLabel(seated).includes('@'));
  });

  it('flags consumer inboxes for later review, not mockery', () => {
    assert.equal(consumerInbox('cio@cpp.ca'), false);
    assert.equal(consumerInbox('tim@gmail.com'), true);
    assert.equal(consumerInbox('timothy_peters@hotmail.com'), true);
  });
});

describe('notes', () => {
  it('strips markup and caps the note', () => {
    assert.equal(sanitizeNote('  <b>hello</b>  world  '), 'hello world');
    assert.equal(sanitizeNote('x'.repeat(500)).length, 400);
  });

  it('keeps the last eighty notes', () => {
    const notes = Array.from({ length: 90 }, (_, i) => ({
      who: 'Seat',
      text: String(i),
      at: String(i),
    })) as RoomNote[];
    const kept = keepNotes(notes);
    assert.equal(kept.length, 80);
    assert.equal(kept[0].text, '10');
  });
});
