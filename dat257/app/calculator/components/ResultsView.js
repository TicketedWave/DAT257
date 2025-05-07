import React from 'react';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
/*
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';

import {
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer as BarResponsiveContainer,
} from 'recharts';
*/

export const ResultsView = ({
  footprint,
  funFacts,
  percentile,
  curveData,
  closestPoint,
  barChartData,
  onReset,
}) => {
  return (
    <>
      <div className="results-container">
        <p className="text-xl font-semibold">Your Estimated Carbon Footprint:</p>
        <p data-testid="footprint-value" className="footprint-value">
          {footprint} kg CO₂/year
        </p>

        <div data-testid="fun-facts" className="fun-facts">
          {funFacts.map((fact, idx) => (
            <p key={idx} data-testid={`fun-fact-${idx}`}>
              {fact}
            </p>
          ))}
        </div>
      </div>

      <div className="charts-section">
        {/* Linjediagram med beskrivning */}
        <div className="chart-group">
          <p className="chart-description">
            Carbon emissions compared to a typical global distribution
          </p>
          <div data-testid="chart-container" className="chart-container" aria-label="carbon-distribution-chart">
            <LineChartComponent data={curveData} closestPoint={closestPoint} />
          </div>
          <div className="percentile-text">
            You emit more CO₂ than approximately{' '}
            <span data-testid="percentile-value" className="text-green-400 font-bold">
              {percentile}%
            </span>{' '}
            of the world population.
          </div>
        </div>

        <div className="chart-group">
          <p className="chart-description">
            How your footprint compares globally
          </p>
          <div className="bar-container">
          <BarChartComponent data={barChartData} />
          </div>
          <div className="percentile-text"> </div>
        </div>
      </div>

      <button
        data-testid="reset-button"
        className="reset-button"
        onClick={onReset}
      >
        Try Again
      </button>
    </>
  );
};
