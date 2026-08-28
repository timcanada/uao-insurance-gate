#!/usr/bin/env node
/**
 * Live-desk verification: the app must be able to load the same
 * public Ghost library that powers universalassetowners.com.
 */
const API = 'https://universal-asset-owners.ghost.io/ghost/api/content';
const KEY = '4cb0118527b7b2a473e665856a';

const FILTERS = {
  dailyBrief: 'tag:hash-daily-brief',
  probabilityDesk: 'tag:hash-probability-desk',
  research: 'tag:hash-research',
  charts: 'tag:hash-chart',
  video: 'tag:hash-video-briefing',
  podcast: 'tag:hash-podcast',
};

async function fetchPosts(filter, limit = 1) {
  const url = new URL(`${API}/posts/`);
  url.searchParams.set('key', KEY);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('include', 'tags,authors');
  if (filter) url.searchParams.set('filter', filter);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${filter || 'latest'} failed: ${response.status}`);
  return response.json();
}

function requireTitle(data, label) {
  const post = data.posts?.[0];
  if (!post?.title) throw new Error(`${label} returned no title`);
  if (!post.url?.includes('universalassetowners.com')) {
    throw new Error(`${label} url is not on the public site: ${post.url}`);
  }
  console.log(`ok  ${label.padEnd(18)} ${data.meta.pagination.total}  ${post.title}`);
}

const results = [];
for (const [label, filter] of Object.entries(FILTERS)) {
  const data = await fetchPosts(filter);
  requireTitle(data, label);
  results.push(data.meta.pagination.total);
}

const latest = await fetchPosts('', 1);
requireTitle(latest, 'latest');

if (results.some((total) => total < 1)) {
  throw new Error('A required desk returned zero posts');
}

console.log('ok  live Ghost desks match the website');
