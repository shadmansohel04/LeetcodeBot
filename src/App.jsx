import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import GameStart from './pages/gameStart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<GamePage />} />
        <Route path='/lobby' element={<GameStart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
