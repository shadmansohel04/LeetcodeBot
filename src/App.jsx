import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameStart from './pages/gameStart';
import HomePage from './pages/homepage';
import UserDash from './pages/dash';
import BoostPage from './pages/boostPage';

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
