import React, { useState, useEffect, useRef } from 'react'
// import SingleBeatBlock from './SingleBeatBlock'

const BeatsContainer: React.FC = () => {
    const [beats, setBeats] = useState<number[]>([0, 1, 2, 3, 4]);

    const [timeout, setTimeout] = useState(0);
    const [activeId, setActiveId] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);

    const [intervalValue, setintervalValue] = useState<number>(2000);

    useEffect(() => {
        console.log('after mounting isTicking', isActive);

        // let interval = null
        if (isActive) {
            setTimeout(window.setInterval(() => {
                setActiveId(activeId => activeId + 1);
                console.log('tick', activeId);
            }, intervalValue))
        } else if (!isActive /*&& seconds !== 0*/) {
            clearInterval(timeout);
        }
        return () => clearInterval(timeout);
    }, [isActive, activeId])


    const beatBlocks = () => {
        return beats.map((num) => {
            const classes = ['beat']
            if (num === activeId) {
                classes.push('activeBeat')
            }
            console.log(num);
            return <li key={num} >
                <div className={classes.join(' ')}></div>
                {/* <SingleBeatBlock/> */}
            </li>
        })
    }

    const startTicking = (event: React.MouseEvent) => {
        setIsActive(true)
        console.log('after click on btn', isActive);
        // const ticker = setInterval(() => {
        //     console.log('tick');
        // }, intervalValue)
    }

    const stopTicking = (event: React.MouseEvent) => {
        setIsActive(false)
        // setActiveId(0)      
        console.log('after click on btn', isActive);
        // clearInterval(ticker)       
    }

    // const onButtonClick = () => {
    //     setIsTicking(prev => !prev)
    //     console.log('after click on btn', isTicking);

    //     const ticker = setInterval(() => {
    //                 console.log('tick');
    //             }, intervalValue)
    //     if (!isTicking) {
    //         clearInterval(ticker)
    //         console.log('interval stop');            
    //     }
    // }

    return (
        <div className="beatsBlock">
            <h3>Actual beat: {activeId}</h3>
            <ul className='beats_ul'>
                {beatBlocks()}
            </ul>

            {!isActive
                ? <button onClick={startTicking}>Start</button>
                : <button onClick={stopTicking}>Stop</button>}

            {/* <button onClick={onButtonClick}>{!isTicking ? 'Start' : 'Stop'}</button> */}
        </div>
    )
}

export default BeatsContainer; 