import React from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import AdminPage from './Components/AdminPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
