'use client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Color gradient for methane intensity
const INTENSITY_COLORS = [
  { threshold: 0, color: '#FFEDA0' },   // Light yellow (low)
  { threshold: 50, color: '#FEB24C' },  // Orange (medium)
  { threshold: 100, color: '#F03B20' }  // Red (high)
];

export default function OSMap() {
  const [emissions, setEmissions] = useState([]);
  const position = [20, 0]; // Centered on equator

  useEffect(() => {
    fetch('/api/carbon')
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data); // Verify your data structure
        setEmissions(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Get color based on emission value
  const getIntensityColor = (value) => {
    if (!value) return INTENSITY_COLORS[0].color;
    for (let i = INTENSITY_COLORS.length - 1; i >= 0; i--) {
      if (value >= INTENSITY_COLORS[i].threshold) {
        return INTENSITY_COLORS[i].color;
      }
    }
    return INTENSITY_COLORS[0].color;
  };

  // Dynamic radius based on value
  const getRadius = (value) => {
    if (!value) return 5;
    return Math.min(Math.log(value + 1) * 3, 15); // Logarithmic scaling
  };

  return (
    <MapContainer 
      center={position} 
      zoom={2}
      minZoom={2}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {emissions.map((point, index) => {
        const color = getIntensityColor(point.value);
        const radius = getRadius(point.value);
        
        return (
          <CircleMarker
            key={index}
            center={[point.lat, point.lng]}
            radius={radius}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.7,
              weight: 1
            }}
          >
            <Popup>
              <div className="text-sm p-1">
                <p className="font-semibold">METHANE PLUME</p>
                <p>Intensity: {point.value ? `${point.value} kg` : 'N/A'}</p>
                <p>Location: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}