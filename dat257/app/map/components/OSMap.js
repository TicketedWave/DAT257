'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function OSMap() {
  const position = [ 57.708870, 11.974560];
  return (
    <MapContainer 
      center={position} 
      zoom={2}
      minZoom={2}
      maxZoom={20}
      worldCopyJump={false}
      style={{ height: '100%', width: '100%' }}
      maxBounds={[
        [85, -180],
        [-85, 180]
      ]}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} />
    </MapContainer>
  );
}