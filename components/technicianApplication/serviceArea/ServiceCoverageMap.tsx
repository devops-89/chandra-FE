interface ServiceCoverageMapProps {
  latitude: number;
  longitude: number;
  radiusKm: number;
}

const TILE_SIZE = 256;
const TILE_GRID_SIZE = 5;

const getZoomForRadius = (radiusKm: number) => {
  if (radiusKm <= 5) return 12;
  if (radiusKm <= 10) return 11;
  if (radiusKm <= 20) return 10;
  if (radiusKm <= 30) return 9;
  return 8;
};

const toTileX = (longitude: number, zoom: number) => {
  return ((longitude + 180) / 360) * 2 ** zoom;
};

const toTileY = (latitude: number, zoom: number) => {
  const latRad = (latitude * Math.PI) / 180;
  return (
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2)
    * 2 ** zoom
  );
};

const wrapTileX = (x: number, zoom: number) => {
  const max = 2 ** zoom;
  return ((x % max) + max) % max;
};

const clampTileY = (y: number, zoom: number) => {
  return Math.max(0, Math.min(2 ** zoom - 1, y));
};

const metersPerPixel = (latitude: number, zoom: number) => {
  return (156543.03392 * Math.cos((latitude * Math.PI) / 180)) / 2 ** zoom;
};

export default function ServiceCoverageMap({
  latitude,
  longitude,
  radiusKm,
}: ServiceCoverageMapProps) {
  const zoom = getZoomForRadius(radiusKm);
  const centerTileX = toTileX(longitude, zoom);
  const centerTileY = toTileY(latitude, zoom);
  const baseTileX = Math.floor(centerTileX);
  const baseTileY = Math.floor(centerTileY);
  const offsetX = (centerTileX - baseTileX) * TILE_SIZE;
  const offsetY = (centerTileY - baseTileY) * TILE_SIZE;
  const tileOffset = Math.floor(TILE_GRID_SIZE / 2);
  const radiusPx = Math.max(
    28,
    (radiusKm * 1000) / metersPerPixel(latitude, zoom),
  );
  const circleSize = radiusPx * 2;

  const tiles = Array.from({ length: TILE_GRID_SIZE * TILE_GRID_SIZE }, (_, index) => {
    const row = Math.floor(index / TILE_GRID_SIZE);
    const col = index % TILE_GRID_SIZE;
    const x = baseTileX + col - tileOffset;
    const y = baseTileY + row - tileOffset;

    return {
      id: `${x}-${y}`,
      left: col * TILE_SIZE,
      top: row * TILE_SIZE,
      src: `https://tile.openstreetmap.org/${zoom}/${wrapTileX(x, zoom)}/${clampTileY(y, zoom)}.png`,
    };
  });

  return (
    <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-[inherit] bg-slate-100">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          height: TILE_GRID_SIZE * TILE_SIZE,
          transform: `translate(calc(-50% - ${offsetX}px), calc(-50% - ${offsetY}px))`,
          width: TILE_GRID_SIZE * TILE_SIZE,
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            aria-hidden="true"
            className="absolute bg-cover bg-center"
            style={{
              backgroundImage: `url("${tile.src}")`,
              height: TILE_SIZE,
              left: tile.left,
              top: tile.top,
              width: TILE_SIZE,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 rounded-full border-2 border-emerald-600 bg-emerald-500/20 shadow-[0_0_0_1px_rgba(5,150,105,0.2)]"
        style={{
          height: circleSize,
          transform: 'translate(-50%, -50%)',
          width: circleSize,
        }}
      />

      <div
        aria-label="Technician service location"
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center"
        role="img"
      >
        <span className="material-symbols-outlined text-4xl text-emerald-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
          location_on
        </span>
        <span className="-mt-2 h-3 w-3 rounded-full bg-emerald-600 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
      </div>

      <div className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-600 shadow-sm">
        <a
          href="https://www.openstreetmap.org/copyright"
          rel="noreferrer"
          target="_blank"
        >
          OpenStreetMap
        </a>
      </div>
    </div>
  );
}
