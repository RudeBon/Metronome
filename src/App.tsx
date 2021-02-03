import React, { useState, useEffect } from 'react'
import './App.css';
import BeatsContainer from './components/BeatsContainer'
import BPMController from './components/BPMController'
import BeatsAmountController from './components/beatsAmountController'
import { SoundComponent } from './components/soundSomponent';
const boopPath = require('./assets/sounds/boop.mp3')
const stressedBoopPath = require('./assets/sounds/stressedBoop.mp3')

const App: React.FC = () => {
  const [beats, setBeats] = useState<number[]>([0, 1, 2, 3]);
  const [activeId, setActiveId] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [intervalValue, setintervalValue] = useState<number>(0);
  const [timeout, setTimeout] = useState(0);
  const [isStressed, setIsStressed] = useState<boolean>(false)

  const boop = new Audio(boopPath.default);
  const stressedBoop = new Audio(stressedBoopPath.default);  

  useEffect(() => {
    if (isActive) {
      setTimeout(window.setInterval(() => {        
        setActiveId(activeId => {
          if (activeId >= beats.length - 1) {
            return 0
          }
          return activeId + 1;
        });
        boop.play();
        if(isStressed && activeId === 0) {
          stressedBoop.play()
          console.log('stressed boop', activeId);      
        } else {
          boop.play();
          console.log('boop', activeId); 
        }
      }, intervalValue))
    } else if (!isActive) {
      clearInterval(timeout);
    }
    return () => clearInterval(timeout);
  }, [isActive])

  useEffect(() => {
  }, [intervalValue])

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
    if (isActive) {
      setActiveId(0)
    }
  }

  const updateIntervalsValue = (value: number) => {
    setintervalValue(value)
  }
  const updateBeats = (value: number[]) => {
    setBeats(value)
  }
  const onToggle = () => {
    setIsStressed(prev => !prev)
  }

  return (
    <div className="App">
      <h1>✨ Hello fellow musician ✨</h1>

      {/* {!isActive
        ? <button onClick={startTicking}>Start</button>
        : <button onClick={stopTicking}>Stop</button>} */}

      <button onClick={onButtonClick}>{!isActive ? 'Start' : 'Stop'}</button>
      <button onClick={() => { boop.play(); console.log('boop'); }}>play audio</button>

      <SoundComponent />

      <BPMController
        isActive={isActive}
        updateIntervalsValue={updateIntervalsValue}
      />
      <BeatsAmountController
        updateBeats={updateBeats}
        beats={beats}
        isActive={isActive}
      />
      <input type="checkbox" checked={isStressed} onChange={() => onToggle()} /><span>Stress 1st beat</span>
      <BeatsContainer
        beats={beats}
        activeId={activeId}
        isStressed={isStressed} />
    </div>
  );
}

export default App;