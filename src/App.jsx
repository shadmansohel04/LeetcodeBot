import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage.jsx';
import UserDash from './pages/dash.jsx';
import BoostPage from './pages/boostPage.jsx';
import GameStart from './pages/starter.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/lobby' element={<GameStart />} />
        <Route path='/dash' element={<UserDash />}/>
        <Route path="/boost" element={<BoostPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
