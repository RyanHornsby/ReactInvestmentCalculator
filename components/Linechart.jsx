import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../stylesheets/Linechart.css'

const Linechart = ({data, yearlyMonthly, currentCurrency}) => {

return (
    <ResponsiveContainer width="100%" height={400} className="linechart">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={yearlyMonthly==="Yearly" ? "year" : "month"} label={{ value: yearlyMonthly==="Yearly" ? "Year" : "Month", position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: `Investment Value (${currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"})`, angle: -90, position: 'insideLeft', offset: -10 }} />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{marginTop: -10}}/>
        <Line type="monotone" dataKey="investmentValue" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Linechart
