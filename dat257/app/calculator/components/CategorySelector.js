import React from 'react';
import PropTypes from 'prop-types';

export const CategorySelector = ({
  categories,
  currentCategory,
  completedCategories,
  categoryProgress,
  onCategoryChange,
  calculateCategoryProgress,
}) => {
  return (
    <div className="category-selection">
      {Object.keys(categories).map((cat) => {
        const isCompleted = completedCategories.includes(cat);
        const progress = categoryProgress
          ? categoryProgress[cat]
          : calculateCategoryProgress(cat);

        return (
          <div key={cat} className="category-button-container">
            <button
              data-testid={`button-${cat}`}
              className={`category-button ${isCompleted ? 'completed' : ''} ${
                currentCategory === cat ? 'active' : ''
              }`}
              onClick={() => onCategoryChange(cat)}
            >
              
              <img src={`${cat.toLowerCase()}-icon.svg`} alt={`${cat} Icon`} className="icon" />
            </button>
            <div className="category-progress-container">
              <div
                data-testid={`progress-${cat}`}
                className="category-progress-bar"
                style={{ width: `${calculateCategoryProgress(cat)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

CategorySelector.propTypes = {
  categories: PropTypes.object.isRequired,
  currentCategory: PropTypes.string.isRequired,
  completedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryProgress: PropTypes.object,
  onCategoryChange: PropTypes.func.isRequired,
  calculateCategoryProgress: PropTypes.func,
};

CategorySelector.defaultProps = {
  categoryProgress: null,
  calculateCategoryProgress: () => 0,
};
