import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';

export const ResultsView = ({
  footprint,
  funFacts,
  percentile,
  curveData,
  closestPoint,
  onReset,
}) => {
  return (
    <>
      <div className="results-container">
        <p className="text-xl font-semibold">Your Estimated Carbon Footprint:</p>
        <p
          data-testid="footprint-value"
          className="footprint-value"
        >
          {footprint} kg CO₂/year
        </p>

        <div data-testid="fun-facts" className="fun-facts">
          {funFacts.map((fact, idx) => (
            <p key={idx} data-testid={`fun-fact-${idx}`}>
              {fact}
            </p>
          ))}
        </div>

        <div className="percentile-text">
          You emit more CO₂ than approximately{' '}
          <span
            data-testid="percentile-value"
            className="text-green-400 font-bold"
          >
            {percentile}%
          </span>{' '}
          of the world population.
          <p className="chart-description">
            Carbon emissions compared to a typical global distribution
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div
          data-testid="chart-container"
          className="chart-container"
          aria-label="carbon-distribution-chart"
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={curveData}>
              <XAxis
                dataKey="x"
                tick={{ fill: '#ccc', fontSize: 12 }}
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                domain={[0, 20000]}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip
                formatter={(value) => value.toFixed(5)}
                labelFormatter={(label) =>
                  `${label.toLocaleString()} kg CO₂`
                }
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#4ade80',
                  color: 'white',
                }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#4ade80"
                strokeWidth={3}
                dot={false}
              />
              <ReferenceDot
                x={closestPoint.x}
                y={closestPoint.y}
                r={8}
                fill="#ffffff"
                stroke="#4ade80"
                strokeWidth={3}
                isFront
                label={{
                  value: 'You',
                  position: 'top',
                  fill: '#fff',
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
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
