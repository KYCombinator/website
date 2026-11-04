// Runs only after the authorized production deployment, with its existing session
// signing key. No login emails are sent and no credentials or nominations logged.
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const jwt = require('jsonwebtoken');
const base = 'https://kycombinator.com';
const secret = process.env.ADMIN_JWT_SECRET;
assert(secret, 'Production verification requires the configured session key');
const marker = `LOUIES_DEPLOYMENT_TEST_${randomUUID()}`;
const token = role => jwt.sign({ email: 'deployment-check@kycombinator.com', role }, secret, { expiresIn: '5m' });
const adminHeaders = { Cookie: `kyx_session=${token('admin')}` };
async function adminRecords() {
  const response = await fetch(`${base}/api/admin/louies`, { headers: adminHeaders, cache: 'no-store' });
  assert.equal(response.status, 200, 'Authorized administrator retrieval');
  return response.json();
}
(async () => {
  let attempted = false;
  try {
    const page = await fetch(`${base}/events/louies/2026`);
    assert.equal(page.status, 200);
    const html = await page.text();
    for (const label of ['The LOUIES 2026.', 'Comeback Kid', 'Bench Builder', 'Early Adopter', 'The Middle-Out', 'The Dinesh &amp; Gilfoyle', 'Most School Spirit', 'Submit nominations', 'Popularity Contest', 'Class President', 'The Kelly Kapoor Fashion Show at Lunch Award', 'Dan', 'Jack', 'Rachel']) assert(html.includes(label));
    for (const removed of ['The Drip-loma', 'Future Founders', 'Spouse of the Year', 'Exits in 2026', 'RIP Award', 'Best Community Operator']) assert(!html.includes(removed), 'Removed award is not offered');
    assert(html.includes('co-founder or early-stage employee'), 'Assistant award eligibility is clear');
    assert(html.includes('Bench Builder'), 'Bench Builder remains available');
    assert(html.includes('Why do they deserve this Louie? (optional)'), 'Reason is labeled optional');
    assert(html.includes('Nominees can be anyone in the community'), 'Community eligibility guidance is clear');
    assert(html.includes('Add another nominee') && html.includes('Skip any you like'));
    const anonymous = await fetch(`${base}/api/admin/louies`);
    assert.equal(anonymous.status, 401);
    const member = await fetch(`${base}/api/admin/louies`, { headers: { Cookie: `kyx_session=${token('member')}` } });
    assert.equal(member.status, 401);
    const privatePage = await fetch(`${base}/admin/louies`, { redirect: 'manual' });
    assert.equal(privatePage.status, 307);
    // Confirm authenticated retrieval and cleanup work before creating test data.
    const initial = await adminRecords();
    const probe = randomUUID();
    assert(!initial.some(r => r.id === probe));
    const cleanupProbe = await fetch(`${base}/api/admin/louies?id=${probe}`, { method: 'DELETE', headers: adminHeaders });
    assert.equal(cleanupProbe.status, 204);
    const invalid = await fetch(`${base}/api/louies/nominate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    assert.equal(invalid.status, 400);
    attempted = true;
    for (const favoriteKyxLead of ['Rachel', undefined]) {
    const submit = await fetch(`${base}/api/louies/nominate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      name: marker, favoriteKyxLead, email: 'louies-test@example.invalid', website: '',
      nominations: ['middle-out', 'middle-out', 'dinesh-gilfoyle', 'most-school-spirit', 'drip-loma'].map((awardId, index) => ({ awardId, nominee: `${marker}_${index}`, ...(favoriteKyxLead ? { organization: 'Automated deployment verification — remove', reason: 'Temporary test to verify persistence and administrator retrieval. Not a real nomination.' } : {}) })),
    }) });
    assert.equal(submit.status, 200);
    const receipt = await submit.json();
    assert.equal(receipt.ok, true);
    const saved = (await adminRecords()).find(r => r.id === receipt.id && r.name === marker);
    assert(saved, 'Submission persists and is retrievable by administrator');
    assert.equal(saved.nominations[0].nominee, `${marker}_0`);
    assert.equal(saved.nominations[1].nominee, `${marker}_1`);
    if (!favoriteKyxLead) {
      assert.equal(saved.nominations[0].reason, '', 'Name-only nomination persists without reason');
      assert.equal(saved.nominations[0].organization, '', 'Name-only nomination persists without organization');
    }
    assert.deepEqual(saved.nominations.map(n => n.awardId), ['middle-out', 'middle-out', 'dinesh-gilfoyle', 'most-school-spirit', 'drip-loma']);
    assert.equal(saved.favoriteKyxLead, favoriteKyxLead, 'Optional lead vote persists correctly');
    const dashboard = await fetch(`${base}/admin/louies`, { headers: adminHeaders, cache: 'no-store' });
    assert.equal(dashboard.status, 200);
    const dashboardHtml = (await dashboard.text()).replace(/<!--[\s\S]*?-->/g, "");
    for (let index = 0; index < 5; index++) assert(dashboardHtml.includes(`${marker}_${index}`), 'Administrator dashboard displays every nominee');
    if (!favoriteKyxLead) assert(dashboardHtml.includes('No reason provided'), 'Admin supports name-only nominations');
    assert(dashboardHtml.includes(`Class President · Popularity Contest: ${favoriteKyxLead || 'No vote'}`), 'Administrator dashboard displays the vote');
    }
    console.log('PASS: live public form, input validation, persisted multiple and name-only nominations with and without lead vote, admin API and dashboard, anonymous/member denial');
  } finally {
    if (attempted) {
      // Locate by unique marker even if the submission response was lost.
      const tests = (await adminRecords()).filter(r => r.name === marker);
      for (const record of tests) {
        const response = await fetch(`${base}/api/admin/louies?id=${encodeURIComponent(record.id)}`, { method: 'DELETE', headers: adminHeaders });
        assert.equal(response.status, 204, `Cleanup failed for test record ${record.id}`);
      }
      assert(!(await adminRecords()).some(r => r.name === marker), 'Test record cleanup verified');
      console.log('PASS: temporary production test records removed');
    }
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
