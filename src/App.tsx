import React, { useState, useEffect } from 'react'
import './App.css';
import BeatsContainer from './components/BeatsContainer'

const App: React.FC = () => {
  const [beats, setBeats] = useState<number[]>([0, 1, 2, 3]);

  const [timeout, setTimeout] = useState(0);
  const [activeId, setActiveId] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [intervalValue, setintervalValue] = useState<number>(500);

  useEffect(() => {
    if (isActive) {
      setTimeout(window.setInterval(() => {
        setActiveId(activeId => {
          if (activeId >= beats.length - 1) {
            return 0
          } return activeId + 1;
        });
      }, intervalValue))
    } else if (!isActive) {
      clearInterval(timeout);
    }
    return () => clearInterval(timeout);
  }, [isActive])

  // const startTicking = (event: React.MouseEvent) => {
  //     setIsActive(true)
  //     console.log('after click on btn', isActive);
  //     // const ticker = setInterval(() => {
  //     //     console.log('tick');
  //     // }, intervalValue)
  // }

  // const stopTicking = (event: React.MouseEvent) => {
  //     setIsActive(false)
  //     // setActiveId(0)      
  //     console.log('after click on btn', isActive);
  //     // clearInterval(ticker)       
  // }

  const onButtonClick = (event: React.MouseEvent) => {
    setIsActive(prev => !prev)
  }

  return (
    <div className="App">
      <h1>✨ Hello fellow musician ✨</h1>
      <BeatsContainer beats={beats} activeId={activeId} />

      {/* {!isActive
        ? <button onClick={startTicking}>Start</button>
        : <button onClick={stopTicking}>Stop</button>} */}

      <button onClick={onButtonClick}>{!isActive ? 'Start' : 'Stop'}</button>
    </div>

  );
}

export default App;