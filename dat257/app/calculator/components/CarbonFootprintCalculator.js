'use client';
import React, { useState, useEffect } from 'react';
import { categories, initialFormData } from './constants';
import {
  calculateCarbonFootprint,
  getFunFacts,
  generateNormalDistribution,
  getPercentile,
  fetchCountryData,
  prepareBarChartData,
  detectUserCountry
} from './utils';
import { QuestionSlider } from './QuestionSlider';
import { CategorySelector } from './CategorySelector';
import { ResultsView } from './ResultsView';
import DownloadCarbonEstimate from './DownloadCarbonData';
import './CarbonFootprintCalculator.css';
import CountrySelector from './CountrySelector';

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [animatedPercentile, setAnimatedPercentile] = useState(0);
  const [category, setCategory] = useState('TRANSPORTATION');
  const [completedCategories, setCompletedCategories] = useState([]);
  const [categoryProgress, setCategoryProgress] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([
    'United States of America',
    'India',
    'China',
    'Germany'
  ]);
  const [allCountries, setAllCountries] = useState([]);
  const [userCountry, setUserCountry] = useState(null);

  const currentQuestions = categories[category] || [];
  const currentQuestion = currentQuestions[step];
  const canProceed = formData[currentQuestion?.name] > -1;

  /**
   * The function `calculateCategoryProgress` calculates the progress percentage of answered questions
   * in a specific category.
   * @param categoryName - The `categoryName` parameter is a string that represents the name of a
   * category for which you want to calculate the progress.
   * @returns The function `calculateCategoryProgress` returns the progress percentage of answered
   * questions in a specific category.
   */
  const calculateCategoryProgress = (categoryName) => {
    const categoryQuestions = categories[categoryName];
    if (!categoryQuestions) return 0;

    const answeredQuestions = categoryQuestions.filter(
      question => formData[question.name] > -1
    ).length;

    return (answeredQuestions / categoryQuestions.length) * 100;
  };

/**
 * The function `allQuestionsAnswered` checks if all questions in each category have been answered in a
 * form.
 * @returns The function `allQuestionsAnswered` is returning a boolean value.
 */
  const allQuestionsAnswered = () => {
    return Object.keys(categories).every(categoryName => 
      categories[categoryName].every(question => formData[question.name] > -1)
    );
  };

  const userEmission = calculateCarbonFootprint(formData);



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

  useEffect(() => {
    if (submitted) {
      const loadData = async () => {
        try {
          const countryData = await fetchCountryData();
          let detectedCountry;

          try {
            detectedCountry = await detectUserCountry();
          } catch (error) {
            console.log('Country detection failed, using default countries');
            detectedCountry = null;
          }

          setAllCountries(countryData);
          if (detectedCountry) {
            setUserCountry(detectedCountry);
          }
          

          const preparedData = prepareBarChartData(
            countryData,
            userEmission,
            selectedCountries,
            detectedCountry
          );
          setBarChartData(preparedData);
        } catch (error) {
          console.error('Error loading data:', error);
          setBarChartData([]);
        }
      };

      loadData();
    }
  }, [submitted, userEmission, selectedCountries]);

  useEffect(() => {
    const initializeUserCountry = async () => {
      try {
        const detectedCountry = await detectUserCountry();
        if (detectedCountry) {
          setUserCountry(detectedCountry);
          setSelectedCountries(prev => [...prev, detectedCountry]);
        }
      } catch (error) {
        console.error('Error detecting country:', error);
      }
    };
  
    initializeUserCountry();
  }, []);

  const handleCountrySelectionChange = (newSelection) => {
    setSelectedCountries(newSelection);
  };

  const handleOpenCountrySelector = () => {
    setIsCountrySelectorOpen(true);
  };

/**
 * The handleChange function updates a form data object by setting a specific key to the parsed float
 * value of an input element's value.
 * @param e - The `e` parameter in the `handleChange` function is an event object that represents the
 * event being handled, such as a change event on an input field. It contains information about the
 * event, including the target element that triggered the event (in this case, an input field), and the
 * value of
 */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

/**
 * The `handleCategorySwitch` function checks if all questions in the current category are answered and
 * updates the completed categories list before switching to a new category and setting the step
 * progress.
 * @param newCategory - The `newCategory` parameter in the `handleCategorySwitch` function represents
 * the category that the user wants to switch to.
 */
  const handleCategorySwitch = (newCategory) => {
    const allQuestionsAnswered = categories[category].every(
      (_, index) => formData[categories[category][index].name] > -1
    );

    if (allQuestionsAnswered && !completedCategories.includes(category)) {
      setCompletedCategories([...completedCategories, category]);
    }

    setCategory(newCategory);
    setStep(categoryProgress[newCategory] || 0);
  };

/**
 * The function `handleNextQuestion` updates the progress for a specific category and increments the
 * step count by 1.
 */
  const handleNextQuestion = () => {
    setCategoryProgress(prevProgress => ({
      ...prevProgress,
      [category]: step + 1
    }));
    setStep(prevStep => prevStep + 1);
  };

