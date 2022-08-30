import React from 'react';

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, CartesianAxis } from 'recharts';

export default function LineGraph(data) {

    const array = data.dataArray;

    array.map(sum => {
        
        switch (sum.month) {
            case 1:
                sum.date = sum.year + "-01";
                break;

            case 2:
                sum.date = sum.year + "-02";
                break;
            
            case 3:
                sum.date = sum.year + "-03";
                break;

            case 4:
                sum.date = sum.year + "-04";
                break;

            case 5:
                sum.date = sum.year + "-05";
                break;

            case 6:
                sum.date = sum.year + "-06";
                break;
            
            case 7:
                sum.date = sum.year + "-07";
                break;

            case 8:
                sum.date = sum.year + "-08";
                break;

            case 9:
                sum.date = sum.year + "-09";
                break;

            case 10:
                sum.date = sum.year + "-10";
                break;

            case 11:
                sum.date = sum.year + "-11";
                break;

            case 12:
                sum.date = sum.year + "-12";
                break;
        
            default:
                break;
        }
    });

    return (
        
        <div style={{ width: '99.9%', height: 300 }}>
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