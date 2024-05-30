import React from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import AdminPage from './Components/AdminPage';
import LoginSignup from './Components/LoginSignup/LoginSignup';


function App() {
  return (
    <div className='App'>
      {/* <HomePage /> */}
      <LoginSignup />
    </div>
  );
}

export default App;
