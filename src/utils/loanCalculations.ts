export interface LoanCalculationResult {
  requestedAmount: number;
  monthlyPayment: number;
  isEligible: boolean;
  salaryPercentage: number;
  suggestedAmount: number;
}

export const calculateLoan = (
  netSalary: number,
  requestedAmount: number
): LoanCalculationResult => {
  const interestRate = 0.032; // 3.2% monthly interest
  const months = 12; // 1 year term
  const salaryThreshold = 0.4; // 40% of net salary
  
  // Calculate monthly payment with interest
  // Using the formula: PMT = P * r * (1 + r)^n / ((1 + r)^n - 1)
  // Where PMT = monthly payment, P = principal, r = interest rate, n = number of payments
  
  const monthlyInterestRate = interestRate;
  const factor = Math.pow(1 + monthlyInterestRate, months);
  const monthlyPayment = (requestedAmount * monthlyInterestRate * factor) / (factor - 1);
  
  // Calculate what percentage of salary the payment represents
  const salaryPercentage = monthlyPayment / netSalary;
  
  // Check if payment exceeds 40% of salary
  const isEligible = salaryPercentage <= salaryThreshold;
  
  // If not eligible, calculate a suggested amount that would fit
  let suggestedAmount = 0;
  
  if (!isEligible) {
    // Calculate maximum affordable monthly payment
    const maxMonthlyPayment = netSalary * salaryThreshold;
    
    // Reverse the formula to find the maximum loan amount
    // P = PMT * ((1 + r)^n - 1) / (r * (1 + r)^n)
    suggestedAmount = maxMonthlyPayment * (factor - 1) / (monthlyInterestRate * factor);
  }
  
  return {
    requestedAmount,
    monthlyPayment,
    isEligible,
    salaryPercentage,
    suggestedAmount
  };
};