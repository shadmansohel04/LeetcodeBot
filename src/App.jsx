import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import GameStart from './pages/gameStart';
import HomePage from './pages/homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/lobby' element={<GameStart />} />
        <Route path='/lobby/game' element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
