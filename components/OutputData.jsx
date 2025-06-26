import React from 'react';
import { calculateInvestmentResults } from '../util/investment';
import '../stylesheets/OutputData.css'
import Linechart from './Linechart';

const OutputData = ({ inputValue, currentCurrency, yearlyMonthly }) => {
  const resultData = calculateInvestmentResults({
  initialInvestment: +inputValue.initialInvestment,
  annualInvestment: +inputValue.annualInvestment,
  expectedReturn: +inputValue.expectedReturn,
  duration: +inputValue.duration
  }, yearlyMonthly);

  return (
  <section id="results">
    <table>
      <thead>
        <tr>
          <th>Year</th>
          {yearlyMonthly === "Monthly" ? <th>Month</th> : ""}
          <th>Investment Value</th>
          <th>Interest ({yearlyMonthly === "Yearly" ? "Year" : "Month"})</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultData.map((yearData, index) => (
          <tr key={index}>
            <td>{yearData.year}</td>
            {yearlyMonthly === "Monthly" ? <td>{yearData.month}</td> : ""}
            <td>{currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}{yearData.investmentValue.toFixed(2)}</td>
            <td>{currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}{yearData.interest.toFixed(2)}</td>
            <td>{currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}{yearData.totalInterest.toFixed(2)}</td>
            <td>{currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}{yearData.investedCapital.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Linechart data={resultData} yearlyMonthly={yearlyMonthly} currentCurrency={currentCurrency}/>
  </section>
);
};

export default OutputData;