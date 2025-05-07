import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { CategorySelector } from '../calculator/components/CategorySelector';

describe('CategorySelector', () => {
  const mockCategories = { TRANSPORTATION: {}, SHOPPING: {} };
  const mockCompleted = ['TRANSPORTATION'];
  const mockProgress = { TRANSPORTATION: 100, SHOPPING: 50 };
  const onCategoryChange = jest.fn();
  const calculateCategoryProgress = (cat) => mockProgress[cat];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders all category icons', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="TRANSPORTATION"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByAltText('TRANSPORTATION Icon')).toBeInTheDocument();
    expect(screen.getByAltText('SHOPPING Icon')).toBeInTheDocument();
  });

  it('calls onCategoryChange when a button is clicked', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="TRANSPORTATION"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    fireEvent.click(screen.getByTestId('button-SHOPPING'));
    expect(onCategoryChange).toHaveBeenCalledWith('SHOPPING');
  });

  it('adds completed class to completed category buttons', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="TRANSPORTATION"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('button-TRANSPORTATION')).toHaveClass('completed');
    expect(screen.getByTestId('button-SHOPPING')).not.toHaveClass('completed');
  });

  it('sets correct progress bar widths', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="TRANSPORTATION"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('progress-TRANSPORTATION')).toHaveStyle('width: 100%');
    expect(screen.getByTestId('progress-SHOPPING')).toHaveStyle('width: 50%');
  });

  it('falls back to calculateCategoryProgress when categoryProgress is null', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="SHOPPING"
        completedCategories={[]}
        categoryProgress={null}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('progress-SHOPPING')).toHaveStyle('width: 50%');
  });
});
