// QuestionSlider.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuestionSlider } from '../calculator/components/QuestionSlider';


describe('<QuestionSlider />', () => {
  const baseQuestion = {
    name: 'test-slider',
    min: 0,
    max: 10,
    step: 1,
    unit: 'units',
  };

  it('renders min/max labels when no marks provided', () => {
    const { getByTestId } = render(
      <QuestionSlider
        currentQuestion={baseQuestion}
        value={-1}
        onChange={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
        canProceed={false}
      />
    );
    expect(getByTestId('label-min')).toHaveTextContent('0 units');
    expect(getByTestId('label-max')).toHaveTextContent('10 units');
    expect(getByTestId('slider-value')).toHaveTextContent('Drag the slider');
  });

  it('calls onChange when slider moves', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <QuestionSlider
        currentQuestion={baseQuestion}
        value={5}
        onChange={handleChange}
        onNext={() => {}}
        onPrev={() => {}}
        canProceed={true}
      />
    );
    fireEvent.change(getByTestId('slider-input'), { target: { value: '7' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables prev button when onPrev is falsy', () => {
    const { getByTestId } = render(
      <QuestionSlider
        currentQuestion={baseQuestion}
        value={2}
        onChange={() => {}}
        onNext={() => {}}
        onPrev={null}
        canProceed={true}
      />
    );
    expect(getByTestId('prev-button')).toBeDisabled();
  });

  it('disables next button when canProceed is false', () => {
    const { getByTestId } = render(
      <QuestionSlider
        currentQuestion={baseQuestion}
        value={2}
        onChange={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
        canProceed={false}
      />
    );
    expect(getByTestId('next-button')).toBeDisabled();
  });

  it('renders custom marks and adds active class to current mark', () => {
    const marksQuestion = {
      ...baseQuestion,
      marks: { 0: 'Zero', 5: 'Mid', 10: 'Ten' },
    };
    const { getByTestId } = render(
      <QuestionSlider
        currentQuestion={marksQuestion}
        value={5}
        onChange={() => {}}
        onNext={() => {}}
        onPrev={() => {}}
        canProceed={true}
      />
    );

    const midLabel = getByTestId('label-5');
    expect(midLabel).toHaveTextContent('Mid');
    expect(midLabel).toHaveClass('active');

    expect(getByTestId('label-0')).toHaveTextContent('Zero');
    expect(getByTestId('label-10')).toHaveTextContent('Ten');
  });
});
