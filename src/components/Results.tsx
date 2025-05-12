import React, { useState, useRef } from 'react';
import { LoanCalculationResult } from '../utils/loanCalculations';
import { PaymentSchedule } from './PaymentSchedule';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

interface ResultsProps {
  results: LoanCalculationResult;
  netSalary: number;
}

export const Results: React.FC<ResultsProps> = ({ results, netSalary }) => {
  const [showPaymentSchedule, setShowPaymentSchedule] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(value);
  };

  return (
    <div ref={printRef} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg animate-fadeIn">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Resultado da Simulação</h2>
          <button
            onClick={handlePrint}
            className="flex items-center botao px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-8">
          <div className="flex-1 border rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Salário Líquido</p>
            <p className="text-lg font-semibold">{formatCurrency(netSalary)}</p>
          </div>
          
          <div className="flex-1 border rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Valor Solicitado</p>
            <p className="text-lg font-semibold">{formatCurrency(results.requestedAmount)}</p>
          </div>
          
          <div className="flex-1 border rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Pagamento Mensal</p>
            <p className="text-lg font-semibold">{formatCurrency(results.monthlyPayment)}</p>
          </div>
          
          <div className="flex-1 border rounded-xl p-4 bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Taxa de Juros</p>
            <p className="text-lg font-semibold">3,2% ao mês</p>
          </div>
        </div>

        <div className={`p-6 rounded-xl mb-8 ${
          results.isEligible 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {results.isEligible ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-lg font-medium ${
                results.isEligible ? 'text-green-800' : 'text-amber-800'
              }`}>
                {results.isEligible 
                  ? 'Empréstimo Aprovado' 
                  : 'Ajuste Necessário'}
              </h3>
              <div className={`mt-2 text-sm ${
                results.isEligible ? 'text-green-700' : 'text-amber-700'
              }`}>
                <p>
                  {results.isEligible 
                    ? `O valor da parcela mensal corresponde a ${(results.salaryPercentage * 100).toLocaleString('pt-AO', { maximumFractionDigits: 2 })}% do seu salário líquido, dentro do limite de 40%.` 
                    : `O valor da parcela mensal corresponde a ${(results.salaryPercentage * 100).toLocaleString('pt-AO', { maximumFractionDigits: 2 })}% do seu salário líquido, excedendo o limite de 40%. Considere solicitar um valor menor.`}
                </p>
                {!results.isEligible && results.suggestedAmount > 0 && (
                  <p className="mt-2">
                    <strong>Sugestão:</strong> Para manter-se dentro do limite de 40%, considere solicitar até {formatCurrency(results.suggestedAmount)}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-1 mb-8">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-600">
                Comprometimento da Renda
              </span>
            </div>
            <div className="text-right">
              <span style={{color: '#283734'}} className="text-xs font-semibold inline-block text-blue-600">
                {(results.salaryPercentage * 100).toLocaleString('pt-AO', { maximumFractionDigits: 2 })}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${Math.min(results.salaryPercentage * 100, 100)}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                results.isEligible ? 'bg-green-500' : 'bg-amber-500'
              }`}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span className={results.isEligible ? 'text-green-600 font-medium' : 'text-gray-500'}>20%</span>
            <span className={`${results.isEligible ? 'text-green-600' : 'text-amber-600'} font-medium`}>40%</span>
            <span className="text-amber-600 font-medium">60%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          onClick={() => setShowPaymentSchedule(!showPaymentSchedule)}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left text-gray-700 font-medium transition-colors"
        >
          <span>Cronograma de Pagamentos</span>
          {showPaymentSchedule ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {showPaymentSchedule && (
          <div className="mt-4 animate-slideDown">
            <PaymentSchedule
              monthlyPayment={results.monthlyPayment}
              requestedAmount={results.requestedAmount}
              interestRate={0.032}
            />
          </div>
        )}
      </div>
    </div>
  );
};