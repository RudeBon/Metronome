import React from 'react'
import './App.css';
import BeatsVisual from './components/BeatsVisual'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>✨ Hello fellow musician ✨</h1>  
      <BeatsVisual/>
    </div>
  );
}

export default App;