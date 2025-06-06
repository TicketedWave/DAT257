import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';

/**
 * The `BarChartComponent` function renders a responsive bar chart with customized axes, tooltips,
 * legend, and bars colored based on emissions data and user's country.
 * @returns The `BarChartComponent` functional component is being returned. It renders a responsive bar
 * chart using the provided data and user's country information. The chart includes X and Y axes,
 * tooltip with custom formatting, legend, and bars representing CO₂ emissions for different countries.
 * The color of the bars is customized based on whether the country matches the user's country or if it
 * represents the user themselves.
 */
const BarChartComponent = ({ data, userCountry }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 0, right: 30, left: 0, bottom: 10 }}
            >
                <XAxis dataKey="id" tick={{ fill: '#ccc', fontSize: 14 }}
                    tickFormatter={(value) => value === 'YOU' ? 'You' : value}
                />

                <YAxis tick={{ fill: '#ccc', fontSize: 14 }} />
                <Tooltip
                    formatter={(value) => `${value} kg CO₂`}
                    labelFormatter={(label) => {
                        if (label === "You") {
                            return "Your emissions";
                        }
                        const country = data.find(item => item.id === label || item.name === label);
                        return country ? country.name : label;
                    }}
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
                    name="CO₂ emission"
                    fill="#4ade80"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                    activeBar={{ fill: '#ffffff' }}

                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                entry.id === 'YOU' ? '#4ade80' :
                                    userCountry && entry.name === userCountry ? '#4ade80' : 
                                        '#4ade80'
                            }
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;