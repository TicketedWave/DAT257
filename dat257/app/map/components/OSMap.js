'use client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import YearSelector from './YearSelector';
import Legend from './Legend'; 

export default function CO2Map() {
  const [geoData, setGeoData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(() => {
    const defaultYear = localStorage.getItem('defaultYear') || 2024; // Retrieve default year from localStorage or use 2024
    return parseInt(defaultYear, 10);
  });

  useEffect(() => {
    localStorage.setItem('defaultYear', selectedYear); // Save the selected year as the default year
  }, [selectedYear]);

  useEffect(() => {
    // Fetch GeoJSON data for the selected year
    const fetchGeoData = async () => {
      try {
        const response = await fetch(`/countries_total_co2_${selectedYear}.geo.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for year ${selectedYear}`);
        }
        const data = await response.json();
        console.log('Fetched GeoJSON data:', data); // Debugging
        setGeoData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeoData();
  }, [selectedYear]); // Refetch data whenever the selected year changes

  function getColor(co2_emission) {
    return co2_emission > 10_000_000_000
      ? '#AD0000'
      : co2_emission > 5_000_000_000
      ? '#FF0000'
      : co2_emission > 1_000_000_000
      ? '#FF6200'
      : co2_emission > 100_000_000
      ? '#ffd900'
      : co2_emission > 10_000_000
      ? '#FD8D3C'
      : co2_emission > 1_000_000
      ? '#1DF659'
      : co2_emission > 0
      ? '#40CEF5'
      : '#CCCCCC';
  }

  function style(feature) {
    const co2 = feature.properties?.co2_emission || 0;
    return {
      fillColor: getColor(co2),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  }

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      const popupContent = `
        <div>
          <h3>${feature.properties.name}</h3>
          <p>CO2 Emissions: ${feature.properties.co2_emission || 'No data'} tons</p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  }

  const position = [57.70887, 11.97456]; // Default map center
  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
      <MapContainer
        center={position}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {geoData && <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />}
        <Legend getColor={getColor} /> {}
      </MapContainer>
    </div>
  );
  
}
