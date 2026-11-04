const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  const filename = path.resolve(file);
  if (cache.has(filename)) return cache.get(filename);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  const localRequire = name => name.startsWith('@/') ? load('src/' + name.slice(2) + '.ts') : require(name);
  new Function('require', 'module', 'exports', source)(localRequire, module, module.exports);
  cache.set(filename, module.exports);
  return module.exports;
}
const { awards2026, nominationsOpen } = load('src/data/louies2026.ts');
const { nominationSchema } = load('src/lib/louiesValidation.ts');
assert.equal(nominationsOpen, true, 'Public collection is approved');
assert.equal(awards2026.length, 23);
assert.equal(new Set(awards2026.map(a => a.id)).size, 23);
for (const name of ['Comeback Kid', 'Bench Builder', 'Early Adopter', 'Most School Spirit', 'The Middle-Out', 'The Dinesh & Gilfoyle']) assert(awards2026.some(a => a.name === name));
assert(!JSON.stringify(awards2026).match(/2025|GRIT|First Yes|Drip-loma|best.dressed/i));
const nomination = { awardId: awards2026[0].id, nominee: 'Test Nominee', organization: '', reason: 'A concrete contribution.' };
const input = { name: 'Local Test', email: 'local@example.com', nominations: [nomination] };
assert(nominationSchema.safeParse(input).success);
assert(nominationSchema.safeParse({ ...input, nominations: [nomination, { ...nomination, nominee: "Second person" }] }).success);
for (const lead of ['Dan', 'Jack', 'Rachel']) assert.equal(nominationSchema.parse({ ...input, favoriteKyxLead: lead }).favoriteKyxLead, lead);
assert.equal(nominationSchema.parse(input).favoriteKyxLead, undefined);
assert(!nominationSchema.safeParse({ ...input, favoriteKyxLead: 'Someone else' }).success);
assert(nominationSchema.safeParse({ ...input, nominations: awards2026.map(a => ({ ...nomination, awardId: a.id })) }).success);
for (const invalid of [
  { ...input, email: 'invalid' },
  { ...input, nominations: [] },

  { ...input, nominations: [{ ...nomination, awardId: 'unknown' }] },
  { ...input, nominations: [{ ...nomination, nominee: ' ' }] },
  { ...input, nominations: [{ ...nomination, reason: ' ' }] },
  { ...input, nominations: [{ ...nomination, reason: 'x'.repeat(2001) }] },
  { ...input, website: 'spam' },
]) assert(!nominationSchema.safeParse(invalid).success);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const Form = load('src/app/events/louies/2026/NominationForm.tsx').default;
const markup = renderToStaticMarkup(React.createElement(Form));
for (const award of awards2026) {
  assert(markup.includes(`name="${award.id}-0-nominee"`));
  assert(markup.includes(`name="${award.id}-0-reason"`));
}
assert.equal((markup.match(/<fieldset/g) || []).length, 25);
assert.equal((markup.match(/>Add another nominee</g) || []).length, 23);
assert(markup.includes('Skip any you like') && markup.includes('more than one person for each award'));
assert(markup.includes('Popularity Contest') && markup.includes('Class President'));
assert.equal((markup.match(/type="radio"/g) || []).length, 3);
for (const lead of ['Dan', 'Jack', 'Rachel']) assert(markup.includes(`value="${lead}"`));
assert(!/name="favoriteKyxLead"[^>]*required/.test(markup));
console.log('PASS: 23-award slate, year references, valid and invalid nominations, all form fields, collection enabled, optional lead vote, multiple nominees');
