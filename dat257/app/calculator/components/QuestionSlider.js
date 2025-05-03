import React from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';

export const QuestionSlider = ({
  currentQuestion,
  value,
  onChange,
  onNext,
  onPrev,
  canProceed
}) => {
  return (
    <div className="slider-navigation">
      <button
        type="button"
        onClick={onPrev}
        disabled={!onPrev}
        className="nav-button"
      >
        <MoveLeft size={32} className="nav-icon" />
      </button>

      <div className="slider-container">
        <div className="question-labels">
          {currentQuestion.marks ? (
            Object.entries(currentQuestion.marks).map(([value, label]) => (
              <span
                key={value}
                className={`question-label ${Math.abs(parseFloat(value) - value) < 0.1 ? 'active' : ''}`}
              >
                {label}
              </span>
            ))
          ) : (
            <div className="w-full flex justify-between">
              <span className="food-question-label">{currentQuestion.min} {currentQuestion.unit}</span>
              <span className="question-label">{currentQuestion.max} {currentQuestion.unit}</span>
            </div>
          )}
        </div>
        <input
          type="range"
          name={currentQuestion.name}
          min={currentQuestion.min}
          max={currentQuestion.max}
          step={currentQuestion.step}
          value={value}
          onChange={onChange}
          className="slider"
          style={{
            background: `linear-gradient(to right,rgb(0, 188, 177) 3%,rgb(65, 255, 72) ${
              ((value - currentQuestion.min) / (currentQuestion.max - currentQuestion.min)) * 100
            }%, #ccc ${
              ((value - currentQuestion.min) / (currentQuestion.max - currentQuestion.min)) * 100
            }%, #ccc 100%)`,
          }}
        />
        <div className="slider-value">
          {value === -1
            ? "Drag the slider"
            : `${value} ${currentQuestion.unit}`}
        </div>
      </div>

      <button
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