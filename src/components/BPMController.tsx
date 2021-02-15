import React, { useState, useEffect, useRef } from 'react'

type BPMControllerProps = {
    updateIntervalsValue(value: number): void,
    intervalValue: number
}

const BPMController: React.FC<BPMControllerProps> = ({ updateIntervalsValue, intervalValue }) => {
    const [bpm, setBPM] = useState<number>(80);
    const [displayNumber, setDisplayNumber] = useState<number>(80);
    const maxBpm: number = 260;
    const minBpm: number = 20;
    const rangeRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        let i = 60000 / intervalValue + 1;
        rangeRef.current!.value = i.toString();
        setDisplayNumber(Math.round(i))
    }, [intervalValue])

    useEffect(() => {
        console.log('bpm value has changed', bpm);
        rangeRef.current!.value = bpm.toString();
        updateIntervalsValue(60000 / (bpm - 1))        
        setDisplayNumber(Math.round(bpm))
    }, [bpm])

    const changeIntervalsValue = (e: React.FormEvent<HTMLInputElement>) => {
        setBPM(+e.currentTarget.value);
    }

    const handleControllers = (event: React.MouseEvent, action: string) => {
        switch (action) {
            case 'increase10':
                if (bpm >= maxBpm - 10) {
                    setBPM(maxBpm)
                    return
                }
                setBPM(prev => prev + 10)
                break;
            case 'decrease10':
                if (bpm <= minBpm + 10) {
                    setBPM(minBpm)
                    return
                }
                setBPM(prev => prev - 10)
                break;
            case 'increase':
                if (bpm === maxBpm) {
                    return
                }
                setBPM(prev => prev + 1)
                break;
            case 'decrease':
                if (bpm === minBpm) {
                    return
                }
                setBPM(prev => prev - 1)
                break;
        }
    }

    return (
        <>
            <h3>{displayNumber} BPM</h3>
            <div className="controllersContainer">
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(event, 'decrease10')}
                >
                    -10
                </div>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(event, 'decrease')}
                >
                    <i className="material-icons">remove</i>
                </div>
                <p className="range-field">
                    <input
                        type="range"
                        min={minBpm}
                        max={maxBpm}
                        ref={rangeRef}
                        onChange={changeIntervalsValue}
                    />
                </p>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(event, 'increase')}
                >
                    <i className="material-icons">add</i>
                </div>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(event, 'increase10')}
                >
                    +10
                </div>
            </div>
        </>
    )
}

export default BPMController