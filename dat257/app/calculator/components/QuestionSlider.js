import React from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';

/**
 * Computes the slider's background gradient for a given value.
 */
export function computeSliderBackground({ value, min, max }) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(
    to right,
    rgb(0, 188, 177) 3%,
    rgb(65, 255, 72) ${pct}%,
    #ccc ${pct}%,
    #ccc 100%
  )`;
}

export const QuestionSlider = ({
  currentQuestion,
  value,
  onChange,
  onNext,
  onPrev,
  canProceed
}) => {
  const { min, max, step, unit, name, marks } = currentQuestion;
  return (
    <div data-testid="slider-navigation" className="slider-navigation">
      <button
        data-testid="prev-button"
        type="button"
        onClick={onPrev}
        disabled={!onPrev}
        className="nav-button"
      >
        <MoveLeft size={32} className="nav-icon" />
      </button>

      <div data-testid="slider-container" className="slider-container">
        <div data-testid="question-labels" className="question-labels">
          {marks ? (
            Object.entries(marks).map(([val, label]) => (
              <span
                key={val}
                data-testid={`label-${val}`}
                className={`question-label ${
                  Math.abs(parseFloat(val) - value) < 0.1 ? 'active' : ''
                }`}
              >
                {label}
              </span>
            ))
          ) : (
            <div className="w-full flex justify-between">
              <span data-testid="label-min" className="food-question-label">
                {min} {unit}
              </span>
              <span data-testid="label-max" className="question-label">
                {max} {unit}
              </span>
            </div>
          )}
        </div>

        <input
          data-testid="slider-input"
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="slider"
          style={{ background: computeSliderBackground({ value, min, max }) }}
        />

        <div data-testid="slider-value" className="slider-value">
          {value === -1 ? 'Drag the slider' : `${value} ${unit}`}
        </div>
      </div>

      <button
        data-testid="next-button"
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className="nav-button"
      >
        <MoveRight size={32} className="nav-icon" />
      </button>
    </div>
  );
};
