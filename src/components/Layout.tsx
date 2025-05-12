import React, { ReactNode } from 'react';
import './style.css';
import logo from './logosite.png';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="verde shadow-sm" style={{
        display: 'flex',
        justifyContent: 'center', // centraliza horizontalmente
        alignItems: 'center',     // centraliza verticalmente
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        color: 'white',
        textAlign: 'center',
        padding: '10px'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} RMARCA • Todos Direitos Reservados
          </p>
        </div>
      </footer>
    </div>
  );
};