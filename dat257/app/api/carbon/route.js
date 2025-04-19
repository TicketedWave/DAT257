export async function GET() {
  const token = process.env.CARBON_TOKEN;
  // Get methane data (change to l2c-co2 for CO₂)
  const apiUrl = "https://api.carbonmapper.org/api/v1/stac/collections/l2c-co2/items?limit=100";

  try {
    const response = await fetch(apiUrl, {
      headers: { 
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const data = await response.json();

    const points = data.features.map(feature => ({
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
      gasType: feature.collection === 'l2c-ch4' ? 'methane' : 'co2', // Add gas type
      value: feature.properties.plume_mass_kg || 0 // Add emission value
    }));

    return Response.json(points);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}