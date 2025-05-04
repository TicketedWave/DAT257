import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { CategorySelector } from '../calculator/components/CategorySelector';

describe('CategorySelector', () => {
  const mockCategories = { Math: {}, Science: {} };
  const mockCompleted = ['Math'];
  const mockProgress = { Math: 100, Science: 50 };
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
        currentCategory="Math"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('icon-Math')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Science')).toBeInTheDocument();
  });

  it('calls onCategoryChange when a button is clicked', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="Math"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    fireEvent.click(screen.getByTestId('button-Science'));
    expect(onCategoryChange).toHaveBeenCalledWith('Science');
  });

  it('adds completed class to completed category buttons', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="Math"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('button-Math')).toHaveClass('completed');
    expect(screen.getByTestId('button-Science')).not.toHaveClass('completed');
  });

  it('sets correct progress bar widths', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="Math"
        completedCategories={mockCompleted}
        categoryProgress={mockProgress}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('progress-Math')).toHaveStyle('width: 100%');
    expect(screen.getByTestId('progress-Science')).toHaveStyle('width: 50%');
  });

  it('falls back to calculateCategoryProgress when categoryProgress is null', () => {
    render(
      <CategorySelector
        categories={mockCategories}
        currentCategory="Science"
        completedCategories={[]}
        categoryProgress={null}
        onCategoryChange={onCategoryChange}
        calculateCategoryProgress={calculateCategoryProgress}
      />
    );
    expect(screen.getByTestId('progress-Science')).toHaveStyle('width: 50%');
  });
});
