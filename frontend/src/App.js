import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { React } from 'react';
import Login from './Pages/Loggin/Login';
import Landing from './Pages/LandingPage/Landing';
import RollSelector from './Pages/Rollselector/RollSelector.';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/rollselector" element={<RollSelector />} />
      </Routes>
      ,
    </BrowserRouter>
  );
}

export default App;
