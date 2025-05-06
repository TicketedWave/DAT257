'use client';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import YearSelector from './YearSelector';
import Legend from './Legend';
import Select from 'react-select';
import L from 'leaflet';

function FlyToCountry({ selectedCountry }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCountry?.bounds) {
      const bounds = L.geoJSON(selectedCountry.bounds).getBounds();
      map.flyToBounds(bounds);
    }
  }, [selectedCountry, map]);

  return null;
}

export default function CO2Map() {
  const [geoData, setGeoData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(() => {
    const defaultYear = localStorage.getItem('defaultYear') || 2024;
    return parseInt(defaultYear, 10);
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    localStorage.setItem('defaultYear', selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch(`/countries_total_co2_${selectedYear}.geo.json`);
        if (!response.ok) throw new Error(`Failed to fetch data for year ${selectedYear}`);
        const data = await response.json();
        setGeoData(data);

        const options = data.features.map((feature) => ({
          label: feature.properties.name,
          value: feature.properties.name,
          bounds: feature,
        }));
        setCountryOptions(options);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };
    fetchGeoData();
  }, [selectedYear]);

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
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, width: 250 }}>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Search country..."
          isClearable
        />
      </div>
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
        <Legend getColor={getColor} />
        {selectedCountry && <FlyToCountry selectedCountry={selectedCountry} />}
      </MapContainer>
    </div>
  );
}
