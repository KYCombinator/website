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
const { awards2026, awardSections2026, nominationsOpen, retiredLouieNames } = load('src/data/louies2026.ts');
const { nominationSchema } = load('src/lib/louiesValidation.ts');
assert.equal(nominationsOpen, true, 'Public collection is approved');
assert.equal(awards2026.length, 19);
assert.equal(new Set(awards2026.map(a => a.id)).size, 19);
for (const name of ['Comeback Kid', 'Bench Builder', 'Early Adopter', 'Most School Spirit', 'The Middle-Out', 'The Dinesh & Gilfoyle', 'The Kelly Kapoor Fashion Show at Lunch Award']) assert(awards2026.some(a => a.name === name));
assert(!awards2026.map(a => a.name).join('|').match(/2025|GRIT|First Yes|Drip-loma|Future Founders|Spouse of the Year|Exits in|RIP Award|Best Community Operator/i));
for (const id of ['exits-2026', 'rip-2026', 'future-founders', 'spouse-of-year', 'community-operator']) assert(retiredLouieNames[id]);
const assistantAward = awards2026.find(a => a.id === 'assistant-to-founder');
assert(assistantAward.description.includes('co-founder or early-stage employee'));
const nomination = { awardId: awards2026[0].id, nominee: 'Test Nominee', organization: '', reason: 'A concrete contribution.' };
const input = { name: 'Local Test', email: 'local@example.com', nominations: [nomination] };
assert(nominationSchema.safeParse(input).success);
const nameOnly = nominationSchema.parse({ ...input, nominations: [{ awardId: nomination.awardId, nominee: 'Name only' }] });
assert.equal(nameOnly.nominations[0].reason, '');
assert.equal(nameOnly.nominations[0].organization, '');
assert(nominationSchema.safeParse({ ...input, nominations: [{ ...nomination, reason: ' ' }] }).success);
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
assert.equal((markup.match(/<fieldset/g) || []).length, 21);
assert.equal((markup.match(/>Add another nominee</g) || []).length, 19);
assert(markup.includes('Nominees can be anyone in Kentucky’s startup community'));
assert(markup.includes('Skip any you like') && markup.includes('more than one person or company for each award'));
const sections = [...markup.matchAll(/<section[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)];
assert.deepEqual(sections.map(section => section[1]), ['people-awards', 'company-awards', 'unserious-awards']);
for (const [index, section] of awardSections2026.entries()) {
  assert(sections[index][2].includes(section.name));
  for (const award of awards2026) assert.equal(sections[index][2].includes(`name="${award.id}-0-nominee"`), award.section === section.id);
}
assert(sections[2][2].includes('Class President'), 'Class President belongs in the final unserious section');
assert(assistantAward.description.includes('Open to both co-founders and early-stage employees'));
const favoriteFounderAward = awards2026.find(award => award.id === 'favorite-founder');
assert.equal(favoriteFounderAward.name, 'Louisville’s Favorite Founder');
assert.equal(favoriteFounderAward.description, 'A popularity contest for Louisville’s current favorite founder. Nominate the founder in Louisville who’s your favorite right now.');
assert(markup.includes(favoriteFounderAward.description), 'The form shows the Louisville-specific popularity contest description');
assert(!/Kentucky|represent|embod/i.test(favoriteFounderAward.description), 'Favorite Founder is about popularity in Louisville');
assert(!awards2026.some(award => award.id !== 'favorite-founder' && /Louisville/i.test(award.description)), 'Other award descriptions retain their Kentucky-wide scope');
assert(markup.includes('Popularity Contest') && markup.includes('Class President'));
assert.equal((markup.match(/type="radio"/g) || []).length, 3);
for (const lead of ['Dan', 'Jack', 'Rachel']) assert(markup.includes(`value="${lead}"`));
assert(!/name="favoriteKyxLead"[^>]*required/.test(markup));
console.log('PASS: 19-award slate, year references, valid and invalid nominations, all form fields, collection enabled, optional lead vote, multiple nominees, optional reasons');
