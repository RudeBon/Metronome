import React from 'react'
import useSound from 'use-sound'
import boop from '../assets/sounds/boop.mp3'
import song from '../assets/sounds/song.mp3'

export const SoundComponent = () => {
    const [play] = useSound(boop);
    const [playSong, { stop }] = useSound(song);

    return (
        <>
            <button onClick={() => { play(); console.log('boop'); }}>Boop!</button>
            <button
                onMouseEnter={() => { playSong(); console.log('song is playing'); }}
                onMouseLeave={() => { stop(); console.log('stop'); }}
            >
                <span role="img">
                    ☁⛅☁
                </span>
            </button>
        </>
    )
}