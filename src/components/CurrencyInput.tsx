import React from 'react';

interface CurrencyInputProps {
  id: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder: string;
  error?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove any non-numeric characters except the decimal point
    const numericValue = inputValue.replace(/[^\d.]/g, '');
    
    // Parse the numeric value to a number
    const parsedValue = parseFloat(numericValue);
    
    // Check if the parsed value is a valid number
    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    } else if (numericValue === '' || numericValue === '.') {
      onChange(null);
    }
  };

  const formatCurrency = (value: number | null): string => {
    if (value === null) return '';
    
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(value);
  };

  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">Kz</span>
        </div>
        <input
          type="text"
          id={id}
          value={value !== null ? value.toLocaleString('pt-AO') : ''}
          onChange={handleChange}
          onBlur={() => value !== null && onChange(Math.max(0, value))}
          className={`block w-full pr-12 pl-10 py-3 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {value !== null && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{formatCurrency(value).split('Kz')[1]}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};