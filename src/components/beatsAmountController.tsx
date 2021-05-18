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

    const beatsOperations = {
        increase(): number[] {
            if (amount === maxAmount) {
                return beats
            }
            return beats.concat(beats.length)
        },
        decrease(): number[] {
            if (amount === minAmount) {
                return beats
            }
            return beats.slice(0, beats.length - 1)
        }
    }

    const handleControllers = (cb: () => number[]) => {
        const newArr: number[] = cb();
        updateBeats(newArr);
        setAmount(beats.length);
    }

    return (
        <>
            <div className="controllersContainer">
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(beatsOperations.decrease)}
                >
                    <i className="material-icons">remove</i>
                </div>
                <h5 className="m5">{amount}</h5>
                <div
                    className='waves-effect waves-light btn-small blue-grey lighten-4'
                    onClick={event => handleControllers(beatsOperations.increase)}
                >
                    <i className="material-icons">add</i>
                </div>
            </div>
        </>
    )
}

export default BeatsAmountController