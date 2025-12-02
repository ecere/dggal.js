import DGGAL, { Pointd, GeoPoint, GeoExtent, Neighbor } from '../dist/dggal.js';

async function run() {
  const dggal = await DGGAL.init();
  // static props
  const nullZone = DGGAL.nullZone;
  const crs      = DGGAL.CRS(DGGAL.CRSRegistry.epsg, 4326, false);

  // DGGRS creation
  const dggrsList = dggal.listDGGRS();
  const rs = dggal.createDGGRS('TEST');
  // call every method once with dummy args
  rs.getZoneFromTextID('ABC');
  rs.getZoneTextID(nullZone);
  rs.getZoneLevel(nullZone);
  rs.getZoneArea(nullZone);
  rs.countZoneEdges(nullZone);
  rs.countSubZones(nullZone, 1);
  rs.getZoneParents(nullZone);
  rs.getZoneChildren(nullZone);
  rs.getZoneNeighbors(nullZone);
  rs.getZoneWGS84Centroid(nullZone);
  rs.getZoneCentroidParent(nullZone);
  rs.getZoneCentroidChild(nullZone);
  rs.isZoneCentroidChild(nullZone);
  rs.areZonesNeighbors(nullZone, nullZone);
  rs.areZonesSiblings(nullZone, nullZone);
  rs.doZonesOverlap(nullZone, nullZone);
  rs.doesZoneContain(nullZone, nullZone);
  rs.isZoneAncestorOf(nullZone, nullZone, 1);
  rs.isZoneContainedIn(nullZone, nullZone);
  rs.isZoneDescendantOf(nullZone, nullZone, 1);
  rs.isZoneImmediateChildOf(nullZone, nullZone);
  rs.isZoneImmediateParentOf(nullZone, nullZone);
  rs.zoneHasSubZone(nullZone, nullZone);

  rs.getMaxDGGRSZoneLevel();
  rs.getMaxDepth();
  rs.get64KDepth();
  rs.getMaxChildren();
  rs.getMaxParents();
  rs.getMaxNeighbors();

  rs.getZoneCRSVertices(nullZone, crs);
  rs.getZoneWGS84Vertices(nullZone);
  rs.getZoneRefinedWGS84Vertices(nullZone, 2);
  rs.getZoneRefinedCRSVertices(nullZone, crs, 2);
  rs.getSubZones(nullZone, 2);
  rs.getRefinementRatio();
  rs.getZoneWGS84Extent(nullZone);
  rs.listZones(0, { ll: { lat: 0, lon: 0 }, ur: { lat: 1, lon: 1 } } as GeoExtent);
  rs.getZoneFromWGS84Centroid(0, { lat: 0, lon: 0 } as GeoPoint);
  rs.getZoneFromCRSCentroid(crs, { x: 0, y: 0 } as Pointd);
  rs.countZones(0);
  rs.getFirstSubZone(nullZone, 1);
  rs.getIndexMaxDepth();
  rs.getSubZoneAtIndex(nullZone, 1, 0);
  rs.getSubZoneIndex(nullZone, nullZone);
  rs.getSubZoneCRSCentroids(nullZone, crs, 1);
  rs.getSubZoneWGS84Centroids(nullZone, 1);
  rs.getZoneCRSCentroid(nullZone, crs);
  rs.getZoneCRSExtent(nullZone, crs);
  rs.compactZones([nullZone]);
  rs.getLevelFromMetersPerSubZone(100, 1);
  rs.getLevelFromPixelsAndExtent(
    { ll: { lat: 0, lon: 0 }, ur: { lat: 1, lon: 1 } } as GeoExtent,
    256,
    256,
    1
  );
  rs.getLevelFromRefZoneArea(1, 1);
  rs.getLevelFromScaleDenominator(1, 1, 0.28);
  rs.getMetersPerSubZoneFromLevel(1, 1);
  rs.getRefZoneArea(1);
  rs.getScaleDenominatorFromLevel(1, 1, 0.28);

  rs.delete();
  dggal.terminate();
}

run();
