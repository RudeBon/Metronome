import React, { useState, useEffect } from 'react'

type BeatsAmountControllerProps = {
    isActive: boolean
    beats: number[]
    updateBeats(value: number[]): void
}

const BeatsAmountController: React.FC<BeatsAmountControllerProps> = ({
    updateBeats,
    beats,
    isActive
}) => {
    const [amount, setAmount] = useState<number>(4)
    const [smallBtnClass, setSmallBtnClass] = useState<string[]>(['smallBtn'])

    useEffect(() => {
        console.log('isActive have changed');
        if (isActive) {
            setSmallBtnClass(prev => [...prev, 'disabled'])
        } else if (!isActive) {
            setSmallBtnClass(['smallBtn'])
        }
    }, [isActive])

    const handleControllers = (event: React.MouseEvent, action: string) => {
        if (isActive) {
            return
        }
        console.log('controllers click', action);
        switch (action) {
            case 'increase':
                if (amount === 12) {
                    return
                }
                let increasedArr: number[] = beats.concat(beats.length)
                updateBeats(increasedArr)
                setAmount(prev => prev + 1)
                break;
            case 'decrease':
                if (amount === 2) {
                    return
                }
                const decreasedArr: number[] = beats.slice(0, beats.length - 1)
                updateBeats(decreasedArr)
                setAmount(prev => prev - 1)
                break;
        }
    }


    return (
        <>
            <div className="controllersContainer">
                <div
                    className={smallBtnClass.join(' ')}
                    onClick={event => handleControllers(event, 'decrease')}
                >
                    -
                </div>
                <h3>{amount}</h3>
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

export default BeatsAmountController