import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface RealMapCoreProps {
  zoomLevel: "personal" | "campus" | "city" | "global";
  filterType: string;
  onMarkerClick?: (marker: any) => void;
}

export default function RealMapCore({ zoomLevel, filterType, onMarkerClick }: RealMapCoreProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Mumbai center coordinates (also user's location for demo)
  const mumbaiCenter: [number, number] = [19.0760, 72.8777];
  const userLocation: [number, number] = [19.0760, 72.8777]; // User's current location

  // Real Mumbai locations with GPS coordinates
  const locations = [
    // Colleges
    {
      name: "IIT Bombay",
      type: "colleges",
      coords: [19.1334, 72.9133] as [number, number],
      color: "#7C5CE8",
      description: "Premier engineering institute",
    },
    {
      name: "Mumbai University",
      type: "colleges",
      coords: [18.9294, 72.8319] as [number, number],
      color: "#7C5CE8",
      description: "Fort campus",
    },
    {
      name: "VJTI",
      type: "colleges",
      coords: [19.0229, 72.8553] as [number, number],
      color: "#7C5CE8",
      description: "Veermata Jijabai Technological Institute",
    },
    {
      name: "ICT Mumbai",
      type: "colleges",
      coords: [19.0220, 72.8458] as [number, number],
      color: "#7C5CE8",
      description: "Institute of Chemical Technology",
    },

    // Cafes
    {
      name: "Leopold Cafe",
      type: "cafes",
      coords: [18.9220, 72.8332] as [number, number],
      color: "#00CBA4",
      description: "Iconic Colaba cafe since 1871",
    },
    {
      name: "Cafe Mondegar",
      type: "cafes",
      coords: [18.9216, 72.8325] as [number, number],
      color: "#00CBA4",
      description: "Famous for Mario Miranda murals",
    },
    {
      name: "Kyani & Co",
      type: "cafes",
      coords: [18.9339, 72.8318] as [number, number],
      color: "#00CBA4",
      description: "Irani cafe serving bun maska",
    },
    {
      name: "Prithvi Cafe",
      type: "cafes",
      coords: [19.1030, 72.8263] as [number, number],
      color: "#00CBA4",
      description: "Juhu's cultural hub",
    },

    // Heritage Sites
    {
      name: "Gateway of India",
      type: "heritage",
      coords: [18.9220, 72.8347] as [number, number],
      color: "#F0A500",
      description: "Mumbai's iconic monument",
    },
    {
      name: "Chhatrapati Shivaji Terminus",
      type: "heritage",
      coords: [18.9398, 72.8355] as [number, number],
      color: "#F0A500",
      description: "UNESCO World Heritage railway station",
    },
    {
      name: "Elephanta Caves",
      type: "heritage",
      coords: [18.9633, 72.9315] as [number, number],
      color: "#F0A500",
      description: "Ancient rock-cut temples",
    },
    {
      name: "Haji Ali Dargah",
      type: "heritage",
      coords: [18.9826, 72.8089] as [number, number],
      color: "#F0A500",
      description: "Mosque on an islet",
    },

    // Adventure
    {
      name: "Marine Drive",
      type: "adventure",
      coords: [18.9432, 72.8236] as [number, number],
      color: "#3B8ADD",
      description: "Queen's Necklace promenade",
    },
    {
      name: "Sanjay Gandhi National Park",
      type: "adventure",
      coords: [19.2183, 72.9095] as [number, number],
      color: "#3B8ADD",
      description: "Wildlife in the city",
    },
    {
      name: "Juhu Beach",
      type: "adventure",
      coords: [19.0990, 72.8267] as [number, number],
      color: "#3B8ADD",
      description: "Popular beach destination",
    },

    // Culture
    {
      name: "Prithvi Theatre",
      type: "culture",
      coords: [19.1034, 72.8262] as [number, number],
      color: "#E85D30",
      description: "Premier theater venue",
    },
    {
      name: "National Centre for Performing Arts",
      type: "culture",
      coords: [18.9264, 72.8154] as [number, number],
      color: "#E85D30",
      description: "NCPA - Cultural hub",
    },
  ];

  const getZoomLevel = () => {
    switch (zoomLevel) {
      case "personal":
        return 14;
      case "campus":
        return 12;
      case "city":
        return 11;
      case "global":
        return 10;
      default:
        return 12;
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      const map = L.map("map-container", {
        zoomControl: false, // We'll use custom controls
        attributionControl: true,
      }).setView(mumbaiCenter, getZoomLevel());

      // Add light theme tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add user location marker
      const userIcon = L.divIcon({
        className: "user-marker",
        html: `
          <div style="
            width: 48px;
            height: 48px;
            background: radial-gradient(circle, #0D9488 0%, #0D948860 50%, transparent 70%);
            border: 3px solid #0D9488;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(13, 148, 136, 0.3);
            animation: pulse 2s infinite;
          ">
            <div style="
              width: 16px;
              height: 16px;
              background: #FFFFFF;
              border-radius: 50%;
              border: 2px solid #0D9488;
            "></div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      userMarkerRef.current = L.marker(userLocation, { icon: userIcon }).addTo(map);
      userMarkerRef.current.bindPopup(`
        <div style="
          font-family: Inter, sans-serif;
          padding: 8px;
          text-align: center;
        ">
          <div style="
            color: #0D9488;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 4px;
          ">
            📍 You are here
          </div>
          <div style="
            color: #6B7280;
            font-size: 11px;
          ">
            Mumbai, Maharashtra
          </div>
        </div>
      `);

      mapRef.current = map;
    }

    // Update zoom when zoomLevel changes
    if (mapRef.current) {
      mapRef.current.setZoom(getZoomLevel());
    }
  }, [zoomLevel]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Filter locations based on filterType
    const filteredLocations =
      filterType === "all"
        ? locations
        : locations.filter((loc) => loc.type === filterType);

    // Add markers
    filteredLocations.forEach((location) => {
      // Create custom icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${location.color}40;
            border: 2px solid ${location.color};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px ${location.color}60;
            cursor: pointer;
            transition: all 0.2s;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: ${location.color};
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(location.coords, { icon: customIcon }).addTo(
        mapRef.current!
      );

      // Add popup
      marker.bindPopup(`
        <div style="
          font-family: Inter, sans-serif;
          padding: 8px;
          min-width: 200px;
        ">
          <div style="
            color: ${location.color};
            font-weight: 600;
            font-size: 10px;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
          ">
            ${location.type.toUpperCase()}
          </div>
          <div style="
            color: #FFFFFF;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 4px;
          ">
            ${location.name}
          </div>
          <div style="
            color: #888899;
            font-size: 12px;
          ">
            ${location.description}
          </div>
        </div>
      `);

      // Click event
      marker.on("click", () => {
        if (onMarkerClick) {
          onMarkerClick({
            name: location.name,
            type: location.type,
            description: location.description,
          });
        }
      });

      markersRef.current.push(marker);
    });
  }, [filterType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="map-container"
      className="absolute inset-0"
      style={{
        background: "#F8F9FA",
      }}
    />
  );
}
