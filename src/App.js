// Import utilities
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import LoginForm from './components/LoginForm';
import Search from './components/Search';

// Import styling
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginForm} />
        <Route path="/search" Component={Search}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

//TODO
/**
 * protected routes
 */