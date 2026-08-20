import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  classifyDesk,
  classifyFormat,
  classifyPost,
  formatLabel,
  searchFilter,
} from '../src/lib/classify';
import { isWorkEmail } from '../src/lib/format';
import { portalSignupUrl } from '../src/api/subscribe';
import type { GhostPost } from '../src/types';

function post(partial: Partial<GhostPost> & { tags?: { slug: string }[] }): GhostPost {
  const tags = (partial.tags ?? []).map((tag, index) => ({
    id: String(index),
    name: tag.slug,
    slug: tag.slug,
  }));
  const { tags: _ignored, ...rest } = partial;
  return {
    id: '1',
    slug: 'test',
    title: 'Test',
    published_at: '2026-08-19T12:00:00.000Z',
    url: 'https://www.universalassetowners.com/test/',
    tags,
    ...rest,
  };
}

describe('classifyDesk', () => {
  it('maps daily-brief tags to The Universal Owner', () => {
    assert.equal(classifyDesk(post({ tags: [{ slug: 'hash-daily-brief' }] })), 'universal-owner');
  });

  it('maps probability-desk tags to the afternoon desk', () => {
    assert.equal(
      classifyDesk(post({ tags: [{ slug: 'hash-probability-desk' }] })),
      'probability-desk',
    );
  });

  it('maps research tags to UAO Research', () => {
    assert.equal(classifyDesk(post({ tags: [{ slug: 'hash-research' }] })), 'research');
  });
});

describe('classifyFormat', () => {
  it('prefers listen over other formats', () => {
    assert.equal(
      classifyFormat(post({ tags: [{ slug: 'hash-podcast' }, { slug: 'hash-chart' }] })),
      'listen',
    );
  });

  it('maps video briefings to watch', () => {
    assert.equal(classifyFormat(post({ tags: [{ slug: 'hash-video-briefing' }] })), 'watch');
  });

  it('maps charts to chart', () => {
    assert.equal(classifyFormat(post({ tags: [{ slug: 'chart-of-the-day' }] })), 'chart');
  });

  it('defaults to read', () => {
    assert.equal(classifyFormat(post({ tags: [{ slug: 'hash-daily-brief' }] })), 'read');
  });
});

describe('classifyPost', () => {
  it('exposes a desk kicker and excerpt summary', () => {
    const classified = classifyPost(
      post({
        custom_excerpt: 'Four gaps opened this week.',
        tags: [{ slug: 'hash-daily-brief' }],
      }),
    );
    assert.equal(classified.kicker, 'The Universal Owner');
    assert.equal(classified.summary, 'Four gaps opened this week.');
    assert.equal(formatLabel(classified.format), 'Read');
  });
});

describe('searchFilter', () => {
  it('builds a Ghost title filter and strips quotes', () => {
    assert.equal(searchFilter("Hormuz's ships"), "title:~'Hormuzs ships'");
    assert.equal(searchFilter('   '), '');
  });
});

describe('isWorkEmail', () => {
  it('accepts institutional addresses and rejects consumer inboxes', () => {
    assert.equal(isWorkEmail('cio@cppinvestments.com'), true);
    assert.equal(isWorkEmail('not-an-email'), false);
    assert.equal(isWorkEmail('reader@gmail.com'), false);
  });
});

describe('portalSignupUrl', () => {
  it('opens the same Ghost portal as the website', () => {
    assert.equal(
      portalSignupUrl('cio@fund.example'),
      'https://www.universalassetowners.com/#/portal/signup?email=cio%40fund.example',
    );
  });
});
