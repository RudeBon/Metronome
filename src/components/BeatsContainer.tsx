import React from 'react'

type BeatsContainerProps = {
    beats: number[]
    activeId: number|null
    isStressed: boolean
}

const BeatsContainer: React.FC<BeatsContainerProps> = ({ beats, activeId, isStressed }) => {

    const beatBlocks = () => {
        return beats.map((num) => {
            const classes = ['beat']
            if (num === activeId) {
                classes.push('activeBeat')
            }
            if (num === 0 && isStressed) {
                classes.push('stressedBeat')
            }
            return <li key={num} className={classes.join(' ')}>
                <div></div>
            </li>
        })
    }

    return (
        <div className="beatsBlock">
            <ul className='beats_ul'>
                {beatBlocks()}
            </ul>
        </div>
    )
}

export default BeatsContainer; 