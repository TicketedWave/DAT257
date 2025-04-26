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
  ]
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
    plantBasedMealsPerWeek: 3.5
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
    // Transportation calculations
    const drivingEmission = formData.kilometersPerWeek * 52 * (formData.fuelEfficiency * 2.31); // kg CO2
    const publicTransportSavings = formData.publicTransportPerWeek * 52 * 0.1; // kg CO2 saved
    const flightsEmission = formData.flightsPerYear * 250; // kg CO2
    
    // Food calculations
    const redMeatEmission = formData.redMeatPerWeek * 52 * 2.5; // kg CO2
    const poultryEmission = formData.poultryPerWeek * 52 * 0.8; // kg CO2
    const dairyEmission = formData.dairyPerWeek * 52 * 0.5; // kg CO2
    
    const total = drivingEmission - publicTransportSavings + flightsEmission + 
                 redMeatEmission + poultryEmission + dairyEmission;
    return total.toFixed(2);
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
                {Object.entries(currentQuestions[step].marks).map(([value, label]) => (
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
                ))}
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