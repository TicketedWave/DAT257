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
    <div className="category-selector">
      {Object.keys(categories).map((cat) => {
        const isCompleted = completedCategories.includes(cat);
        const progress = categoryProgress
          ? categoryProgress[cat]
          : calculateCategoryProgress(cat);

        return (
          <div key={cat} className="category-item">
            <button
              data-testid={`button-${cat}`}
              className={`category-button ${isCompleted ? 'completed' : ''} ${
                currentCategory === cat ? 'active' : ''
              }`}
              onClick={() => onCategoryChange(cat)}
            >
              {/* Example icon placeholder, replace with actual icon component if needed */}
              <span data-testid={`icon-${cat}`} className="category-icon">
                {cat.charAt(0)}
              </span>
            </button>
            <div className="progress-bar-container">
              <div
                data-testid={`progress-${cat}`}
                className="progress-bar"
                style={{ width: `${progress}%` }}
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
