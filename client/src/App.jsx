
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SendPage from './pages/SendPage';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/send' element={<SendPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
