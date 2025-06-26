import React, {useState} from 'react';
import '../stylesheets/UserInput.css'

const UserInput = ({userInput, setUserInput, currentCurrency, setCurrentCurrency, handleChange, yearlyMonthly, setYearlyMonthly, runPDF}) => {
    // Converts to the selected currency. Should have done currentCurrency on outside and convertTo on inside tbh
    // Would have made more sense logically
    const convertCurrency = async (convertTo) => {
        console.log(`currentCurrency: ${currentCurrency}, convertTo: ${convertTo}.`);
        // Runs a fetch to an API to get latest conversion rates.
        // Does mean they don't quite go to round nummbers when converting back. I round to 2d.p.
        let rate;
        const cc = currentCurrency.toLowerCase();
        const ct = convertTo.toLowerCase();
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${cc}.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch exchange rate');
                }
                const answer = await response.json();
                rate = answer[cc][ct]; 
            } catch (err) {
                console.error(err.message);
                return;
            };
            
            console.log(`Rate: ${rate}`);

            switch(convertTo) {
                case "GBP":
                    switch(currentCurrency) {
                        case "USD":
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                ["initialInvestment"]: parseFloat(userInput.initialInvestment*rate).toFixed(2),
                                ["annualInvestment"]: parseFloat(userInput.annualInvestment*rate).toFixed(2)
                            }));
                            break;
                        case "EUR":
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                ["initialInvestment"]: parseFloat(userInput.initialInvestment*rate).toFixed(2),
                                ["annualInvestment"]: parseFloat(userInput.annualInvestment*rate).toFixed(2)
                            }));
                            break;
                    }
                    setCurrentCurrency("GBP");
                    break;
                case "USD":
                    switch(currentCurrency) {
                        case "GBP":
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                ["initialInvestment"]: parseFloat(userInput.initialInvestment*rate).toFixed(2),
                                ["annualInvestment"]: parseFloat(userInput.annualInvestment*rate).toFixed(2)
                            }));
                            break;
                        case "EUR":
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                ["initialInvestment"]: parseFloat(userInput.initialInvestment*rate).toFixed(2),
                                ["annualInvestment"]: parseFloat(userInput.annualInvestment*rate).toFixed(2)
                            }));
                            break;  
                    }
                    setCurrentCurrency("USD");
                    break;
                case "EUR":
                    switch(currentCurrency) {
                        case "GBP":
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                ["initialInvestment"]: parseFloat(userInput.initialInvestment*rate).toFixed(2),
                                ["annualInvestment"]: parseFloat(userInput.annualInvestment*rate).toFixed(2)
                            }));
                            break;
                        case "USD":
                            setUserInput((prevUserInput) => ({
                                ...prevUserInput,
                                ["initialInvestment"]: parseFloat(userInput.initialInvestment*rate).toFixed(2),
                                ["annualInvestment"]: parseFloat(userInput.annualInvestment*rate).toFixed(2)
                            }));
                            break;
                    }
                    setCurrentCurrency("EUR");
                    break;
            };    
        };
    // Handles changes when toggling between yearly and monthly
    const toggleMonthlyYearly = (e) => {
        if (e.target.checked) {
            setYearlyMonthly("Monthly");
            setUserInput((prevUserInput) => ({
                ...prevUserInput,
                // Nice formatting to get rid of unecessary d.p. etc
                ["annualInvestment"]: parseFloat((userInput.annualInvestment/12).toFixed(2)).toString(),
                ["expectedReturn"]: parseFloat((userInput.expectedReturn/12).toFixed(2)).toString(),
                ["duration"]: userInput.duration*12,
            }));
        }
        else {
            setYearlyMonthly("Yearly");
            setUserInput((prevUserInput) => ({
                ...prevUserInput,
                // Nice formatting to get rid of unecessary d.p. etc
                ["annualInvestment"]: parseFloat((userInput.annualInvestment*12).toFixed(2)).toString(),
                ["expectedReturn"]: parseFloat((userInput.expectedReturn*12).toFixed(2)).toString(),
                ["duration"]: (userInput.duration/12).toFixed(0),
            }));
        }
    }
    // Resets all values
    const resetValues = () => {
        setUserInput(
            {
                initialInvestment: 10000,
                annualInvestment: 1200,
                expectedReturn: 6,
                duration: 10
            }
        )
        setCurrentCurrency("GBP");
    };

  return (
    <div id="inputContainer">
        <section id="user-input">
        <form>
            <div className="input-group">
                {/*Sets the symbol based on the current currency*/}
                <label htmlFor="initialInvestment">Initial Investment ({currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"})</label>
                <input 
                type="number" 
                id="initialInvestment"
                // The .toString() prevents the user from typing leading zeroes
                value={userInput.initialInvestment.toString()}
                required
                min="0"
                onChange={(e) => handleChange('initialInvestment', e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="annualInvestment">{yearlyMonthly === "Yearly" ? "Annual" : "Monthly"} Investment ({currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"})</label>
                <input 
                type="number" 
                id="annualInvestment"
                value={userInput.annualInvestment.toString()}
                required
                min="0"
                onChange={(e) => handleChange('annualInvestment', e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="expectedReturn">Expected Return (%)</label>
                <input 
                type="number" 
                id="expectedReturn"
                value={userInput.expectedReturn.toString()}
                required
                min="0"
                onChange={(e) => handleChange('expectedReturn', e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="duration">Duration ({yearlyMonthly === "Yearly" ? "years" : "months"})</label>
                <input 
                type="number" 
                id="duration"
                value={userInput.duration.toString()}
                required
                min="0"
                onChange={(e) => handleChange('duration', e.target.value)}
                />
            </div>
            <div id="button-controls">
                <button type="button" id="resetButton" onClick={() => resetValues()}>Reset</button>
                <div id="conversionButtons">
                    {/*className is set to "selectedButton" if it is the current currency*/}
                    <button type="button" className={currentCurrency==="GBP" ? "selectedButton" : ""} id="toPounds" onClick={() => convertCurrency("GBP")}>£</button>
                    <button type="button" className={currentCurrency==="USD" ? "selectedButton" : ""} id="toDollars" onClick={() => convertCurrency("USD")}>$</button>
                    <button type="button" className={currentCurrency==="EUR" ? "selectedButton" : ""} id="toEuros" onClick={() => convertCurrency("EUR")}>€</button>
                </div>
                <div id="toggle-switch">
                    <p>{`${yearlyMonthly}\u00A0`}</p>
                    <label className="switch">
                        <input type="checkbox" onChange={(e)=>toggleMonthlyYearly(e)}/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </form>
        </section>
        <button type="button" id="generateButton" onClick={()=>runPDF()}>Generate PDF</button>
    </div>
  );
};

export default UserInput; 