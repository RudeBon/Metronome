import React, { useState, useEffect } from 'react'

type BeatsAmountControllerProps = {
    beats: number[]
    updateBeats(value: number[]): void
}

const BeatsAmountController: React.FC<BeatsAmountControllerProps> = ({ updateBeats, beats }) => {
    const [amount, setAmount] = useState<number>(4)

    const handleControllers = (event: React.MouseEvent, action: string) => {
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
                <div className="smallBtn" onClick={event => handleControllers(event, 'decrease')}>-</div>
                <h3>{amount}</h3>
                <div className="smallBtn" onClick={event => handleControllers(event, 'increase')}>+</div>
            </div>
        </>
    )
}

export default BeatsAmountController