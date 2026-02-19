import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import { api } from '@shared/routes';
import { Location } from '@shared/schema';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export function PartnerMap() {
  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: [api.locations.list.path],
  });

  if (isLoading) {
    return <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg" />;
  }

  const defaultCenter: [number, number] = [29.8833, -97.9414]; // Central Texas / San Marcos

  return (
    <div className="space-y-4">
      <div className="h-[500px] w-full rounded-lg overflow-hidden border shadow-sm z-0">
        <MapContainer 
          center={locations && locations.length > 0 ? [locations[0].lat, locations[0].lng] : defaultCenter} 
          zoom={10} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Array.isArray(locations) && locations.map((location) => (
            <Marker key={location.id} position={[location.lat, location.lng]}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                    {location.type}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
