export function normalizeCompletedIds(raw, validIds) {
  if (!Array.isArray(raw)) return [];
  const allowed = new Set(validIds);
  return [...new Set(raw.filter((id) => Number.isInteger(id) && allowed.has(id)))];
}

export function addCompletedId(current, id, validIds) {
  const safe = normalizeCompletedIds(current, validIds);
  return validIds.includes(id) && !safe.includes(id) ? [...safe, id] : safe;
}
