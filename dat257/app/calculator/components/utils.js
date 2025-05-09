export const calculateCarbonFootprint = (formData) => {
    const drivingEmission = formData.kilometersPerWeek * 52 * (formData.fuelEfficiency / 100) * 2.31; // kg CO₂ per year
    const times = formData.publicTransportPerWeek * 52 * 7 * 0.05; // kg CO₂ per year
    const flights = formData.flightsPerYear * 600; // 600 kg CO₂ per flight (economy average)
    const redMeat = formData.redMeatPerWeek * 52 * 6; // 6 kg CO₂ per meal
    const poultry = formData.poultryPerWeek * 52 * 1.7; // 1.7 kg CO₂ per meal
    const dairy = formData.dairyPerWeek * 52 * 2; // 2 kg CO₂ per serving
    const plantBasedMeals = formData.plantBasedMealsPerWeek * 52 * -2; // -2 kg CO₂ per meal (savings)
    const items = formData.clothingPurchasesPerYear * 30; // 30 kg CO₂ per item
    const electronics = formData.electronicsPurchasesPerYear * 100; //  100 kg CO₂ per item
    const purchases = formData.sustainablePurchasesPerMonth * 12 * -2; // -2 kg CO₂ per purchase (savings)
    const deliveries = formData.onlineShoppingDeliveriesPerMonth * 12 * 5; //  5 kg CO₂ per delivery
    const degrees = formData.homeTemperatureWinter * 100; // 100 kg CO₂ per degree
    const minutesHotWater = formData.hotWaterUsagePerDay * 365 * 0.1; // 0.1 kg CO₂ per minute
    const household = (formData.bedroomsInHousehold / formData.adultsInHousehold) * 500; // 500 kg CO₂ per room per adult

    return (drivingEmission + times + flights + redMeat + poultry + dairy + plantBasedMeals + items + electronics + purchases + deliveries + degrees + minutesHotWater + household).toFixed(2);
  };
  
  export const getFunFacts = (footprint) => {
    const rocketLaunchKg = 200000;
    const nyToLaFlight = 250;
    const treeOffsetKg = 21;
    const scooterRide = 0.02;

    return [
      `🌍 That's equivalent to ${Math.round(footprint / treeOffsetKg)} trees absorbing carbon for a year!`,
      `✈️ Roughly ${Math.round(footprint / nyToLaFlight)} flights from New York to LA.`,
      `🚀 About ${(footprint / rocketLaunchKg).toFixed(2)} rocket launches.`,
      `🛴 Or ${Math.round(footprint / scooterRide)} electric scooter rides!`,
    ];
  };
  
  export const generateNormalDistribution = (mean = 5000, stdDev = 2000, points = 100) => {
    const data = [];
    for (let i = 0; i <= points; i++) {
      const x = (i / (points - 1)) * 20000;
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      data.push({ x, y });
    }
    return data;
  };
  
  export function getPercentile(x, mean = 5000, stdDev = 2000) {
    const z = (x - mean) / stdDev;
    const cdf = 0.5 * (1 + erf(z / Math.sqrt(2)));
    return Math.round(cdf * 100);
  }

  export const fetchCountryData = async () => {
    const response = await fetch('\countries_total_co2_2023.geo.json');
    const data = await response.json();
    return data.features.map((feature) => ({
      id: feature.id,
      name: feature.properties.name,
      emissions: feature.properties.co2_per_capita,
    }));
  };
  
  export const prepareBarChartData = (countryData, userEmission, selectedCountries) => {
    if (!countryData || !selectedCountries) return [];
  
    const userEmissionObj = {
      id: 'YOU',
      name: 'You',
      emissions: parseFloat(userEmission) || 0
    };
  
    const filteredCountries = countryData
      .filter(country => selectedCountries.includes(country.name))
      .sort((a, b) => (b.emissions || 0) - (a.emissions || 0));
  
    return [userEmissionObj, ...filteredCountries];
  };
  
  function erf(x) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592,
      a2 = -0.284496736,
      a3 = 1.421413741,
      a4 = -1.453152027,
      a5 = 1.061405429,
      p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }