import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIVITIES_DATA, CATEGORIES } from '../src/data/activitiesData.js';
import { KNOWLEDGE_CHECKS } from '../src/data/knowledgeChecks.js';
import { normalizeCompletedIds, addCompletedId } from '../src/utils/progress.js';
const ids = ACTIVITIES_DATA.map((item) => item.id);

test('25 expected routes: homepage and 24 activities', () => {
  assert.equal(ACTIVITIES_DATA.length, 24);
  assert.equal(new Set(ACTIVITIES_DATA.map(a => a.route)).size, 24);
  assert.ok(ACTIVITIES_DATA.every(a => a.route === `/activities/${a.slug}`));
});

test('every activity has a distinct numeric ID, from 1 to 24', () => {
  assert.deepEqual([...ids].sort((a,b)=>a-b), Array.from({ length: 24 }, (_,i)=>i+1));
});

test('every activity category is supported by the homepage filters', () => {
  assert.equal(CATEGORIES[0], 'All');
  assert.ok(ACTIVITIES_DATA.every(a => CATEGORIES.includes(a.category)));
});

test('every activity has an answerable educational question', () => {
  assert.equal(Object.keys(KNOWLEDGE_CHECKS).length, 24);
  for (const id of ids) {
    const item = KNOWLEDGE_CHECKS[id];
    assert.ok(item && item.question && item.explanation, `Activity ${id} is missing question`);
    assert.ok(Array.isArray(item.options) && item.options.length >= 2);
    assert.ok(Number.isInteger(item.correctIndex));
    assert.ok(item.correctIndex >= 0 && item.correctIndex < item.options.length);
    assert.equal(new Set(item.options).size, item.options.length);
  }
});

test('normalizeCompletedIds rejects malformed progress values', () => {
  assert.deepEqual(normalizeCompletedIds(null, ids), []);
  assert.deepEqual(normalizeCompletedIds('1,2', ids), []);
  assert.deepEqual(normalizeCompletedIds([1, 1, 25, -1, '3', 2], ids), [1, 2]);
});

test('addCompletedId is idempotent, and rejects IDs outside catalogue', () => {
  assert.deepEqual(addCompletedId([3], 3, ids), [3]);
  assert.deepEqual(addCompletedId([3], 4, ids), [3, 4]);
  assert.deepEqual(addCompletedId([3], 99, ids), [3]);
});
