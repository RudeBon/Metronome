import React, {useState} from 'react'
import './App.css';
import BeatsContainer from './components/BeatsContainer'

const App: React.FC = () => {
 

  return (
    <div className="App">
      <h1>✨ Hello fellow musician ✨</h1>  
      <BeatsContainer/>
    </div>
  );
}

export default App;