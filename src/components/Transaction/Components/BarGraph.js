import React from 'react';

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, CartesianAxis } from 'recharts';

export default function BarGraph(data) {

    const array = data.dataArray;

    array.map(sum => {
        
        switch (sum.month) {
            case 1:
                sum.date = "january " + sum.year;
                break;

            case 2:
                sum.date = "february " + sum.year;
                break;
            
            case 3:
                sum.date = "march " + sum.year;
                break;

            case 4:
                sum.date = "april " + sum.year;
                break;

            case 5:
                sum.date = "may " + sum.year;
                break;

            case 6:
                sum.date = "june " + sum.year;
                break;
            
            case 7:
                sum.date = "july " + sum.year;
                break;

            case 8:
                sum.date = "august " + sum.year;
                break;

            case 9:
                sum.date = "september " + sum.year;
                break;

            case 10:
                sum.date = "october " + sum.year;
                break;

            case 11:
                sum.date = "november " + sum.year;
                break;

            case 12:
                sum.date = "december " + sum.year;
                break;
        
            default:
                break;
        }
    });

    return (
        
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart 
                    data={array}
                >
                    <CartesianGrid
                        vertical={false}
                    />
                    <Line 
                        type="natural"
                        dataKey="sum"
                        stroke="#136f63"
                        strokeWidth={3}
                    />
                    <XAxis 
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip />
                    <CartesianAxis
                        tick={false} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );
  
};