import {React, useState} from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import OutputData from './components/OutputData';
import { calculateInvestmentResults } from './util/investment';
import { generatePDF } from './util/generateReport';

function App() {
  const [userInput, setUserInput] = useState({
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
});
const [currentCurrency, setCurrentCurrency] = useState("GBP");
const [yearlyMonthly, setYearlyMonthly] = useState("Yearly");
const nonNegativeDuration = userInput.duration >= 0

// Updates to show the new values
const handleChange = (inputIdentifier, newValue) => {
  setUserInput((prevUserInput) => ({
    ...prevUserInput,
    [inputIdentifier]: +newValue
  }));
};
// Runs the generate pdf function
const runPDF = () => {
    const resultData = calculateInvestmentResults({
    initialInvestment: +userInput.initialInvestment,
    annualInvestment: +userInput.annualInvestment,
    expectedReturn: +userInput.expectedReturn,
    duration: +userInput.duration
    }, yearlyMonthly);

    generatePDF(resultData, yearlyMonthly, currentCurrency);
}

  return (
    <div>
      <Header title="Investment Calculator" subtitle="Earning you money."/>
      <UserInput userInput={userInput} setUserInput={setUserInput} currentCurrency={currentCurrency} setCurrentCurrency={setCurrentCurrency} handleChange={handleChange} yearlyMonthly={yearlyMonthly} setYearlyMonthly={setYearlyMonthly} runPDF={runPDF}/>
      {!nonNegativeDuration ? 
      <p style={{textAlign:"center"}}>Please put a non-negative value for the duration.</p>:
      <OutputData inputValue={userInput} currentCurrency={currentCurrency} yearlyMonthly={yearlyMonthly}/>}
    </div>
  );
}

export default App;