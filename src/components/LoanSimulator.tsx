import React, { useState } from 'react';
import { CurrencyInput } from './CurrencyInput';
import { Results } from './Results';
import { calculateLoan } from '../utils/loanCalculations';

interface LoanSimulatorProps {
  employeeInfo: {
    firstName: string;
    lastName: string;
  };
}

export const LoanSimulator: React.FC<LoanSimulatorProps> = ({ employeeInfo }) => {
  const [netSalary, setNetSalary] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [results, setResults] = useState<ReturnType<typeof calculateLoan> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    netSalary: '',
    loanAmount: ''
  });

  const validateInputs = (): boolean => {
    let isValid = true;
    const newErrors = { netSalary: '', loanAmount: '' };

    if (!netSalary || netSalary <= 0) {
      newErrors.netSalary = 'Por favor, insira um salário líquido válido.';
      isValid = false;
    }

    if (!loanAmount || loanAmount <= 0) {
      newErrors.loanAmount = 'Por favor, insira um valor de empréstimo válido.';
      isValid = false;
    }

    setErrorMessages(newErrors);
    return isValid;
  };

  const handleSimulate = () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      if (netSalary && loanAmount) {
        const calculationResults = calculateLoan(netSalary, loanAmount);
        setResults(calculationResults);
      }
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setNetSalary(null);
    setLoanAmount(null);
    setResults(null);
    setErrorMessages({ netSalary: '', loanAmount: '' });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Simulador de Crédito</h2>
            <p className="text-gray-600">
              Colaborador: {employeeInfo.firstName} {employeeInfo.lastName}
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="netSalary" className="block text-sm font-medium text-gray-700 mb-1">
                Salário Líquido
              </label>
              <CurrencyInput
                id="netSalary"
                value={netSalary}
                onChange={setNetSalary}
                placeholder="Kz 0,00"
                error={errorMessages.netSalary}
              />
            </div>
            
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Valor Solicitado para Crédito
              </label>
              <CurrencyInput
                id="loanAmount"
                value={loanAmount}
                onChange={setLoanAmount}
                placeholder="Kz 0,00"
                error={errorMessages.loanAmount}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleSimulate}
                disabled={isCalculating}
                className="w-full botao sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculando...
                  </span>
                ) : (
                  'Simular Crédito'
                )}
              </button>
              
              {results && (
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Nova Simulação
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {results && <Results results={results} netSalary={netSalary || 0} />}
    </div>
  );
};