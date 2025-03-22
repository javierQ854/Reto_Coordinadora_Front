import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
