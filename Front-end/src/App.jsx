import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Inicio from './Components/Inicio/Inicio'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={null} />
        <Route path="/Inicio" element={<Inicio/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
