import React, { useState, useEffect } from 'react'

type TapTempoProps = {
    updateIntervalsValue(value: number): void
}

const TapTempo: React.FC<TapTempoProps> = ({ updateIntervalsValue }) => {
    const [taps, setTaps] = useState<number[]>([])
    const [tapIntervals, setTapIntervals] = useState<number[]>([])

    useEffect(() => {
        calculateIntervals(taps)
    }, [taps])

    useEffect(() => {
        const calculatedInterval = reduceArrayWithAttenuationСoefficient(tapIntervals)
        if (calculatedInterval) {
            updateIntervalsValue(calculatedInterval)
        }
    }, [tapIntervals])

    const handleTap = () => {
        const tap = Date.now()
        if (taps.length < 6) {
            setTaps([...taps, tap])
        } else {
            const [, ...rest] = taps
            setTaps([...rest, tap])
        }
    }

    // const getTriangularNumber = (n: number): number => {
    //     return (n ** 2 + n) / 2
    //     // return (n != 1) ? n + getTriangularNumber(n - 1) : 1;
    // }

    const reduceArrayWithAttenuationСoefficient = (arr: any[]): number => {
        const value = arr.reduce((
            obj: { acc: number, coeffSum: number },
            current: number,
            i: number
        ) => {
            const accumulator = obj.acc + current * (i + 1);
            const coefficientSum = obj.coeffSum + i + 1
            return {
                acc: accumulator,
                coeffSum: coefficientSum,
            }
        }, {
            acc: 0,
            coeffSum: 0,
        })
        return value.acc / value.coeffSum
    }

    const calculateIntervals = (arr: number[]) => {
        const intervalsArray: number[] = [];

        arr.forEach((item, i, arr) => {
            if (i === 0) {
                return
            }
            const interval = item - arr[i - 1]

            if (interval < 230 || interval > 3160) {
                intervalsArray.splice(0, intervalsArray.length)
                setTaps([])
            } else {
                updateIntervalsArray(intervalsArray, 5, interval)
            }
        })
        setTapIntervals([...intervalsArray])
    }

    const updateIntervalsArray = (array: number[], maxLength: number, updateValue: number) => {
        if (array.length < maxLength) {
            array.push(updateValue)
        } else {
            array.splice(0, 1, updateValue)
        }
    }

    return (
        <button
            onClick={handleTap}
            className='waves-effect waves-light btn-large blue-grey lighten-3'
        >
            Tap Tempo
        </button>
    )
}

export default TapTempo