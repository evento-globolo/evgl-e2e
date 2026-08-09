import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const provenanceUrl = new URL('../../contracts/recovery-provenance.json', import.meta.url);
const provenance = JSON.parse(await readFile(provenanceUrl, 'utf8'));

const expectedDependencies = [
  'evento-globolo/evgl-clients',
  'evento-globolo/evgl-interfaces',
  'evento-globolo/evgl-libs',
  'evento-globolo/evgl-cli',
];

const expectedRunners = ['playwright', 'puppeteer', 'selenium'];

test('records the immutable recovery source', () => {
  assert.equal(provenance.schema_version, 1);
  assert.equal(provenance.canonical_repository, 'evento-globolo/evgl-e2e');
  assert.equal(provenance.recovered_source.artifact, 'zed-fleet-reconcile.sh');
  assert.match(provenance.recovered_source.sha256, /^[a-f0-9]{64}$/);
  assert.equal(
    provenance.recovered_source.sha256,
    '70e7bcdfa3a8a3e15bcbf8bd635a240baca53c9b95a36f01f4aa312f66fd18ae',
  );
  assert.equal(provenance.disposition, 'superseded-by-enriched-reviewed-seed');
  assert.match(provenance.successor.source_review_head, /^[a-f0-9]{40}$/);
});

test('preserves the recovered package and runner contract', () => {
  assert.deepEqual(provenance.compatibility.required_zed_dependencies, expectedDependencies);
  assert.equal(provenance.compatibility.materialization_dir, '.vendor/.zed');
  assert.deepEqual(provenance.compatibility.browser_runners, expectedRunners);
  assert.equal(provenance.compatibility.no_git_submodule_zed_dual_ownership, true);
  assert.match(provenance.compatibility.npm_lock_policy, /real lock/i);
  assert.match(provenance.compatibility.zed_lock_policy, /successful real resolver/i);
});
