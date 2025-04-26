'use client';

import React, { useState, useEffect } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';

const categories = {
  Transportation: [
    {
      label: 'How many kilometers do you drive per week?',
      name: 'kilometersPerWeek',
      min: 0,
      max: 600,
      step: 10,
      marks: {
        0: '0 km',
        50: '50 km',
        100: '100 km',
        200: '200 km',
        500: '500 km',
        600: '600+ km'
      },
      unit: 'km'
    },
    {
      label: 'How often do you use public transportation each week?',
      name: 'publicTransportPerWeek',
      min: 0,
      max: 7,
      step: 0.5,
      marks: {
        0: 'Never',
        1.5: '1-2x',
        4: '3-5x',
        7: '6+x'
      },
      unit: 'times'
    },
    {
      label: 'How many flights do you take per year?',
      name: 'flightsPerYear',
      min: 0,
      max: 8,
      step: 0.5,
      marks: {
        0: 'None',
        1.5: '1-2',
        4: '3-5',
        8: '6+'
      },
      unit: 'flights'
    },
    {
      label: 'What is your vehicle fuel efficiency?',
      name: 'fuelEfficiency',
      min: 4,
      max: 14,
      step: 0.5,
      marks: {
        4.5: 'Efficient',
        6.5: 'Moderate',
        10: 'Low',
        14: 'Very Low'
      },
      unit: 'L/100km'
    }
  ],
  Food: [
    {
      label: 'How often do you eat red meat (beef, lamb, pork) per week?',
      name: 'redMeatPerWeek',
      min: 0,
      max: 6,
      step: 0.5,
      marks: {
        0: 'None',
        1.5: '1-2x',
        3.5: '3-4x',
        6: '5+x'
      },
      unit: 'meals'
    },
    {
      label: 'How often do you eat poultry (chicken, turkey) per week?',
      name: 'poultryPerWeek',
      min: 0,
      max: 6,
      step: 0.5,
      marks: {
        0: 'None',
        1.5: '1-2x',
        3.5: '3-4x',
        6: '5+x'
      },
      unit: 'meals'
    },
    {
      label: 'How often do you consume dairy products per week?',
      name: 'dairyPerWeek',
      min: 0,
      max: 6,
      step: 0.5,
      marks: {
        0: 'None',
        1.5: '1-2x',
        3.5: '3-4x',
        6: '5+x'
      },
      unit: 'servings'
    },{
      label: 'How often do you consume plant-based meals (vegetarian or vegan) per week?',
      name: 'plantBasedMealsPerWeek',
      min: 0,
      max: 6,
      step: 0.5,
      marks: {
        0: 'None',
        1.5: '1-2x',
        3.5: '3-4x',
        6: '5+x'
      },
      unit: 'meals'
    }
  ],
  Shopping:[
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
  ], House:[
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
  ],
};

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState({
    kilometersPerWeek: 150,
    publicTransportPerWeek: 1.5,
    flightsPerYear: 1.5,
    fuelEfficiency: 6.5,
    redMeatPerWeek: 1.5,
    poultryPerWeek: 1.5,
    dairyPerWeek: 3.5,
    plantBasedMealsPerWeek: 3.5,
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
  const [category, setCategory] = useState(null);
  const [completedCategories, setCompletedCategories] = useState([]);

  const currentQuestions = category ? categories[category] : [];

  useEffect(() => {
    if (submitted) {
      const target = getPercentile(userEmission);
      let current = 0;
      const step = Math.max(1, Math.round(target / 50));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          setAnimatedPercentile(target);
          clearInterval(interval);
        } else {
          setAnimatedPercentile(current);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [submitted]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const calculateCarbonFootprint = () => {
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

  const curveData = generateNormalDistribution();
  const userEmission = calculateCarbonFootprint();
  const closestPoint = curveData.reduce((prev, curr) =>
    Math.abs(curr.x - userEmission) < Math.abs(prev.x - userEmission) ? curr : prev
  );

  function getPercentile(x, mean = 5000, stdDev = 2000) {
    const z = (x - mean) / stdDev;
    const cdf = 0.5 * (1 + erf(z / Math.sqrt(2)));
    return Math.round(cdf * 100);
  }

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

  const handleCategoryComplete = () => {
    if (!completedCategories.includes(category)) {
      setCompletedCategories([...completedCategories, category]);
    }
    
    if (completedCategories.length + 1 >= Object.keys(categories).length) {
      setSubmitted(true);
    } else {
      setCategory(null);
      setStep(0);
    }
  };

  const getClosestMark = (value, marks) => {
    const markValues = Object.keys(marks).map(Number);
    return markValues.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  return (
    <div className="w-[90%] min-h-[75vh] mx-auto p-6 bg-gray-600/30 bg-opacity-50 mb-24 text-white rounded-2xl shadow-2xl space-y-6 flex flex-col justify-between">
      {!category ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">Choose a Category</h2>
          <button 
            onClick={() => setCategory('Transportation')} 
            className={`px-10 py-6 rounded-xl text-2xl transition ${
              completedCategories.includes('Transportation') 
                ? 'bg-green-600 hover:bg-green-500' 
                : 'bg-green-500 hover:bg-green-400'
            }`}
          >
            Transportation {completedCategories.includes('Transportation') && '✓'}
          </button>
          <button 
            onClick={() => setCategory('Food')} 
            className={`px-10 py-6 rounded-xl text-2xl transition ${
              completedCategories.includes('Food') 
                ? 'bg-blue-600 hover:bg-blue-500' 
                : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            Food {completedCategories.includes('Food') && '✓'}
          </button>
          <button 
      onClick={() => setCategory('House')} 
      className={`px-10 py-6 rounded-xl text-2xl transition ${
        completedCategories.includes('House') 
          ? 'bg-yellow-600 hover:bg-yellow-500' 
          : 'bg-yellow-500 hover:bg-yellow-400'
      }`}
    >
      House {completedCategories.includes('House') && '✓'}
    </button>

    <button 
      onClick={() => setCategory('Shopping')} 
      className={`px-10 py-6 rounded-xl text-2xl transition ${
        completedCategories.includes('Shopping') 
          ? 'bg-purple-600 hover:bg-purple-500' 
          : 'bg-purple-500 hover:bg-purple-400'
      }`}
    >
      Shopping {completedCategories.includes('Shopping') && '✓'}
    </button>

  </div>
) : !submitted ? (
        <>
          <h2 className="text-3xl font-bold text-center text-green-500">
            {currentQuestions[step].label}
          </h2>


          <div className="flex items-center justify-between gap-4 mt-6 opacity-100">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="mx-6"
            >
              <MoveLeft size={32} className="text-white hover:text-green-400 transition-all duration-200" />
            </button>

            <div className="flex-1 flex flex-col items-center px-4">
              <div className="flex justify-between text-sm text-gray-400 mb-6 w-full">
  {currentQuestions[step].marks ? (
    Object.entries(currentQuestions[step].marks).map(([value, label]) => (
      <span 
        key={value} 
        className={`text-xs ${
          Math.abs(parseFloat(value) - formData[currentQuestions[step].name]) < 0.1
            ? 'text-green-400 font-bold'
            : ''
        }`}
      >
        {label}
      </span>
    ))
  ) : (
    // Fallback for questions without marks
    <div className="w-full flex justify-between">
      <span className="text-xs">{currentQuestions[step].min} {currentQuestions[step].unit}</span>
      <span className="text-xs">{currentQuestions[step].max} {currentQuestions[step].unit}</span>
    </div>
  )}
</div>
              <input
                type="range"
                name={currentQuestions[step].name}
                min={currentQuestions[step].min}
                max={currentQuestions[step].max}
                step={currentQuestions[step].step}
                value={formData[currentQuestions[step].name]}
                onChange={handleChange}
                className="w-full h-4 appearance-none bg-green-3 rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a7e8c0 0%, #4ade80 ${
                    ((formData[currentQuestions[step].name] - currentQuestions[step].min) / 
                    (currentQuestions[step].max - currentQuestions[step].min)) * 100
                  }%, #ccc ${
                    ((formData[currentQuestions[step].name] - currentQuestions[step].min) / 
                    (currentQuestions[step].max - currentQuestions[step].min)) * 100
                  }%, #ccc 100%)`,
                }}
              />
              <div className="mt-4 text-lg">
                {formData[currentQuestions[step].name]} {currentQuestions[step].unit}
              </div>
            </div>

            {step < currentQuestions.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                className="mx-6"
              >
                <MoveRight size={32} className="text-white hover:text-green-400 transition-all duration-200" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCategoryComplete}
                className="bg-green-500 text-white text-bold text-xl px-8 py-4 rounded-xl hover:bg-green-400 transition mx-6"
              >
                {completedCategories.length + 1 >= Object.keys(categories).length ? 'Calculate' : 'Next Category'}
              </button>
            )}
          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-6 w-2/3 mx-auto">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${((step + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </>
      ) : (
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

          <div className="text-center mt-4">
            <p className="text-md text-gray-300">
              You emit more CO₂ than approximately{" "}
              <span className="text-green-400 font-bold">{animatedPercentile}%</span>{" "}
              of the world population.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm mb-3 text-gray-300">Carbon emissions compared to a typical global distribution</p>
            <div className="w-full h-64 bg-white/5 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={curveData}>
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
                  <Line type="monotone" dataKey="y" stroke="#4ade80" strokeWidth={3} dot={false} />
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

          <button
            className="mt-6 w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setCategory(null);
              setCompletedCategories([]);
            }}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

function generateNormalDistribution(mean = 5000, stdDev = 2000, points = 100) {
  const data = [];
  for (let i = 0; i <= points; i++) {
    const x = (i / (points - 1)) * 20000;
    const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
    const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    data.push({ x, y });
  }
  return data;
}

export default CarbonFootprintCalculator;