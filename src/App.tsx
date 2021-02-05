import React, { useState, useEffect } from 'react'
import './App.css';
import BeatsContainer from './components/BeatsContainer'
import BPMController from './components/BPMController'
import BeatsAmountController from './components/BeatsAmountController'
const soundPath = require('./assets/sounds/boop.mp3')
const stressedSoundPath = require('./assets/sounds/stressedBoop.mp3')

const App: React.FC = () => {
  const [beats, setBeats] = useState<number[]>([0, 1, 2, 3]);
  const [activeId, setActiveId] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [intervalValue, setintervalValue] = useState<number>(0);
  const [timeout, setTimeout] = useState<any>(0);
  const [isStressed, setIsStressed] = useState<boolean>(false);

  const sound = new Audio(soundPath.default);
  const stressedSound = new Audio(stressedSoundPath.default);

  const playSound = () => {
    if (isStressed && activeId === 0) {
      stressedSound.play()
      console.log('stressed sound', activeId);
    } else {
      sound.play();
      console.log('sound', activeId);
    }
  }

  const intervalCallback = () => {
    playSound()
    setActiveId(activeId => {
      if (activeId >= beats.length - 1) {
        return 0
      }
      return activeId + 1;
    });
  }

  useEffect(() => {
    if (isActive && timeout !== 0) {
      clearInterval(timeout);
      setTimeout(window.setInterval(intervalCallback, intervalValue))
    } else if (isActive && timeout === 0) {
      setTimeout(window.setInterval(intervalCallback, intervalValue))
    } else if (!isActive) {
      clearInterval(timeout);
      setTimeout(0)
    }

    return () => clearInterval(timeout);
  }, [isActive, isStressed, activeId, intervalValue])

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

      <button
        onClick={onButtonClick}
        className={
          !isActive
            ? 'waves-effect waves-light btn-large teal accent-4'
            : 'waves-effect waves-light btn-large blue-grey lighten-3'
        }
      >
        {!isActive ? 'Start' : 'Stop'}
      </button>

      <BPMController
        updateIntervalsValue={updateIntervalsValue}
      />
      <div className='flex'>
        <label>
          <input
            type="checkbox"
            checked={isStressed}
            onChange={() => onToggle()}
          />
          <span>Stress 1st beat</span>
        </label>
        <BeatsAmountController
          updateBeats={updateBeats}
          beats={beats}
        />
      </div>

      <BeatsContainer
        beats={beats}
        activeId={activeId}
        isStressed={isStressed} />
    </div>
  );
}

export default App;