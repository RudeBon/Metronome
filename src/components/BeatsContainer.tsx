import React, { useState, useEffect } from 'react'

type BeatsContainerProps = {
    beats: number[]
    activeId: number
}

const BeatsContainer: React.FC<BeatsContainerProps> = ({ beats, activeId }) => {

    const beatBlocks = () => {
        return beats.map((num) => {
            const classes = ['beat']
            if (num === activeId) {
                classes.push('activeBeat')
            }
            return <li key={num} >
                <div className={classes.join(' ')}></div>
            </li>
        })
    }

    return (
        <div className="beatsBlock">
            <h3>Actual beat: {activeId}</h3>
            <ul className='beats_ul'>
                {beatBlocks()}
            </ul>
        </div>
    )
}

export default BeatsContainer; 