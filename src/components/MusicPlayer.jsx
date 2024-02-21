
import React, { useEffect, useState } from "react";
import './AudioPlayer.css';

const MusicPlayer = ({ audioFiles, currentAudioIndex, setCurrentAudioIndex }) => {
    const [audio, setAudio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const newAudio = new Audio(audioFiles[currentAudioIndex].url);
        setAudio(newAudio);
        setIsPlaying(true);
        newAudio.play();

        
        localStorage.setItem('currentAudioIndex', currentAudioIndex);

       
        newAudio.addEventListener('ended', () => {
            if (currentAudioIndex < audioFiles.length - 1) {
                setCurrentAudioIndex(currentAudioIndex + 1);
            } else {
                setCurrentAudioIndex(0);
            }
        });

       
        return () => {
            newAudio.pause();
            newAudio.removeEventListener('ended', () => { });
        };
    }, [currentAudioIndex, audioFiles, setCurrentAudioIndex]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player">
            <h2 className="music-player-title">Now Playing: {audioFiles[currentAudioIndex].name}</h2>
            <div className="audio-instance">
                <audio controls autoPlay onEnded={() => setIsPlaying(false)}>
                    <source src={audioFiles[currentAudioIndex].url} type="audio/mp3" />
                    Your browser does not support the audio tag.
                </audio>
                <button className="play-button" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
        </div>
    );
};

export default MusicPlayer;
























