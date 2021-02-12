import React, { useState, useEffect } from 'react'
import BeatsContainer from './BeatsContainer'
import BPMController from './BPMController'
import BeatsAmountController from './BeatsAmountController'
import TapTempo from './TapTempo';
const soundPath = require('../assets/sounds/boop.mp3')
const stressedSoundPath = require('../assets/sounds/stressedBoop.mp3')

const ContainerComponent: React.FC<{}> = () => {
  const [beats, setBeats] = useState<number[]>([0, 1, 2, 3]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [intervalValue, setintervalValue] = useState<number>(0);
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
      setActiveId(null)
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
    <>
      <h1>✨ Hello fellow musician ✨</h1>

      <button
        onClick={onButtonClick}
        className={
          !isActive
            ? 'waves-effect waves-light btn-large m5 teal accent-4'
            : 'waves-effect waves-light btn-large m5 blue-grey lighten-3'
        }
      >
        {!isActive ? 'Start' : 'Stop'}
      </button>
      <TapTempo
        updateIntervalsValue={updateIntervalsValue}
      />

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
    </>
  );
}

export default ContainerComponent;