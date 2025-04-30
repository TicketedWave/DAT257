'use client';

import React, { useState, useEffect } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';
import './CarbonFootprintCalculator.css';
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
  TRANSPORTATION: [
    {
      label: 'How many kilometers do you drive per week?',
      name: 'kilometersPerWeek',
      min: 0,
      max: 600,
      step: 10,
      marks: {
        0: '0 km',
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
        7: 'Every day'
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
        8: '8 or more'
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
        4: 'Efficient',
        14: 'Very Low'
      },
      unit: 'L/100km'
    }
  ],
  FOOD: [
    {
      label: 'How often do you eat red meat (beef, lamb, pork) per week?',
      name: 'redMeatPerWeek',
      min: 0,
      max: 6,
      step: 0.5,
      marks: {
        0: 'Never',
        6: '5 or more times'
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
        0: 'Never',
        6: '5 or more times'
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
        0: 'Never',
        6: '5 or more times'
      },
      unit: 'servings'
    }, {
      label: 'How often do you consume plant-based meals (vegetarian or vegan) per week?',
      name: 'plantBasedMealsPerWeek',
      min: 0,
      max: 6,
      step: 0.5,
      marks: {
        0: 'Never',
        6: '5 or more times'
      },
      unit: 'meals'
    }
  ],
  SHOPPING: [
    {
      label: 'How many new clothing or footwear items do you buy each year?',
      name: 'clothingPurchasesPerYear',
      min: 0,
      max: 50,
      step: 5, // Step by 5 items
      marks: {
        0: '0',
        50: '50'
      },
      unit: 'items',
    },
    {
      label: 'How many electronic gadgets or household appliances do you buy each year?',
      name: 'electronicsPurchasesPerYear',
      min: 0,
      max: 20,
      step: 2, // Step by 2 items
      marks: {
        0: '0',
        20: '20'
      },
      unit: 'electronics',
    },
    {
      label: 'How many purchases of locally sourced or sustainably produced food and goods do you do each month?',
      name: 'sustainablePurchasesPerMonth',
      min: 0,
      max: 50,
      step: 5, // Step by 5 purchases
      marks: {
        0: '0',
        50: '50'
      },
      unit: 'purchases',
    },
    {
      label: 'How many online shopping deliveries do you receive per month?',
      name: 'onlineShoppingDeliveriesPerMonth',
      min: 0,
      max: 50,
      step: 5, // Step by 5 deliveries
      marks: {
        0: '0',
        50: '50'
      },
      unit: 'deliveries',
    },
  ],
  HOME: [
    {
      label: 'How warm do you keep your home in winter?',
      name: 'homeTemperatureWinter',
      min: 0,
      max: 30,
      step: 1, // Step by 1 degree
      marks: {
        0: '0°C',
        30: '30°C'
      },
      unit: 'degrees',
    },
    {
      label: 'How many adults live in your household?',
      name: 'adultsInHousehold',
      min: 0,
      max: 10,
      step: 1, // Step by 1 adult
      marks: {
        0: '0',
        10: '10'
      },
      unit: 'adults',
    },
    {
      label: 'How many bedrooms are in your household?',
      name: 'bedroomsInHousehold',
      min: 0,
      max: 10,
      step: 1, // Step by 1 bedroom
      marks: {
        0: '0',
        10: '10'
      },
      unit: 'bedrooms',
    },
    {
      label: 'How many minutes per day does your household typically spend using hot water?',
      name: 'hotWaterUsagePerDay',
      min: 0,
      max: 300,
      step: 10, // Step by 10 minutes
      marks: {
        0: '0 min',
        300: '300 min'
      },
      unit: 'minutes',
    },
  ],
};

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState({
    kilometersPerWeek: -1,
    publicTransportPerWeek: -1,
    flightsPerYear: -1,
    fuelEfficiency: -1,
    redMeatPerWeek: -1,
    poultryPerWeek: -1,
    dairyPerWeek: -1,
    plantBasedMealsPerWeek: -1,
    clothingPurchasesPerYear: -1,
    electronicsPurchasesPerYear: -1,
    sustainablePurchasesPerMonth: -1,
    onlineShoppingDeliveriesPerMonth: -1,
    homeTemperatureWinter: -1,
    adultsInHousehold: -1,
    bedroomsInHousehold: -1,
    hotWaterUsagePerDay: -1,
  });

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [animatedPercentile, setAnimatedPercentile] = useState(0);
  const [category, setCategory] = useState('TRANSPORTATION');
  const [completedCategories, setCompletedCategories] = useState([]);
  const [categoryProgress, setCategoryProgress] = useState({});

  const currentQuestions = categories[category] || [];  // Fallback to empty array if no category selected
  const currentQuestion = currentQuestions[step];
  const canProceed = formData[currentQuestion?.name] > -1; //

  const calculateCategoryProgress = (categoryName) => {
    const categoryQuestions = categories[categoryName];
    if (!categoryQuestions) return 0;

    const answeredQuestions = categoryQuestions.filter(
      question => formData[question.name] > -1
    ).length;

    return (answeredQuestions / categoryQuestions.length) * 100;
  };

  const allQuestionsAnswered = () => {
    return Object.values(formData).every(value => value > -1);
  };

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

  const handleCategorySwitch = (newCategory) => {
    const allQuestionsAnswered = categories[category].every(
      (_, index) => formData[categories[category][index].name] > 0
    );

    if (allQuestionsAnswered && !completedCategories.includes(category)) {
      setCompletedCategories([...completedCategories, category]);
    }

    setCategory(newCategory);
    setStep(categoryProgress[newCategory] || 0);
  };

  const handleNextQuestion = () => {
    // Update the step for the current category
    setCategoryProgress(prevProgress => ({
      ...prevProgress,
      [category]: step + 1
    }));

    setStep(prevStep => prevStep + 1); // Move to the next question
  };

  const handleNextCategory = () => {
    const categoryNames = Object.keys(categories);
    const currentIndex = categoryNames.indexOf(category);
    const isLastStep = step >= currentQuestions.length - 1;

    if (!isLastStep) {
      // Nästa fråga inom samma kategori
      setStep(prev => prev + 1);
    } else if (currentIndex < categoryNames.length - 1) {
      // Nästa kategori
      const nextCategory = categoryNames[currentIndex + 1];
      setCompletedCategories([...completedCategories, category]);
      setCategory(nextCategory);
      setStep(0);
    } else {
      // Sista frågan i sista kategorin → kör submit
      setCompletedCategories([...completedCategories, category]);
      setSubmitted(true);
    }
  };

  return (
    <div className="carbon-calculator">
      {!submitted ? (
        <div className="question-container">
          <h2 className="category-name">{category}</h2>
          <h2 className="question-title">{currentQuestions[step].label}</h2>

          <div className="slider-navigation">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="nav-button"
            >
              <MoveLeft size={32} className="nav-icon" />
            </button>

            <div className="slider-container">
              <div className="question-labels">
                {currentQuestions[step].marks ? (
                  Object.entries(currentQuestions[step].marks).map(([value, label]) => (
                    <span
                      key={value}
                      className={`question-label ${Math.abs(parseFloat(value) - formData[currentQuestions[step].name]) < 0.1
                        ? 'active'
                        : ''
                        }`}
                    >
                      {label}
                    </span>
                  ))
                ) : (
                  <div className="w-full flex justify-between">
                    <span className="food-question-label">{currentQuestions[step].min} {currentQuestions[step].unit}</span>
                    <span className="question-label">{currentQuestions[step].max} {currentQuestions[step].unit}</span>
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
                className="slider"
                style={{
                  background: `linear-gradient(to right, #49AB45 0%, #49AB45 ${((formData[currentQuestions[step].name] - currentQuestions[step].min) /
                    (currentQuestions[step].max - currentQuestions[step].min)) * 100
                    }%, #ccc ${((formData[currentQuestions[step].name] - currentQuestions[step].min) /
                      (currentQuestions[step].max - currentQuestions[step].min)) * 100
                    }%, #ccc 100%)`,
                }}
              />
              <div className="slider-value">
                {formData[currentQuestions[step].name]} {currentQuestions[step].unit}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (step < currentQuestions.length - 1) {
                  handleNextQuestion();
                } else {
                  handleNextCategory(); // byt till nästa kategori när det är sista frågan
                }
              }}
              disabled={!canProceed}
              className="nav-button"
            >
              <MoveRight size={32} className="nav-icon" />
            </button>
          </div>



          {allQuestionsAnswered() && (
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="calculate-button"
              >
                Calculate
              </button>
          )}

          {/* Always show category buttons under the questions */}
          <div className="category-selection">
            {Object.keys(categories).map((cat) => (
              <div key={cat} className="category-button-container">
                <button
                  onClick={() => handleCategorySwitch(cat)}
                  className={`category-button ${completedCategories.includes(cat) ? 'completed' : ''}`}
                >
                  <img src={`${cat.toLowerCase()}icon.svg`} alt={`${cat} Icon`} className="icon" />
                </button>
                <div className="category-progress-container">
                  <div
                    className="category-progress-bar"
                    style={{ width: `${calculateCategoryProgress(cat)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <>
          <div className="results-container">
            <p className="text-xl font-semibold">Your Estimated Carbon Footprint:</p>
            <p className="footprint-value">{calculateCarbonFootprint()} kg CO₂/year</p>

            <div className="fun-facts">
              {getFunFacts(parseFloat(calculateCarbonFootprint())).map((fact, index) => (
                <p key={index}>{fact}</p>
              ))}
            </div>
            <div className="percentile-text">
            You emit more CO₂ than approximately{" "}
            <span className="text-green-400 font-bold">{animatedPercentile}%</span>{" "}
            of the world population.
            <p className="chart-description">Carbon emissions compared to a typical global distribution</p>
          </div>
          </div>

          

          <div className="mt-8">
            
            <div className="chart-container">
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
            className="reset-button"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setCategory('TRANSPORTATION'); // Set to initial category instead of null
              setCompletedCategories([]);
              setFormData({
                kilometersPerWeek: -1,
                publicTransportPerWeek: -1,
                flightsPerYear: -1,
                fuelEfficiency: -1,
                redMeatPerWeek: -1,
                poultryPerWeek: -1,
                dairyPerWeek: -1,
                plantBasedMealsPerWeek: -1,
                clothingPurchasesPerYear: -1,
                electronicsPurchasesPerYear: -1,
                sustainablePurchasesPerMonth: -1,
                onlineShoppingDeliveriesPerMonth: -1,
                homeTemperatureWinter: -1,
                adultsInHousehold: -1,
                bedroomsInHousehold: -1,
                hotWaterUsagePerDay: -1,
              });
            }}
          >
            Try Again
          </button>
        </>
      )
      }
    </div >
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