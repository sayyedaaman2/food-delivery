import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { type LatLngExpression, type LatLngTuple } from "leaflet";
import { locations, deliveryRoute, type LatLng } from "../../data/locations";

// Cast react-leaflet components to React.ComponentType<any> to resolve React 19 JSX prop type mismatches with Leaflet v5
const LeafletMapContainer = MapContainer as React.ComponentType<any>;
const LeafletTileLayer    = TileLayer as React.ComponentType<any>;
const LeafletMarker       = Marker as React.ComponentType<any>;
const LeafletPolyline     = Polyline as React.ComponentType<any>;

// Custom Leaflet DivIcons using clean HTML & Emojis
const createCustomIcon = (emoji: string, label: string, bgClass: string) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div class="flex flex-col items-center select-none" style="transform: translate(-50%, -100%);">
        <div class="px-2.5 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap border ${bgClass}">
          ${emoji} ${label}
        </div>
        <div class="w-2 h-2 rotate-45 -mt-1 bg-white border-r border-b border-zinc-200"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const restaurantIcon = createCustomIcon("🏪", "Sharma's Kitchen", "bg-white text-zinc-900 border-zinc-200");
const agentIcon      = createCustomIcon("🚴", "Rahul (Agent)", "bg-orange-500 text-white border-orange-600 shadow-orange-300");
const customerIcon   = createCustomIcon("📍", "Aaman (Customer)", "bg-zinc-900 text-white border-zinc-900");

interface DeliveryMapProps {
  className?: string;
  agentPosition?: LatLng;
  fullRoute?: LatLng[];
}

export default function DeliveryMap({
  className = "h-72 w-full",
  agentPosition,
  fullRoute = deliveryRoute,
}: DeliveryMapProps) {
  const centerPos: LatLngExpression = [17.6653, 75.9101];
  const currentAgentPos: LatLngTuple = (agentPosition || locations.deliveryAgent) as LatLngTuple;
  const restaurantPos: LatLngTuple = locations.restaurant as LatLngTuple;
  const customerPos: LatLngTuple = locations.customer as LatLngTuple;
  const routePolyline: LatLngExpression[] = fullRoute as LatLngExpression[];

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-sm border border-zinc-200 z-0 ${className}`}>
      <LeafletMapContainer
        center={centerPos}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#f8f7f5" }}
      >
        <LeafletTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Full Route Polyline */}
        <LeafletPolyline
          positions={routePolyline}
          pathOptions={{
            color: "#f97316",
            weight: 4,
            opacity: 0.8,
            dashArray: "8, 8",
          }}
        />

        {/* Restaurant Marker */}
        <LeafletMarker position={restaurantPos} icon={restaurantIcon}>
          <Popup>
            <div className="text-xs font-semibold">
              <p className="font-bold text-zinc-900">Sharma's Kitchen</p>
              <p className="text-zinc-500">Pickup Location</p>
            </div>
          </Popup>
        </LeafletMarker>

        {/* Delivery Agent Marker (Dynamic position) */}
        <LeafletMarker position={currentAgentPos} icon={agentIcon}>
          <Popup>
            <div className="text-xs font-semibold">
              <p className="font-bold text-orange-600">Rahul (Delivery Agent)</p>
              <p className="text-zinc-500">En Route to Customer</p>
            </div>
          </Popup>
        </LeafletMarker>

        {/* Customer Marker */}
        <LeafletMarker position={customerPos} icon={customerIcon}>
          <Popup>
            <div className="text-xs font-semibold">
              <p className="font-bold text-zinc-900">Aaman's Home</p>
              <p className="text-zinc-500">Dropoff Location</p>
            </div>
          </Popup>
        </LeafletMarker>
      </LeafletMapContainer>
    </div>
  );
}
