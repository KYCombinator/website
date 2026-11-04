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
    for (const label of ['The LOUIES 2026.', 'Comeback Kid', 'Bench Builder', 'Early Adopter', 'The Drip-loma', 'Most School Spirit', 'Submit nominations', 'Popularity Contest', 'Class President', 'Dan', 'Jack', 'Rachel']) assert(html.includes(label));
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
      nominations: ['comeback-kid', 'drip-loma', 'most-school-spirit'].map(awardId => ({ awardId, nominee: marker, organization: 'Automated deployment verification — remove', reason: 'Temporary test to verify persistence and administrator retrieval. Not a real nomination.' })),
    }) });
    assert.equal(submit.status, 200);
    const receipt = await submit.json();
    assert.equal(receipt.ok, true);
    const saved = (await adminRecords()).find(r => r.id === receipt.id && r.name === marker);
    assert(saved, 'Submission persists and is retrievable by administrator');
    assert.equal(saved.nominations[0].nominee, marker);
    assert.deepEqual(saved.nominations.map(n => n.awardId), ['comeback-kid', 'drip-loma', 'most-school-spirit']);
    assert.equal(saved.favoriteKyxLead, favoriteKyxLead, 'Optional lead vote persists correctly');
    const dashboard = await fetch(`${base}/admin/louies`, { headers: adminHeaders, cache: 'no-store' });
    assert.equal(dashboard.status, 200);
    const dashboardHtml = (await dashboard.text()).replace(/<!--[\s\S]*?-->/g, "");
    assert(dashboardHtml.includes(marker), 'Administrator dashboard displays the saved nomination');
    assert(dashboardHtml.includes(`Class President · Popularity Contest: ${favoriteKyxLead || 'No vote'}`), 'Administrator dashboard displays the vote');
    }
    console.log('PASS: live public form, input validation, persisted submissions with and without lead vote, admin API and dashboard, anonymous/member denial');
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
