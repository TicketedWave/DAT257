import React from 'react';

export const CategorySelector = ({
  categories,
  currentCategory,
  completedCategories,
  categoryProgress,
  onCategoryChange,
  calculateCategoryProgress
}) => {
  return (
    <div className="category-selection">
      {Object.keys(categories).map((cat) => (
        <div key={cat} className="category-button-container">
          <button
            onClick={() => onCategoryChange(cat)}
            className={`category-button ${completedCategories.includes(cat) ? 'completed' : ''}`}
          >
            <img src={`${cat.toLowerCase()}-icon.svg`} alt={`${cat} Icon`} className="icon" />
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
  );
};