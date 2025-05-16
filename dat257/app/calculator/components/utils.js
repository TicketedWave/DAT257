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

/**
 * The function generates data points following a normal distribution curve with a specified mean,
 * standard deviation, and number of points.
 * @param [mean=5000] - The `mean` parameter in the `generateNormalDistribution` function represents
 * the average value of the normal distribution curve. In this context, it is set to a default value of
 * 5000, but you can provide a different mean value if needed.
 * @param [stdDev=2000] - The `stdDev` parameter in the `generateNormalDistribution` function
 * represents the standard deviation of the normal distribution. It is a measure of the amount of
 * variation or dispersion of a set of values. In the context of a normal distribution, approximately
 * 68% of the values fall within one standard deviation
 * @param [points=100] - The `points` parameter in the `generateNormalDistribution` function represents
 * the number of data points you want to generate along the normal distribution curve. It determines
 * the granularity or resolution of the data points that will be calculated and returned by the
 * function.
 * @returns An array of objects representing points on a normal distribution curve, where each object
 * has properties `x` and `y` representing the x-coordinate and y-coordinate of the point respectively.
 */
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

/**
 * The function `getPercentile` calculates the percentile of a given value `x` based on a normal
 * distribution with a specified mean and standard deviation.
 * @param x - The `getPercentile` function you provided calculates the percentile of a given value `x`
 * based on a normal distribution with a specified mean and standard deviation.
 * @param [mean=5000] - The `mean` parameter represents the mean value of the data distribution. In
 * this context, it is set to 5000 by default.
 * @param [stdDev=2000] - Standard deviation (stdDev) is a measure of the amount of variation or
 * dispersion of a set of values. In the context of the `getPercentile` function, the standard
 * deviation (stdDev) parameter is used to calculate the z-score, which is then used to determine the
 * percentile of a
 * @returns The function `getPercentile` returns the percentile value of a given input `x` based on a
 * normal distribution with a specified mean and standard deviation. The percentile value is calculated
 * using the error function (erf) and then rounded to the nearest integer before being returned.
 */
export function getPercentile(x, mean = 5000, stdDev = 2000) {
  const z = (x - mean) / stdDev;
  const cdf = 0.5 * (1 + erf(z / Math.sqrt(2)));
  return Math.round(cdf * 100);
}

/**
 * The function fetches country data from a JSON file, filters out null values, and maps the data to
 * include country ID, name, and CO2 emissions per capita.
 * @returns The `fetchCountryData` function is returning an array of objects with the following
 * properties for each country feature:
 * - `id`: The unique identifier of the country feature
 * - `name`: The name of the country
 * - `emissions`: The CO2 emissions per capita for the country
 */
export const fetchCountryData = async () => {
  const response = await fetch('\countries_total_co2_2023.geo.json');
  const data = await response.json();
  return data.features
    .filter(feature => feature.properties.co2_per_capita !== null) // Filter out null values
    .map((feature) => ({
      id: feature.id,
      name: feature.properties.name,
      emissions: feature.properties.co2_per_capita,
    }));
};

/**
 * The function `prepareBarChartData` prepares data for a bar chart with country emissions, user
 * emissions, and selected countries.
 * @param countryData - The `countryData` parameter is likely an object or array containing data
 * related to emissions for different countries. It could include information such as country names,
 * emission values, and other relevant data points.
 * @param userEmission - The `userEmission` parameter is the amount of emissions contributed by the
 * user. It is a numerical value representing the user's carbon footprint in terms of emissions.
 * @param selectedCountries - The `selectedCountries` parameter is an array that contains the list of
 * countries selected by the user for comparison in the bar chart.
 * @param [userCountry=null] - The `userCountry` parameter in the `prepareBarChartData` function is an
 * optional parameter that represents the country of the user. It is used to specify the country for
 * which the user's emissions data is provided. If the `userCountry` parameter is not provided, the
 * function will default to `
 * @returns An empty array is being returned if either `countryData` or `selectedCountries` is falsy.
 */
export const prepareBarChartData = (
  countryData,
  userEmission,
  selectedCountries,
  userCountry = null
) => {
  if (!countryData || !selectedCountries) return [];

  const userEmissionObj = {
    id: 'YOU',
    name: 'You',
    emissions: parseFloat(userEmission) || 0,
    isUser: true,
  };

  const filteredCountries = countryData
    .filter(country => selectedCountries.includes(country.name))
    .sort((a, b) => (b.emissions || 0) - (a.emissions || 0));

  const yourCountryObj = userCountry && selectedCountries.includes(userCountry)
    ? filteredCountries.find(country => country.name === userCountry)
    : null;

  const otherCountries = filteredCountries.filter(
    country => !yourCountryObj || country.name !== userCountry
  );

  return [
    userEmissionObj,
    ...(yourCountryObj ? [yourCountryObj] : []),
    ...otherCountries,
  ];
};


/**
 * The function `detectUserCountry` asynchronously detects the user's country based on their IP
 * address, defaulting to Sweden if an error occurs or if running on localhost.
 * @returns If the code is running on localhost, it will return 'Sweden' as a default. Otherwise, it
 * will attempt to fetch the user's country using the IP geolocation API 'https://ipapi.co/json/'. If
 * successful, it will return the country name obtained from the API response. If there is an error
 * during the process, it will log the error and return 'Sweden' as a fallback
 */
export const detectUserCountry = async () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.warn('Running on localhost, defaulting to Sweden');
    return 'Sweden';
  }

  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('IP geolocation failed');
    const data = await response.json();
    return data.country_name;
  } catch (error) {
    console.error('Error detecting country, defaulting to Sweden:', error);
    return 'Sweden';
  }
};

/**
 * The function `erf(x)` calculates the error function value for a given input `x`.
 * @param x - The `erf` function you provided is an implementation of the error function in
 * mathematics. The `x` parameter in this function represents the input value for which you want to
 * calculate the error function. The error function is commonly used in probability, statistics, and
 * physics to describe the probability of an event
 * @returns The function `erf(x)` returns the error function value for the input `x`.
 */
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