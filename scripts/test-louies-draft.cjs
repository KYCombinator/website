const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { create, act } = require('react-test-renderer');
const cache = new Map();
function load(file) {
  const filename = path.resolve(file);
  if (cache.has(filename)) return cache.get(filename);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)(name => name.startsWith('@/') ? load(`src/${name.slice(2)}.ts`) : require(name), module, module.exports);
  cache.set(filename, module.exports);
  return module.exports;
}
const { LOUIES_DRAFT_KEY, parseLouiesDraft } = load('src/lib/louiesDraft.ts');
const Form = load('src/app/events/louies/2026/NominationForm.tsx').default;
const storage = new Map();
let removals = 0;
let fetches = 0;
global.window = { localStorage: {
  getItem: key => storage.get(key) || null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => { removals++; storage.delete(key); },
} };
global.FormData = class { get() { return ''; } };
let form;
function mount() { act(() => { form = create(React.createElement(Form)); }); }
function change(name, value) { act(() => form.root.findByProps({ name }).props.onChange({ target: { value } })); }
async function submit() { await act(async () => { await form.root.findByType('form').props.onSubmit({ preventDefault() {}, currentTarget: {} }); }); }
(async () => {
  assert.throws(() => parseLouiesDraft('not-json'));
  mount();
  change('name', 'Draft Person');
  change('email', 'draft@example.invalid');
  change('middle-out-0-nominee', 'First person');
  change('middle-out-0-organization', 'First company');
  change('middle-out-0-reason', 'First reason\nwith a second line');
  const add = form.root.findAllByType('button').find(button => button.props.type === 'button' && button.findAll(node => node.type === 'span' && node.children.includes('The Middle-Out')).length);
  act(() => add.props.onClick());
  change('middle-out-1-nominee', 'Second person');
  change('middle-out-1-reason', 'Second reason');
  act(() => form.root.findByProps({ name: 'favoriteKyxLead', value: 'Jack' }).props.onChange());
  const saved = JSON.parse(storage.get(LOUIES_DRAFT_KEY));
  assert.equal(saved.name, 'Draft Person');
  assert.equal(saved.nominees['middle-out'].length, 2);
  assert.equal(saved.favoriteKyxLead, 'Jack');
  act(() => form.unmount());
  mount(); // A fresh component mount represents a page refresh.
  for (const [name, value] of Object.entries({ name: 'Draft Person', email: 'draft@example.invalid', 'middle-out-0-nominee': 'First person', 'middle-out-0-organization': 'First company', 'middle-out-0-reason': 'First reason\nwith a second line', 'middle-out-1-nominee': 'Second person', 'middle-out-1-reason': 'Second reason' })) assert.equal(form.root.findByProps({ name }).props.value, value);
  assert.equal(form.root.findByProps({ name: 'favoriteKyxLead', value: 'Jack' }).props.checked, true);
  assert.equal(fetches, 0, 'Restoration does not submit');
  global.fetch = async () => { fetches++; return { ok: false, json: async () => ({ error: 'Temporary failure' }) }; };
  await submit();
  assert(storage.has(LOUIES_DRAFT_KEY));
  assert.equal(removals, 0, 'Failure must preserve the draft');
  global.fetch = async () => ({ ok: true, json: async () => ({}) });
  await submit();
  assert(storage.has(LOUIES_DRAFT_KEY), 'Unconfirmed success must preserve the draft');
  global.fetch = async (_url, request) => {
    const payload = JSON.parse(request.body);
    assert.equal(payload.nominations.length, 2);
    assert.equal(payload.nominations[1].nominee, 'Second person');
    assert.equal(payload.favoriteKyxLead, 'Jack');
    return { ok: true, json: async () => ({ ok: true, id: 'confirmed-submission' }) };
  };
  await submit();
  assert(!storage.has(LOUIES_DRAFT_KEY), 'Confirmed success clears the draft');
  assert.equal(removals, 1);
  act(() => form.unmount());
  mount();
  assert.equal(form.root.findByProps({ name: 'name' }).props.value, '');
  assert.equal(form.root.findAllByProps({ name: 'middle-out-1-nominee' }).length, 0);
  act(() => form.unmount());
  window.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); }, removeItem() { throw new Error('blocked'); } };
  mount();
  change('name', 'Still works');
  change('email', 'local@example.invalid');
  change('middle-out-0-nominee', 'Name only');
  global.fetch = async () => ({ ok: true, json: async () => ({ ok: true, id: 'still-confirmed' }) });
  await submit();
  assert(JSON.stringify(form.toJSON()).includes('Nominations received.'));
  assert(JSON.stringify(form.toJSON()).includes('couldn’t clear the saved draft'));
  act(() => form.unmount());
  console.log('PASS: draft refresh restoration, multiple nominees, identity/reasons/vote, no autosubmit, failure retention, confirmed-success cleanup, blocked-storage handling');
})().catch(error => { console.error(error); process.exitCode = 1; });
