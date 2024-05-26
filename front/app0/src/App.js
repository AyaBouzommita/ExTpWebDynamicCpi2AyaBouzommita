// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './page/inscription';
import Home from './page/home.jsx';
import Navbar from './composents/navbar.jsx';
import Login from './page/login.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='container'>
          <Routes> 
            <Route path="/login" element={<Login />} />  
            <Route path="/" element={<Inscription />} /> 
            <Route path="/Home" element={<Home />} />{/* Set the default path to Inscription component */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
