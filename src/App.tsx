import React, { useState } from 'react';
import Login from './components/Login';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      {loggedIn ? (
        <MainPage onLogout={() => setLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;