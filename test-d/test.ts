// test-d/test.ts

import DGGAL, {
  DGGRS,
  DGGRSZone,
  CRS,
  GeoPoint,
  Pointd,
  GeoExtent,
  Neighbor
} from '../dist/dggal.js';
import { expectType } from 'tsd';

// Static API
expectType<DGGRSZone>(DGGAL.nullZone);
expectType<CRS>(
  DGGAL.CRS(DGGAL.CRSRegistry.epsg, 4326, true)
);
expectType<Promise<DGGAL>>(DGGAL.init());

// Prepare dummy values for instance‐level tests
declare const api: DGGAL;
declare const rs: DGGRS;
declare const zone: DGGRSZone;
declare const crs: CRS;
declare const depth: number;
declare const level: number;
declare const idx: number;
declare const edgeRefinement: number;
declare const bbox: GeoExtent;
declare const geo: GeoPoint;
declare const pt: Pointd;

// Creation & teardown
expectType<string[]>(api.listDGGRS());
expectType<DGGRS>(api.createDGGRS('test'));
expectType<void>(api.terminate());

// Basic lookup
expectType<DGGRSZone>(rs.getZoneFromTextID('ID'));
expectType<string>(rs.getZoneTextID(zone));

// Metadata
expectType<number>(rs.getZoneLevel(zone));
expectType<number>(rs.getZoneArea(zone));
expectType<number>(rs.countZoneEdges(zone));
expectType<DGGRSZone>(rs.countSubZones(zone, depth));

// Hierarchy
expectType<DGGRSZone[]>(rs.getZoneParents(zone));
expectType<DGGRSZone[]>(rs.getZoneChildren(zone));
expectType<Neighbor[]>(rs.getZoneNeighbors(zone));

// Centroid related
expectType<GeoPoint>(rs.getZoneWGS84Centroid(zone));
expectType<DGGRSZone>(rs.getZoneCentroidParent(zone));
expectType<DGGRSZone>(rs.getZoneCentroidChild(zone));
expectType<boolean>(rs.isZoneCentroidChild(zone));

// Relationship queries
expectType<boolean>(rs.areZonesNeighbors(zone, zone));
expectType<boolean>(rs.areZonesSiblings(zone, zone));
expectType<boolean>(rs.doZonesOverlap(zone, zone));
expectType<boolean>(rs.doesZoneContain(zone, zone));
expectType<boolean>(rs.isZoneAncestorOf(zone, zone, depth));
expectType<boolean>(rs.isZoneContainedIn(zone, zone));
expectType<boolean>(rs.isZoneDescendantOf(zone, zone, depth));
expectType<boolean>(rs.isZoneImmediateChildOf(zone, zone));
expectType<boolean>(rs.isZoneImmediateParentOf(zone, zone));
expectType<boolean>(rs.zoneHasSubZone(zone, zone));

// Limits / metadata
expectType<number>(rs.getMaxDGGRSZoneLevel());
expectType<number>(rs.getMaxDepth());
expectType<number>(rs.get64KDepth());
expectType<number>(rs.getMaxChildren());
expectType<number>(rs.getMaxParents());
expectType<number>(rs.getMaxNeighbors());

// Vertices
expectType<Pointd[]>(rs.getZoneCRSVertices(zone, crs));
expectType<GeoPoint[]>(rs.getZoneWGS84Vertices(zone));
expectType<GeoPoint[]>(rs.getZoneRefinedWGS84Vertices(zone, edgeRefinement));
expectType<Pointd[]>(rs.getZoneRefinedCRSVertices(zone, crs, edgeRefinement));

// Sub-zone queries
expectType<DGGRSZone[]>(rs.getSubZones(zone, depth));

// Refinement
expectType<number>(rs.getRefinementRatio());

// WGS84 extent
expectType<GeoExtent>(rs.getZoneWGS84Extent(zone));

// Listing zones within a box
expectType<DGGRSZone[]>(rs.listZones(level, bbox));

// Centroid → zone
expectType<DGGRSZone>(rs.getZoneFromWGS84Centroid(level, geo));
expectType<DGGRSZone>(rs.getZoneFromCRSCentroid(crs, pt));

// Global zone counts
expectType<DGGRSZone>(rs.countZones(level));

// Indexed sub-zones
expectType<DGGRSZone>(rs.getFirstSubZone(zone, depth));
expectType<number>(rs.getIndexMaxDepth());
expectType<DGGRSZone>(rs.getSubZoneAtIndex(zone, depth, idx));
expectType<DGGRSZone>(rs.getSubZoneIndex(zone, zone));

// Sub-zone centroid arrays
expectType<Pointd[]>(rs.getSubZoneCRSCentroids(zone, crs, depth));
expectType<GeoPoint[]>(rs.getSubZoneWGS84Centroids(zone, depth));

// CRS‐based centroid & extent
expectType<Pointd>(rs.getZoneCRSCentroid(zone, crs));
expectType<{ crs: CRS; tl: Pointd; br: Pointd }>(rs.getZoneCRSExtent(zone, crs));

// Compact & rebuild zone arrays
expectType<DGGRSZone[]>(rs.compactZones([zone]));

// Level / metrics conversions
expectType<number>(rs.getLevelFromMetersPerSubZone(100, depth));
expectType<number>(rs.getLevelFromPixelsAndExtent(bbox, 256, 256, depth));
expectType<number>(rs.getLevelFromRefZoneArea(1, depth));
expectType<number>(rs.getLevelFromScaleDenominator(1, depth, 0.28));
expectType<number>(rs.getMetersPerSubZoneFromLevel(level, depth));
expectType<number>(rs.getRefZoneArea(depth));
expectType<number>(rs.getScaleDenominatorFromLevel(level, depth, 0.28));

// Cleanup
expectType<void>(rs.delete());
