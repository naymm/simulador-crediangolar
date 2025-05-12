import React, { useState } from 'react';
import { Users } from 'lucide-react';
import './style.css';

interface WelcomePageProps {
  onSubmit: (info: { firstName: string; lastName: string }) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });

  const validateForm = () => {
    const newErrors = {
      firstName: firstName.trim() ? '' : 'Por favor, insira seu primeiro nome',
      lastName: lastName.trim() ? '' : 'Por favor, insira seu último nome'
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ firstName: firstName.trim(), lastName: lastName.trim() });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 animate-fadeIn">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full mb-4 icone">
            <Users className="h-12 w-12 text-blue-600 iconelucid" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Bem-vindo ao <br></br> Simulador de Crédito
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Por favor, insira seus dados para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Primeiro Nome
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`block w-full px-4 py-3 rounded-lg border ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              } focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Digite seu primeiro nome" autoComplete="off" name="firstName"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Último Nome
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`block w-full px-4 py-3 rounded-lg border ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              } focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Digite seu último nome" autoComplete="off" name="lastName"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white botao rounded-lg font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continuar para Simulação
          </button>
        </form>
      </div>
    </div>
  );
};