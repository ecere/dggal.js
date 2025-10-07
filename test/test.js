import DGGAL from '../dist/dggal.js';
import assert from 'assert';

async function main() {
  const dggal = await DGGAL.init();
  const dggrsList = dggal.listDGGRS();
  const rs = dggal.createDGGRS('IVEA7H_Z7');

  console.log('--- DGGRS test suite ---');

  assert.strictEqual(typeof dggal.createDGGRS, 'function', 'createDGGRS should be a function');
  assert(rs && typeof rs.delete === 'function', 'DGGRS object should be created');

  const zoneTextId = '0234';
  const expectedLat = 47.63146799178348 * Math.PI / 180.0;
  const expectedLon = -78.8 * Math.PI / 180.0;

  console.log('Testing getZoneFromTextID() and getZoneTextID()...');
  const zoneIdentifier = rs.getZoneFromTextID(zoneTextId);

  if (zoneIdentifier === DGGAL.nullZone) {
    throw new Error(`getZoneFromTextID returned an invalid zone identifier for ID "${zoneTextId}".`);
  }
  const retrievedTextId = rs.getZoneTextID(zoneIdentifier);
  assert.strictEqual(retrievedTextId, zoneTextId, 'retrieved zone text ID should match original');
  console.log(`  ✅ getZoneFromTextID() and getZoneTextID() passed.`);

  console.log('Testing getZoneWGS84Centroid()...');
  const centroid = rs.getZoneWGS84Centroid(zoneIdentifier);
  assert(centroid, 'getZoneWGS84Centroid should return a centroid object');

  assert(Math.abs(centroid.lat - expectedLat) < 1e-10, `Latitude: Expected ${expectedLat * 180.0 / Math.PI}°, but got ${centroid.lat * 180.0 / Math.PI}°`);
  assert(Math.abs(centroid.lon - expectedLon) < 1e-10, `Longitude: Expected ${expectedLon * 180.0 / Math.PI}°, but got ${centroid.lon * 180.0 / Math.PI}°`);

  console.log(`  ✅ getZoneWGS84Centroid() passed. Centroid: (lat=${centroid.lat * 180.0 / Math.PI}°, lon=${centroid.lon * 180.0 / Math.PI}°)`);

  console.log('Testing getZoneFromWGS84Centroid()...');
  const originalLevel = rs.getZoneLevel(zoneIdentifier);
  const centroidForWasm = { lat: centroid.lat, lon: centroid.lon };
  const zoneFromCentroidIdentifier = rs.getZoneFromWGS84Centroid(originalLevel, centroidForWasm);

  if (zoneFromCentroidIdentifier === DGGAL.nullZone) {
    throw new Error(`getZoneFromWGS84Centroid returned an invalid zone identifier.`);
  }
  const retrievedTextIdFromCentroid = rs.getZoneTextID(zoneFromCentroidIdentifier);
  assert.strictEqual(retrievedTextIdFromCentroid, zoneTextId, 'zone from centroid should match original text ID');
  console.log(`  ✅ getZoneFromWGS84Centroid() passed.`);

  rs.delete();
  dggal.terminate();
  console.log('--- All tests passed! ---');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
