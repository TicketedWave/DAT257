"use client"; // if using Next 13+ with app router

import { GoogleMap, LoadScript, Marker, HeatmapLayer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 39.8283, // Center of the US
  lng: -98.5795,
};

// Sample data points
const locations = [
  { lat: 37.7749, lng: -122.4194, title: "San Francisco" },
  { lat: 34.0522, lng: -118.2437, title: "Los Angeles" },
  { lat: 40.7128, lng: -74.0060, title: "New York" },
];

const MapComponent = () => {
return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
            {/* {locations.map((loc, index) => (
                <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} title={loc.title} />
            ))} */}
        </GoogleMap>
    </LoadScript>
);
};

export default MapComponent;
