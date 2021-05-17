import React, { useState, useEffect, useRef } from 'react'

type BPMControllerProps = {
    updateIntervalsValue(value: number): void,
    intervalValue: number | null;
}

const BPMController: React.FC<BPMControllerProps> = ({ updateIntervalsValue, intervalValue }) => {
    const [bpm, setBPM] = useState<number | null>(null);
    const maxBpm: number = 260;
    const minBpm: number = 20;
    const rangeRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (intervalValue != null) {
            let bpmFromInterval = 60000 / intervalValue + 1;
            rangeRef.current!.value = bpmFromInterval.toString();
            setBPM(bpmFromInterval)
        }
    }, [intervalValue])

    useEffect(() => {
        if (bpm != null) {
            rangeRef.current!.value = bpm.toString();
            updateIntervalsValue(60000 / (bpm - 1));
        }
    }, [bpm])

    const changeBpmByRange = (e: React.FormEvent<HTMLInputElement>) => {
        setBPM(+e.currentTarget.value);
    }

    const handleControllers = {
        decrease(n: number) {
            const decreasedBpm = bpm! - n;
            if (decreasedBpm < minBpm) {
                setBPM(minBpm)
                return
            }
            setBPM(prev => prev! - n)
        },
        increase(n: number) {
            const increasedBpm = bpm! + n;
            if (increasedBpm > maxBpm) {
                setBPM(maxBpm)
                return
            }
            setBPM(prev => prev! + n)
        }
    }

    return (
        <>
            <h3>{Math.round(bpm!)} BPM</h3>
            <div className="controllersContainer">
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers.decrease(10)}
                >
                    -10
                </div>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers.decrease(1)}
                >
                    <i className="material-icons">remove</i>
                </div>

                <p className="range-field">
                    <input
                        type="range"
                        min={minBpm}
                        max={maxBpm}
                        ref={rangeRef}
                        onChange={changeBpmByRange}
                    />
                </p>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers.increase(1)}
                >
                    <i className="material-icons">add</i>
                </div>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers.increase(10)}
                >
                    +10
                </div>
            </div>
        </>
    )
}

export default BPMController