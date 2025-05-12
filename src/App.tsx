import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoanSimulator } from './components/LoanSimulator';
import { WelcomePage } from './components/WelcomePage';

interface EmployeeInfo {
  firstName: string;
  lastName: string;
}

function App() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null);

  const handleEmployeeSubmit = (info: EmployeeInfo) => {
    setEmployeeInfo(info);
  };

  return (
    <Layout>
      {!employeeInfo ? (
        <WelcomePage onSubmit={handleEmployeeSubmit} />
      ) : (
        <LoanSimulator employeeInfo={employeeInfo} />
      )}
    </Layout>
  );
}

export default App;