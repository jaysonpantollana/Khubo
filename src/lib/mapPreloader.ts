// @context: Map preloader singleton — initializes MapTiler map in background
// @purpose: Pre-renders the interactive map on app mount so it's 100% ready when user navigates to /maps
// @behavior: Creates a hidden off-screen container, initializes MapTiler map, stores instance
// @behavior: Maps.tsx consumes the preloaded map via takeMap() and re-parents the container
// @dependencies: @maptiler/sdk

import * as maptilersdk from "@maptiler/sdk";

let mapInstance: maptilersdk.Map | null = null;
let mapContainer: HTMLDivElement | null = null;
let mapReady = false;
let mapLoading = false;
let onLoadCallbacks: (() => void)[] = [];

export function startMapPreload(apiKey: string) {
  if (mapInstance || mapLoading || !apiKey) return;
  mapLoading = true;

  maptilersdk.config.apiKey = apiKey;

  // Create hidden off-screen container
  mapContainer = document.createElement("div");
  mapContainer.style.cssText =
    "position:fixed;left:-9999px;top:-9999px;width:1200px;height:800px;visibility:hidden;z-index:-1;";
  document.body.appendChild(mapContainer);

  mapInstance = new maptilersdk.Map({
    container: mapContainer,
    style: maptilersdk.MapStyle.STREETS,
    center: [124.2442, 8.2415],
    zoom: 13,
    navigationControl: false,
    geolocateControl: false,
    fadeDuration: 0,
  });

  mapInstance.on("styleimagemissing", (e: { id?: string }) => {
    try {
      if (e && e.id && mapInstance) {
        const data = new Uint8Array([0, 0, 0, 0]);
        mapInstance.addImage(e.id, { width: 1, height: 1, data });
      }
    } catch {
      // ignore
    }
  });

  mapInstance.on("load", () => {
    mapReady = true;
    onLoadCallbacks.forEach((cb) => cb());
    onLoadCallbacks = [];
  });
}

export function isMapReady() {
  return mapReady;
}

export function onMapReady(cb: () => void) {
  if (mapReady) {
    cb();
  } else {
    onLoadCallbacks.push(cb);
  }
}

// Returns the pre-initialized container and map instance, then clears the singleton
export function takeMap(): {
  container: HTMLDivElement;
  map: maptilersdk.Map;
} | null {
  if (!mapContainer || !mapInstance) return null;

  // Reset singleton so a new preload can start if needed
  const result = { container: mapContainer, map: mapInstance };
  mapContainer = null;
  mapInstance = null;
  mapReady = false;
  mapLoading = false;

  return result;
}
