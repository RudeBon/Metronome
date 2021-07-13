import React, { useState, useEffect } from 'react'
import BeatsContainer from './BeatsContainer'
import BPMController from './BPMController'
import BeatsAmountController from './BeatsAmountController'
import TapTempo from './TapTempo';
const soundPath = require('../assets/sounds/boop.mp3')
const stressedSoundPath = require('../assets/sounds/stressedBoop.mp3')

const ContainerComponent: React.FC<{}> = () => {
  const [beats, setBeats] = useState<number[]>(() => checkLocalstorageBeats());
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [intervalValue, setintervalValue] = useState<number | null>(() => checkLocalstorageInterval());
  const [timeout, setTimeout] = useState<any>(0);
  const [isStressed, setIsStressed] = useState<boolean>(false);

  const sound = new Audio(soundPath.default);
  const stressedSound = new Audio(stressedSoundPath.default);

  const playSound = (actual: number | null) => {
    if (isStressed && actual === 0) {
      stressedSound.play()
    } else {
      sound.play();
    }
  }

  function checkLocalstorageInterval(): number {
    const intervalFromLocalstorage = localStorage.getItem('interval');
    if (intervalFromLocalstorage != null) {
      return +intervalFromLocalstorage;
    } else {
      return 760;
    }
  }

  function checkLocalstorageBeats(): number[] {
    const beatsFromLocalstorage = localStorage.getItem('beats');
    if (beatsFromLocalstorage != null) {
      return JSON.parse(beatsFromLocalstorage);
    } else {
      return [0, 1, 2, 3];
    }
  }  

  const handleKeyEvents = () => {
    window.addEventListener('keypress', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        setIsActive(prev => !prev)
        if (isActive) {
          setActiveId(null)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'w') {
        if (intervalValue != null) {
          setintervalValue(prev => prev! + 1);
          localStorage.setItem('interval', intervalValue.toString())
        }
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        if (intervalValue != null) {
          setintervalValue(prev => prev! - 1);
          localStorage.setItem('interval', intervalValue.toString())
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        setBeats(prev => prev.slice(0, prev.length - 1));
        localStorage.setItem('beats', JSON.stringify(beats))
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setBeats(prev => prev.concat(prev.length));
        localStorage.setItem('beats', JSON.stringify(beats))
      }
    });
  }

  useEffect(() => {
    handleKeyEvents();
  }, [])

  const intervalCallback = () => {
    let actual = null
    setActiveId(activeId => {
      if (activeId! >= beats.length - 1 || activeId === null) {
        actual = 0
        return actual
      }
      actual = activeId! + 1;
      return actual
    });
    playSound(actual)
  }

  useEffect(() => {
    if (isActive && timeout !== 0) {
      clearInterval(timeout);
      setTimeout(window.setInterval(intervalCallback, intervalValue!))
    } else if (isActive && timeout === 0) {
      setTimeout(window.setInterval(intervalCallback, intervalValue!))
    } else if (!isActive) {
      clearInterval(timeout);
      setTimeout(0)
    }

    return () => clearInterval(timeout);
  }, [isActive, isStressed, activeId, intervalValue])

  const onButtonClick = (event: React.MouseEvent) => {
    setIsActive(prev => !prev)
    if (isActive) {
      setActiveId(null)
    }
  }

  const updateIntervalsValue = (value: number) => {
    setintervalValue(value)
    localStorage.setItem('interval', value.toString())
  }
  const updateBeats = (value: number[]) => {
    setBeats(value);
    localStorage.setItem('beats', JSON.stringify(value))
  }
  const onToggle = () => {
    setIsStressed(prev => !prev)
  }

  return (
    <div className="mobile-grid-container">
      <h1>✨ Hello fellow musician ✨</h1>
      <button
        onClick={onButtonClick}
        className={
          isActive
            ? 'waves-effect waves-light btn-large m5 blue-grey lighten-3'
            : 'waves-effect waves-light btn-large m5 teal accent-4'
        }
      >
        {isActive ? 'Stop' : 'Start'}
      </button>
      <TapTempo
        updateIntervalsValue={updateIntervalsValue}
      />

      <BPMController
        updateIntervalsValue={updateIntervalsValue}
        intervalValue={intervalValue}
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

export default ContainerComponent;