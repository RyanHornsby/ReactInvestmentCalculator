export function calculateInvestmentResults(
    {
        initialInvestment,
        annualInvestment,
        expectedReturn,
        duration
    }, yearlyMonthly
){
    const annualData=[{
        year: 0,
        month: 0,
        interest: 0,
        investmentValue: initialInvestment,
        totalInterest:0,
        investedCapital: initialInvestment,
    }];
    let investmentValue=initialInvestment;
    let totalInterest = 0;
    let investedCap = initialInvestment;

    if (yearlyMonthly === "Yearly") {
        for (let i = 0; i< duration; i++){
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        totalInterest += interestEarnedInYear;
        investedCap += annualInvestment;
        investmentValue += interestEarnedInYear + annualInvestment;
        annualData.push({
            year: i+1,
            interest: interestEarnedInYear,
            investmentValue: investmentValue,
            totalInterest: totalInterest,
            investedCapital: investedCap,
        });
    }
    }
    else {
        for (let i = 0; i<duration/12; i++){
            for (let j=1; j<13; j++) {
                const interestEarnedInMonth = investmentValue * (expectedReturn / 100);
                totalInterest += interestEarnedInMonth;
                investedCap += annualInvestment;
                investmentValue += interestEarnedInMonth + annualInvestment;
                annualData.push({
                    year: i,
                    month: j,
                    interest: interestEarnedInMonth,
                    investmentValue: investmentValue,
                    totalInterest: totalInterest,
                    investedCapital: investedCap,
                });
            }
    }
    };
    
    return annualData
}