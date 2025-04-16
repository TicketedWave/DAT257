'use client';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

export default function CO2Map() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Hämta din anpassade GeoJSON-fil
    fetch('/countries_total_co2_2024.geo.json')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  // Funktion för att sätta färg beroende på utsläpp
  function getColor(co2_emission) {
    return co2_emission > 10_000_000_000 ? '#800026' :
      co2_emission > 5_000_000_000 ? '#BD0026' :
        co2_emission > 1_000_000_000 ? '#E31A1C' :
          co2_emission > 100_000_000 ? '#FC4E2A' :
            co2_emission > 10_000_000 ? '#FD8D3C' :
              co2_emission > 1_000_000 ? '#FEB24C' :
                co2_emission > 0 ? '#FED976' :
                  '#CCCCCC';
  }

  function style(feature) {
    const co2 = feature.properties.co2_emission || 0;
    return {
      fillColor: feature.properties.fill || getColor(co2),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      const popupContent = `
        <div>
          <h3>${feature.properties.name}</h3>
          <p>CO2 utsläpp: ${feature.properties.co2_emission || 'Saknar data'} ton</p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  }

  // Legend-komponent
  function Legend() {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: 'bottomright' });
  
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
      
        const ranges = [
          { label: '> 10B', color: '#800026' },
          { label: '> 5B', color: '#BD0026' },
          { label: '> 1B', color: '#E31A1C' },
          { label: '> 100M', color: '#FC4E2A' },
          { label: '> 10M', color: '#FD8D3C' },
          { label: '> 1M', color: '#FEB24C' },
          { label: '> 0', color: '#FED976' },
          { label: 'No data', color: '#CCCCCC' }
        ];
      
        let listHtml = `<div style="display: flex; flex-direction: column; gap: 6px;">`;
      
        ranges.forEach(({ label, color }) => {
          listHtml += `
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 20px; height: 12px; background: ${color}; border: 1px solid #999;"></div>
              <span style="font-size: 12px;">${label}</span>
            </div>
          `;
        });
      
        listHtml += `</div>`;
      
        div.innerHTML = `
          <div style="background: rgba(0, 0, 0, 0.8); padding: 10px; border-radius: 8px; color: white;">
            <h4 style="margin: 0 0 8px 0; text-align: center; font-size: 12px;">Carbon Emission (tCO₂)</h4>
            ${listHtml}
          </div>
        `;
      
        return div;
      };
  
      legend.addTo(map);
  
      return () => {
        legend.remove();
      };
    }, [map]);
  
    return null;
  }

  const position = [57.708870, 11.974560];
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
        attribution='&copy; OpenStreetMap'
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
        />
      )}
      <Legend />
    </MapContainer>
  );
}
