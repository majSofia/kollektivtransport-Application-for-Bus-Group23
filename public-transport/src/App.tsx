import React, { useState } from 'react';
import Login from './Components/logInPage';
import CreateNewUser from './Components/userPage';
import HomePage from './Components/homePage';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'create'>('login');

  return (
    <>
      {currentPage === 'login' ? (
        <Login onCreateAccount={() => setCurrentPage('create')} />
      ) : (
        <CreateNewUser onBackToLogin={() => setCurrentPage('login')} />
      )}

      
    </>
  );
};

export default App;