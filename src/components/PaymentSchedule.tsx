import React from 'react';

interface PaymentScheduleProps {
  monthlyPayment: number;
  requestedAmount: number;
  interestRate: number;
}

export const PaymentSchedule: React.FC<PaymentScheduleProps> = ({
  monthlyPayment,
  requestedAmount,
  interestRate
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(value);
  };

  // Calculate the amortization schedule
  const calculateSchedule = () => {
    let remainingBalance = requestedAmount;
    const payments = [];
    
    for (let month = 1; month <= 12; month++) {
      const interestPayment = remainingBalance * interestRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      // Handle the last payment to ensure the balance goes to exactly zero
      const adjustedPrincipalPayment = month === 12 ? remainingBalance : principalPayment;
      const adjustedMonthlyPayment = adjustedPrincipalPayment + interestPayment;
      
      remainingBalance -= adjustedPrincipalPayment;
      
      payments.push({
        month,
        payment: adjustedMonthlyPayment,
        principal: adjustedPrincipalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance) // Ensure we never show negative balance
      });
    }
    
    return payments;
  };

  const schedule = calculateSchedule();
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mês
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pagamento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Principal
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Juros (3,2%)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Saldo Restante
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedule.map((payment) => (
            <tr key={payment.month} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {payment.month}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(payment.payment)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(payment.principal)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(payment.interest)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(payment.remainingBalance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};