/**
 * The function `handleNextCategory` in JavaScript manages the navigation between categories and steps
 * based on completion status.
 */
  const handleNextCategory = () => {
    const categoryNames = Object.keys(categories);
    const currentIndex = categoryNames.indexOf(category);
    const isLastStep = step >= currentQuestions.length - 1;
    const isCurrentCategoryComplete = categories[category].every(
      question => formData[question.name] > -1
    );

    if (!isLastStep && isCurrentCategoryComplete) {
      setStep(prev => prev + 1);
    } else if (isCurrentCategoryComplete) {
      setCompletedCategories([...completedCategories, category]);
      //Check if all categories are completed
      const allCategoriesCompleted = Object.keys(categories).every(categoryName => 
        completedCategories.includes(categoryName)
      );
      if (allCategoriesCompleted) {
        setSubmitted(true);
      } else {
        //Go to the first incomplete category
        const incompleteCategory = Object.keys(categories).find(cat =>
          categories[cat].some(q => formData[q.name] <= -1)
        );
        if (incompleteCategory) {
          setCategory(incompleteCategory);
          //Also update the step to the correct step based on the incompleted category already answered
          setStep(categories[incompleteCategory].findIndex(q => formData[q.name] <= -1));
        }

      }

    } else if (currentIndex < categoryNames.length - 1) {
      const nextCategory = categoryNames[currentIndex + 1];
      setCompletedCategories([...completedCategories, category]);
      setCategory(nextCategory);
      setStep(0);
    } else {
      const updatedCompleted = [...new Set([...completedCategories, category])];
      setCompletedCategories(updatedCompleted);
      console.log("updatedCompleted", updatedCompleted);
      if (allQuestionsAnswered()) {
        setSubmitted(true);
      } else {
        // Go to the first incomplete category
        const incompleteCategory = Object.keys(categories).find(cat =>
          categories[cat].some(q => formData[q.name] <= -1)
        );
        console.log(incompleteCategory);
        if (incompleteCategory) {
          setCategory("incompleteCategory", incompleteCategory);
          setStep(0);
        }
      }
    }
  };


  const curveData = generateNormalDistribution();
  const closestPoint = curveData.reduce((prev, curr) =>
    Math.abs(curr.x - userEmission) < Math.abs(prev.x - userEmission) ? curr : prev
  );

  /**
   * The `resetCalculator` function resets various states and sets default countries including the
   * user's country.
   */
  const resetCalculator = async () => {
    setSubmitted(false);
    setStep(0);
    setCategory('TRANSPORTATION');
    setCompletedCategories([]);
    setFormData(initialFormData);

    const defaultCountries = [
      'United States of America',
      'India',
      'China',
      'Germany',
      userCountry
    ].filter(Boolean);
    
    setSelectedCountries([...new Set(defaultCountries)]);
  };

  return (
    <div className="carbon-calculator">
      {!submitted ? (
        <div className="question-container">
          <div className="category-icon">
            <img
              src={`/${category.toLowerCase()}-icon.svg`}
              alt={`${category} Icon`}
              className="category-icon-image"
            />
          </div>
          <h2 className="category-name">{category}</h2>
          <h2 className="question-title">{currentQuestion.label}</h2>

          <QuestionSlider
            currentQuestion={currentQuestion}
            value={formData[currentQuestion.name]}
            onChange={handleChange}
            onNext={() => {
              if (step < currentQuestions.length - 1) {
                handleNextQuestion();
              } else {
                handleNextCategory();
              }
            }}
            onPrev={() => setStep((prev) => Math.max(0, prev - 1))}
            canProceed={canProceed}
          />

          {allQuestionsAnswered() && (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="calculate-button"
            >
              Calculate
            </button>
          )}

          <CategorySelector
            categories={categories}
            currentCategory={category}
            completedCategories={completedCategories}
            categoryProgress={categoryProgress}
            onCategoryChange={handleCategorySwitch}
            calculateCategoryProgress={calculateCategoryProgress}
          />
        </div>
      ) : (
        <>
          <ResultsView
            footprint={userEmission}
            funFacts={getFunFacts(parseFloat(userEmission))}
            percentile={animatedPercentile}
            curveData={curveData}
            closestPoint={closestPoint}
            barChartData={barChartData}
            userCountry={userCountry}
            onReset={resetCalculator}
            onOpenCountrySelector={handleOpenCountrySelector}
          />
          <DownloadCarbonEstimate estimate={userEmission} />
          <CountrySelector
            allCountries={allCountries}
            selectedCountries={selectedCountries}
            onCountrySelectionChange={handleCountrySelectionChange}
            isOpen={isCountrySelectorOpen}
            onClose={() => setIsCountrySelectorOpen(false)}
            userCountry={userCountry}
          />
        </>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;