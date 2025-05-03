import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 },
  { name: 'Jul', value: 349 },
];
const FannelChart = () => {


  
  return (
  
    <div>
       <ResponsiveContainer width="100%" height={300}> 
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" /> 
        <XAxis dataKey="name" /> 
        <YAxis /> 
        <Tooltip /> 
        <Legend /> 
        <Line type="monotone" dataKey="value" stroke="#8884d8" /> 
       </LineChart>
    </ResponsiveContainer>

  
</div>
   
  );
};

export default FannelChart;
