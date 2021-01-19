import React, {useState, useEffect} from 'react'
import SingleBeatBlock from './SingleBeatBlock'

const BeatsContainer: React.FC = () => {  
    const [beats, setBeats] = useState<number[]>([0,1,2,3]);
    

    const beatBlocks = () => {
        return beats.map((num) => {
            console.log(num);            
            return <li key={num}>
                <SingleBeatBlock/>
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