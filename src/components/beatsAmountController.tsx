import React, { useState, useEffect } from 'react'

type BeatsAmountControllerProps = {
    beats: number[]
    updateBeats(value: number[]): void
}

const BeatsAmountController: React.FC<BeatsAmountControllerProps> = ({
    updateBeats,
    beats,
}) => {
    const [amount, setAmount] = useState<number>(beats.length);
    const minAmount: number = 2;
    const maxAmount: number = 12;

    useEffect(() => {
        setAmount(beats.length)
    }, [beats])

    const handleControllers = (event: React.MouseEvent, action: string) => {
        console.log('controllers click', action);
        switch (action) {
            case 'increase':
                if (amount === maxAmount) {
                    return
                }
                let increasedArr: number[] = beats.concat(beats.length)
                updateBeats(increasedArr)
                setAmount(prev => prev + 1)
                break;
            case 'decrease':
                if (amount === minAmount) {
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
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(event, 'decrease')}
                >
                    <i className="material-icons">remove</i>
                </div>
                <h5 className="m5">{amount}</h5>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(event, 'increase')}
                >
                    <i className="material-icons">add</i>
                </div>
            </div>
        </>
    )
}

export default BeatsAmountController