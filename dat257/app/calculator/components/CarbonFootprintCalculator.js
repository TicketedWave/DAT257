'use client';

import React, { useState, useEffect } from 'react';
import { MoveRight , MoveLeft  } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceDot,
    ResponsiveContainer,
  } from 'recharts';
  
  

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState({
    carMilesPerWeek: 50,
    flightsPerYear: 2,
    meatMealsPerWeek: 7,
    electricityKwhPerMonth: 300,
    clothingPurchasesPerYear: 2,
    electronicsPurchasesPerYear: 2,
    sustainablePurchasesPerMonth: 2,
    onlineShoppingDeliveriesPerMonth: 5,
    homeTemperatureWinter: 5,
    adultsInHousehold: 1,
    bedroomsInHousehold: 1,
    hotWaterUsagePerDay: 30,
  });
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [animatedPercentile, setAnimatedPercentile] = useState(0);

  useEffect(() => {
    if (submitted) {
      const target = getPercentile(userEmission);
      let current = 0;
      const step = Math.max(1, Math.round(target / 50)); // Speed control
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          setAnimatedPercentile(target);
          clearInterval(interval);
        } else {
          setAnimatedPercentile(current);
        }
      }, 20); // Delay between steps
      return () => clearInterval(interval);
    }
  }, [submitted]);
  

  const spectrum = [
    {
      label: 'How many miles do you drive per week?',
      name: 'carMilesPerWeek',
      min: 0,
      max: 500,
      unit: 'miles',
    },
    {
      label: 'How many flights do you take each year?',
      name: 'flightsPerYear',
      min: 0,
      max: 20,
      unit: 'flights',
    },
    {
      label: 'How many meat-based meals do you eat per week?',
      name: 'meatMealsPerWeek',
      min: 0,
      max: 21,
      unit: 'meals',
    },
    {
      label: 'How much electricity do you use per month?',
      name: 'electricityKwhPerMonth',
      min: 0,
      max: 1000,
      unit: 'kWh',
    },
    {
      label: 'How many new clothing or footwear items do you buy each year?',
      name: 'clothingPurchasesPerYear',
      min: 0,
      max: 50,
      unit: 'items',
    },
    {
     label: 'How many electronic gadgets or household appliances do you buy each year?',
     name: 'electronicsPurchasesPerYear',
     min: 0,
     max: 20,
     unit: 'electronics',
    },
    {
      label: 'How many purchases of locally sourced or sustainably produced food and goods do you do each month?',
      name: 'sustainablePurchasesPerMonth',
      min: 0,
      max: 50,
      unit: 'purchases',
     },
     {
      label: 'How many online shopping deliveries do you receive per month?',
      name: 'onlineShoppingDeliveriesPerMonth',
      min: 0,
      max: 50,
      unit: 'deliveries',
     },
     {
      label: 'How warm do you keep your home in winter?',
      name: 'homeTemperatureWinter',
      min: 0,
      max: 30,
      unit: 'degrees',
     },
     {
      label: 'How many adults live in you household?',
      name: 'adultsInHousehold',
      min: 0,
      max: 10,
      unit: 'adults',
     },
     {
      label: 'How many bedrooms are in your household?',
      name: 'bedroomsInHousehold',
      min: 0,
      max: 10,
      unit: 'bedrooms',
     },
     {
      label: 'How many minutes per day does your household typically spend using hot water?',
      name: 'hotWaterUsagePerDay',
      min: 0,
      max: 300,
      unit: 'minutes',
     },
  ];
  

  const current = spectrum[step];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const calculateCarbonFootprint = () => {
    const miles = formData.carMilesPerWeek * 52 * 0.411;
    const flights = formData.flightsPerYear * 250;
    const meat = formData.meatMealsPerWeek * 52 * 2.5;
    const electricity = formData.electricityKwhPerMonth * 12 * 0.4;
    const items = formData.clothingPurchasesPerYear * 30; // 30 kg CO₂ per item
    const electronics = formData.electronicsPurchasesPerYear * 100; //  100 kg CO₂ per item
    const purchases = formData.sustainablePurchasesPerMonth * 12 * -2; // -2 kg CO₂ per purchase (savings)
    const deliveries = formData.onlineShoppingDeliveriesPerMonth * 12 * 5; //  5 kg CO₂ per delivery
    const degrees = formData.homeTemperatureWinter * 100; // 100 kg CO₂ per degree
    const minutesHotWater = formData.hotWaterUsagePerDay * 365 * 0.1; // 0.1 kg CO₂ per minute
    const household = (formData.bedroomsInHousehold / formData.adultsInHousehold) * 500; // 500 kg CO₂ per room per adult
    return (miles + flights + meat + electricity + items + electronics + purchases + deliveries + degrees + minutesHotWater + household).toFixed(2);
  };

  const getFunFacts = (footprint) => {
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

  const curveData = generateNormalDistribution(); // keep this outside your component return
const userEmission = calculateCarbonFootprint();

// Find the y-value at the user's x
const closestPoint = curveData.reduce((prev, curr) =>
  Math.abs(curr.x - userEmission) < Math.abs(prev.x - userEmission) ? curr : prev
);

function getPercentile(x, mean = 5000, stdDev = 2000) {
    const z = (x - mean) / stdDev;
    const cdf = 0.5 * (1 + erf(z / Math.sqrt(2)));
    return Math.round(cdf * 100); // As a percentile (0–100)
  }
  
  // Approximation of the error function
  function erf(x) {
    // Save the sign of x
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
  
    // Constants
    const a1 = 0.254829592,
          a2 = -0.284496736,
          a3 = 1.421413741,
          a4 = -1.453152027,
          a5 = 1.061405429,
          p = 0.3275911;
  
    // Abramowitz and Stegun formula 7.1.26
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
    return sign * y;
  }
  

  return (
    <div className="w-[90%] min-h-[75vh] mx-auto p-6 bg-gray-600/30 bg-opacity-50 mb-24 text-white rounded-2xl shadow-2xl space-y-6 flex flex-col justify-between">
      <h2 className="text-3xl font-bold text-center text-green-500">
        Calculate Your Carbon Footprint!
      </h2>

      {!submitted && (
        <>
          {/* <div>
            <label className="block mb-2 text-lg font-medium">{current.label}:</label>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>{current.min} {current.unit}</span>
              <span>{formData[current.name]} {current.unit}</span>
              <span>{current.max} {current.unit}</span>
            </div>
            <input
              type="range"
              name={current.name}
              min={current.min}
              max={current.max}
              value={formData[current.name]}
              onChange={handleChange}
              className="w-full h-6 appearance-none bg-green-300 rounded-lg cursor-pointer slider-thumb"
            />
          </div> */}

          <div className="flex items-center justify-between gap-4 mt-6 opacity-100">
  {/* Back Button */}
  <button
    type="button"
    onClick={() => setStep((prev) => Math.max(0, prev - 1))}
    disabled={step === 0}
    className='mx-6'
  >
    <MoveLeft  size={32} className="text-white hover:text-green-400 transition-all duration-200"/>
  </button>

{/* Spectrum Input in Center */}
<div className="flex-1 flex flex-col items-center px-4">
    <label className="block mb-2 text-lg font-medium text-center">{current.label}:</label>
    <div className="flex justify-between text-sm text-gray-400 mb-6 w-full">
        <span>{current.min} {current.unit}</span>
        <span>{formData[current.name]} {current.unit}</span>
        <span>{current.max} {current.unit}</span>
    </div>
    <input
        type="range"
        name={current.name}
        min={current.min}
        max={current.max}
        value={formData[current.name]}
        onChange={handleChange}
        className="w-full h-4 appearance-none bg-green-3  rounded-lg cursor-pointer slider-thumb"
        style={{
            background: `linear-gradient(to right, #a7e8c0 0%, #4ade80 ${
              ((formData[current.name] - current.min) / (current.max - current.min)) * 100
            }%, #ccc ${
              ((formData[current.name] - current.min) / (current.max - current.min)) * 100
            }%, #ccc 100%)`,
          }}
    />
</div>

{/* Next or Submit Button */}
  
    <button
      type="button"
      onClick={() => setStep((prev) => Math.min(spectrum.length - 1, prev + 1))}
      className='mx-6'
    >
      <MoveRight size={32} className="text-white hover:text-green-400 transition-all duration-200"/>
    </button>
</div>
{step === spectrum.length - 1 &&
    <div className="flex justify-center mt-4">
    <button
      type="button"
      onClick={() => setSubmitted(true)}
      className="bg-linear-to-bl from-green-200 to-green-600 text-white text-bold text-2xl px-12 py-6 rounded-xl hover:bg-green-700 transition mx-auto"
    >
      Calculate
    </button></div>}

    </>)}

    {submitted && (
    <>
    <div className="text-center mt-4 space-y-4">
        <p className="text-xl font-semibold">Your Estimated Carbon Footprint:</p>
        <p className="text-3xl font-bold text-green-400">{calculateCarbonFootprint()} kg CO₂/year</p>

        <div className="mt-4 space-y-2 text-sm text-gray-300">
        {getFunFacts(parseFloat(calculateCarbonFootprint())).map((fact, index) => (
            <p key={index}>{fact}</p>
        ))}
        </div>
    </div>
        {/* User percentile result */}
    <div className="text-center mt-4">
        <p className="text-md text-gray-300">
            You emit more CO₂ than approximately{" "}
            <span className="text-green-400 font-bold">
            {animatedPercentile}%
            </span>{" "}
            of the world population.
        </p>
    </div>

        {/* Normal Distribution Graph */}
    <div className="mt-8">
        <p className="text-sm mb-3 text-gray-300">Carbon emissions compared to a typical global distribution</p>
        <div className="w-full h-64 bg-white/5 rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateNormalDistribution()}>
                <XAxis
                dataKey="x"
                tick={{ fill: '#ccc', fontSize: 12 }}
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                domain={[0, 20000]}
                />
                <YAxis hide domain={[0, 'auto']} />
                <Tooltip
                formatter={(value) => value.toFixed(5)}
                labelFormatter={(label) => `${label.toLocaleString()} kg CO₂`}
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4ade80', color: 'white' }}
                />
                <Line
                type="monotone"
                dataKey="y"
                stroke="#4ade80"
                strokeWidth={3}
                dot={false}
                />
                <ReferenceDot
                    x={closestPoint.x}
                    y={closestPoint.y}
                    r={8}
                    fill="#ffffff"
                    stroke="#4ade80"
                    strokeWidth={3}
                    isFront
                    label={{
                        value: 'You',
                        position: 'top',
                        fill: '#fff',
                        fontSize: 12,
                    }}
                />

            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
</>)}
      {/* Optional: Back to start button */}
      {submitted && (
        <button
          className="mt-6 w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition"
          onClick={() => {
            setSubmitted(false);
            setStep(0);
          }}
        >
          Try Again
        </button>
      )}

      {/* Progress Bar */}
        {!submitted && <div className=" h-2 bg-white/10 rounded-full overflow-hidden mt-6 w-2/3 mx-auto">
            <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${((step + 1) / spectrum.length) * 100}%` }}
            />
        </div>}
    </div>
  );
};


function generateNormalDistribution(mean = 5000, stdDev = 2000, points = 100) {
    const data = [];
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * 20000; // from 0 to 20,000
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      data.push({ x, y });
    }
    return data;
}

function generateNormalDistributionWithPercentiles(mean = 5000, stdDev = 2000, points = 100) {
    const data = [];
    for (let i = 0; i <= points; i++) {
      const percentile = i / points;
      const z = Math.sqrt(2) * inverseErf(2 * percentile - 1);
      const x = mean + z * stdDev;
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      data.push({ percentile: Math.round(percentile * 100), y });
    }
    return data;
}
function inverseErf(x) {
    const a = 0.147;
    const ln = Math.log(1 - x * x);
    const first = (2 / (Math.PI * a)) + (ln / 2);
    const second = ln / a;
    return Math.sign(x) * Math.sqrt(Math.sqrt(first * first - second) - first);
}
    

export default CarbonFootprintCalculator;
