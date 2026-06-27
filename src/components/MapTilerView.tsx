// @context: MapTiler map display — interactive map component
// @purpose: Renders a single-location MapTiler map with marker; lazy-loaded on demand
// @behavior: Map loads when shouldLoadMap is true (or loadImmediately prop); shows marker at lat/lng
// @behavior: When API key missing, shows fallback message with "Get a free key" link
// @behavior: Handles missing style images via styleimagemissing event (silently adds transparent pixel)
// @side-effects: MapTiler SDK initialization; DOM marker creation
// @dependencies: @maptiler/sdk, lucide-react
// @known-issues: apiKey not included in useEffect deps (stale closure if key changes); silent error handling for style images

import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";


interface MapTilerViewProps {
  lat: number;
  lng: number;
  title: string;
  loadImmediately?: boolean;
}

const MapTilerView: React.FC<MapTilerViewProps> = ({ lat, lng, title, loadImmediately = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || '';
  const [shouldLoadMap] = useState(loadImmediately || !!apiKey);

  useEffect(() => {
    if (!shouldLoadMap) return;
    if (map.current) return;

    if (!apiKey) {
      console.warn('MapTiler API Key is missing. Please add VITE_MAPTILER_API_KEY to your secrets.');
    }
    
    maptilersdk.config.apiKey = apiKey || '';

    try {
      map.current = new maptilersdk.Map({
        container: mapContainer.current!,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 14,
        navigationControl: false,
        geolocateControl: false,
        fadeDuration: 0,
      });

      map.current.on('load', () => setMapLoaded(true));

      // Intercept and resolve missing style images to suppress MapTiler road/space warnings in console
      map.current.on('styleimagemissing', (e: { id?: string }) => {
        try {
          if (e && e.id && map.current) {
            const width = 1;
            const height = 1;
            const data = new Uint8Array([0, 0, 0, 0]);
            map.current.addImage(e.id, { width, height, data });
          }
        } catch {
          // ignore any errors adding dummy fallback
        }
      });

      // Create a custom DOM element for the Google Maps-style red pin
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="marker-pin" style="
          transition: transform 0.15s ease-out;
          transform-origin: center bottom;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
            <path d="M13 0C5.8 0 0 5.8 0 13c0 2.5 1 4.8 2.6 6.5L13 34l10.4-14.5C24 17.8 25 15.5 25 13 25 5.8 20.2 0 13 0z" fill="#EA4335"/>
            <circle cx="13" cy="11.5" r="4.25" fill="#fff"/>
          </svg>
        </div>
      `;

      new maptilersdk.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([lng, lat])
        .addTo(map.current);

      // Scale marker with zoom level
      const markerInner = el.querySelector('.marker-pin') as HTMLElement;
      const updateMarkerScale = () => {
        if (!map.current) return;
        const zoom = map.current.getZoom();
        const scale = Math.pow(1.25, zoom - 14);
        markerInner.style.transform = `scale(${Math.min(Math.max(scale, 0.3), 3)})`;
      };
      map.current.on('zoom', updateMarkerScale);
      map.current.on('load', updateMarkerScale);
      updateMarkerScale();
    } catch (error) {
      console.error('Error initializing MapTiler map:', error);
    }

  }, [lat, lng, title, apiKey, shouldLoadMap]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-md border border-neutral-200 bg-neutral-50 flex items-center justify-center">
      {/* Custom Map Controls - Bottom Right Container style */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
        {/* Zoom Stack */}
        <div className="flex flex-col bg-white rounded-xl md:rounded-2xl shadow-xl border border-neutral-100 overflow-hidden divide-y divide-neutral-100">
          <button 
            onClick={handleZoomIn}
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors active:scale-95 text-neutral-800"
          >
            <svg className="w-4 h-4 md:w-[22px] md:h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors active:scale-95 text-neutral-800"
          >
            <svg className="w-4 h-4 md:w-[22px] md:h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
      {(!apiKey || !shouldLoadMap) && (
        <>
          {/* Fallback Map Background (Visible if live map fails to load or no key or not loaded yet) */}
          <div 
            className="absolute inset-0 z-0 opacity-40 grayscale-[0.5]"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Floating Badge */}
          <div className="absolute top-6 left-6 z-50">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-[#17294F] uppercase tracking-widest leading-none mb-0.5">Preview Mode</span>
                <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider leading-none">
                  {!apiKey ? 'Add API Key for live maps' : 'Map loading paused'}
                </span>
              </div>
            </div>
          </div>

          {/* Fallback Marker (Only visible when live map is not active) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#2252D6]/10 rounded-full animate-ping absolute top-0" />
            <div className="relative z-20">
              <svg width="26" height="34" viewBox="0 0 26 34" fill="none" className="filter drop-shadow-xl">
                <path d="M13 0C5.8 0 0 5.8 0 13c0 2.5 1 4.8 2.6 6.5L13 34l10.4-14.5C24 17.8 25 15.5 25 13 25 5.8 20.2 0 13 0z" fill="#EA4335"/>
                <circle cx="13" cy="11.5" r="4.25" fill="#fff"/>
              </svg>
            </div>
          </div>
        </>
      )}

      {!!apiKey && shouldLoadMap && !mapLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-50 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-neutral-200 border-t-[#17294F] rounded-full animate-spin" />
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest animate-pulse">Loading map...</span>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full relative z-0" />
    </div>
  );
};

export default MapTilerView;
