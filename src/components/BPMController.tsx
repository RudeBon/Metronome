import React, { useState, useEffect } from 'react'

type BPMControllerProps = {
    isActive: boolean,
    updateIntervalsValue(value: number): void
}

const BPMController: React.FC<BPMControllerProps> = ({
    isActive,
    updateIntervalsValue
}) => {
    const [bpm, setBPM] = useState<number>(80);
    const [smallBtnClass, setSmallBtnClass] = useState<string[]>(['smallBtn'])

    useEffect(() => {
        console.log('bpm value has changed', bpm);
        updateIntervalsValue(60000 / (bpm - 1))
    }, [bpm])

    useEffect(() => {
        console.log('isActive have changed');
        if (isActive) {
            setSmallBtnClass(prev => [...prev, 'disabled'])
        } else if (!isActive) {
            setSmallBtnClass(['smallBtn'])
        }
    }, [isActive])

    const changeIntervalsValue = (e: React.FormEvent<HTMLInputElement>) => {
        setBPM(+e.currentTarget.value);
    }

    const handleControllers = (event: React.MouseEvent, action: string) => {
        if (isActive) {
            return
        }
        switch (action) {
            case 'increase':
                if (bpm === 260) {
                    return
                }
                setBPM(prev => prev + 1)
                break;
            case 'decrease':
                if (bpm === 20) {
                    return
                }
                setBPM(prev => prev - 1)
                break;
        }
    }

    return (
        <>
            <h3>{bpm} BPM</h3>
            <div className="controllersContainer">
                <div
                    className={smallBtnClass.join(' ')}
                    onClick={event => handleControllers(event, 'decrease')}
                >
                    -
                </div>
                <input
                    type="range"
                    min="20"
                    max="260"
                    // value="bpm"
                    onChange={changeIntervalsValue}
                    disabled={isActive}
                />
                <div
                    className={smallBtnClass.join(' ')}
                    onClick={event => handleControllers(event, 'increase')}
                >
                    +
                </div>
            </div>
        </>
    )
}

export default BPMController