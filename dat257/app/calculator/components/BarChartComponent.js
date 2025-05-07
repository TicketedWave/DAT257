import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const BarChartComponent = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
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
    );
};

export default BarChartComponent;