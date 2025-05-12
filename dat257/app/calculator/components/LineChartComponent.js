import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceDot,
    ResponsiveContainer
} from 'recharts';

const LineChartComponent = ({ data, closestPoint }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
    );
};

export default LineChartComponent;