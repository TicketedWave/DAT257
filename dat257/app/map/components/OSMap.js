'use client';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

export default function CO2Map() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Hämta din anpassade GeoJSON-fil
    fetch('/countries_total_co2.geo.json')
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
        
        // Färgskala från din getColor-funktion
        const colors = [
          '#800026', // > 10 miljarder
          '#BD0026', // > 5 miljarder
          '#E31A1C', // > 1 miljard
          '#FC4E2A', // > 100 miljoner
          '#FD8D3C', // > 10 miljoner
          '#FEB24C', // > 1 miljon
          '#FED976', // > 0
          '#CCCCCC'  // Saknar data
        ];
        
        // Skapa den horisontella färgstapeln
        let gradientBar = '<div style="display: flex; height: 20px; margin-bottom: 5px; border-radius: 3px; overflow: hidden;">';
        colors.forEach(color => {
          gradientBar += `<div style="flex-grow: 1; background: ${color};"></div>`;
        });
        gradientBar += '</div>';
        
        // Skapa etiketterna
        const labels = ['0', '400', '800', '1200', '1600', '2000', '', ''];
        
        let labelsHtml = '<div style="display: flex; justify-content: space-between; width: 100%;">';
        labels.forEach(label => {
          labelsHtml += `<span style="font-size: 10px; color: white;">${label}</span>`;
        });
        labelsHtml += '</div>';
        
        div.innerHTML = `
          <div style="background: rgba(0, 0, 0, 0.8); padding: 10px; border-radius: 8px; color: white;">
            <h4 style="margin: 0 0 5px 0; text-align: center; color: white; font-size: 12px;">Carbon Emission (tCO₂)</h4>
            ${gradientBar}
            ${labelsHtml}
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
