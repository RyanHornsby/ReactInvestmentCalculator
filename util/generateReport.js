import jsPDF from 'jspdf';

export function generatePDF(data, yearlyMonthly, currentCurrency){
    const doc = new jsPDF();
    console.log(data);

    doc.setFontSize(20);
    doc.text('Investment Report', 10, 10);
    doc.setFontSize(12);
    let yOffset = 25;
    const linespacing = 10;
    const pageHeight = doc.internal.pageSize.height
    data.forEach((result) =>{
        console.log(result);
        if (yOffset+50 > pageHeight){
            doc.addPage();
            yOffset = 20;
        } doc.text(`Year: ${result.year}`, 10, yOffset)
        if (yearlyMonthly === "Yearly") {
            doc.text(`Year: ${result.year}`, 10, yOffset)
        }
        else {            
            doc.text(`Year: ${result.year}, month: ${result.month}`, 10, yOffset)
        }          
        doc.text(`Interest (Year): ${currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}${result.interest.toFixed(2)}`, 10, (yOffset+linespacing))
        doc.text(`Interest (Total): ${currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}${result.totalInterest.toFixed(2)}`, 10, (yOffset+2*linespacing))
        doc.text(`Invested Capital: ${currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}${result.investedCapital.toFixed(2)}`, 10, (yOffset+3*linespacing))
        doc.text(`Total Investment Value: ${currentCurrency==="GBP" ? "£" : currentCurrency==="USD" ? "$" : "€"}${result.investmentValue.toFixed(2)}`, 10, (yOffset+4*linespacing))

        yOffset+=60;
    })
    doc.save('Investment Report.pdf')
}