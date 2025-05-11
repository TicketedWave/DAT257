'use client';
import React, { useState, useEffect } from 'react';
import { categories, initialFormData } from './constants';
import {
  calculateCarbonFootprint,
  getFunFacts,
  generateNormalDistribution,
  getPercentile
} from './utils';
import { QuestionSlider } from './QuestionSlider';
import { CategorySelector } from './CategorySelector';
import { ResultsView } from './ResultsView';
import DownloadCarbonEstimate from './DownloadCarbonData';
import './CarbonFootprintCalculator.css';

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [animatedPercentile, setAnimatedPercentile] = useState(0);
  const [category, setCategory] = useState('TRANSPORTATION');
  const [completedCategories, setCompletedCategories] = useState([]);
  const [categoryProgress, setCategoryProgress] = useState({});

  const currentQuestions = categories[category] || [];
  const currentQuestion = currentQuestions[step];
  const canProceed = formData[currentQuestion?.name] > -1;

  const calculateCategoryProgress = (categoryName) => {
    const categoryQuestions = categories[categoryName];
    if (!categoryQuestions) return 0;

    const answeredQuestions = categoryQuestions.filter(
      question => formData[question.name] > -1
    ).length;

    return (answeredQuestions / categoryQuestions.length) * 100;
  };

  const allQuestionsAnswered = () => {
    return Object.keys(categories).every(categoryName => 
      categories[categoryName].every(question => formData[question.name] > -1)
    );
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

  const handleNextQuestion = () => {
    setCategoryProgress(prevProgress => ({
      ...prevProgress,
      [category]: step + 1
    }));
    setStep(prevStep => prevStep + 1);
  };

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

  const userEmission = calculateCarbonFootprint(formData);
  const curveData = generateNormalDistribution();
  const closestPoint = curveData.reduce((prev, curr) =>
    Math.abs(curr.x - userEmission) < Math.abs(prev.x - userEmission) ? curr : prev
  );

  const resetCalculator = () => {
    setSubmitted(false);
    setStep(0);
    setCategory('TRANSPORTATION');
    setCompletedCategories([]);
    setFormData(initialFormData);
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
            onReset={resetCalculator}
          />
          <DownloadCarbonEstimate estimate={userEmission} />
        </>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;