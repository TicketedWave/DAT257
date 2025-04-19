// components/Legend.js
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import './Legend.css'; 
const Legend = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <h4>Carbon Emission (tCO₂)</h4>
        <div class="legend-gradient"></div>
        <div class="legend-labels">
          <span>0</span>
          <span>10⁶</span>
          <span>10⁷</span>
          <span>10⁸</span>
          <span>10⁹</span>
          <span>5 ⋅ 10⁹</span>
          <span>10¹⁰</span>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  return null; // This component doesn't render anything itself
};

export default Legend;