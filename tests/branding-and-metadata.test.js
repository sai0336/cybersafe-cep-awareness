import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const load = (file) => readFileSync(new URL(file, root), 'utf8');

test('developer profile links and safe external link attributes exist in shared footer', () => {
  const footer = load('src/components/Footer.jsx');
  assert.match(footer, /https:\/\/github\.com\/sai0336/);
  assert.match(footer, /https:\/\/www\.linkedin\.com\/in\/sai-santosh-chavan\//);
  assert.match(footer, /rel="noopener noreferrer"/);
  assert.match(footer, /new Date\(\)\.getFullYear\(\)/);
  assert.match(footer, /© \{year\} Sai Chavan/);
});

test('homepage contains developer attribution and both social profiles', () => {
  const home = load('src/pages/HomePage.jsx');
  assert.match(home, /Designed &amp; developed by/);
  assert.match(home, /https:\/\/github\.com\/sai0336/);
  assert.match(home, /https:\/\/www\.linkedin\.com\/in\/sai-santosh-chavan\//);
});

test('browser metadata references author and actual favicon', () => {
  const html = load('index.html');
  assert.match(html, /<meta name="author" content="Sai Chavan"/);
  assert.match(html, /href="\/favicon\.svg"/);
  assert.ok(existsSync(new URL('public/favicon.svg', root)));
});

test('official reporting resource has outbound link', () => {
  const footer = load('src/components/Footer.jsx');
  assert.match(footer, /https:\/\/cybercrime\.gov\.in\//);
  assert.match(footer, /href="tel:1930"/);
});
