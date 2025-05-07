//import React, { useEffect, useState } from 'react';
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
            <ResponsiveContainer width="100%" height="100%">
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 0, right: 30, left: 0, bottom: 10 }}
              >
                <XAxis dataKey="name" tick={{ fill: '#ccc', fontSize: 14 }} />

                <YAxis tick={{ fill: '#ccc', fontSize: 14 }} />
                <Tooltip
                  formatter={(value) => `${value} kg CO₂`}
                  labelFormatter={(label) => label}
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderColor: '#4ade80',
                    color: 'white',
                  }}
                  cursor={{ fill: 'transparent' }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{
                    paddingBottom: 20,
                    marginTop: 20,
                  }}
                />
                <Bar
                  dataKey="emissions"
                  name="CO₂ emissions per capita"
                  fill="#4ade80"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                  activeBar={{ fill: '#ffffff' }}
                />
              </BarChart>
            </ResponsiveContainer>
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
