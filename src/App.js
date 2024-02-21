
import React, { useState } from 'react';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

const initialAudioFiles = JSON.parse(localStorage.getItem('audioList')) || [
    { name: 'Audio 1', url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' },
    { name: 'Audio 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
   
];

const App = () => {
    const [audioUpload, setAudioUpload] = useState('');
    const [audioFiles, setAudioFiles] = useState(initialAudioFiles);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(
        parseInt(localStorage.getItem('currentAudioIndex')) || 0
    );

    const uploadAudioHandler = () => {
        if (!audioUpload) return;

        const data = new FormData();
        data.append("file", audioUpload);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "djib5oxng");
        data.append("resource_type", "audio");

        fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/upload", {
            method: "POST",
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            const newAudioFiles = [...audioFiles, { name: data.original_filename, url: data.url }];
            setAudioFiles(newAudioFiles);
            localStorage.setItem('audioList', JSON.stringify(newAudioFiles));
            window.location.reload();
        })
        .catch((err) => {
            console.error("Error uploading audio:", err);
        });
    };

    return (
        <div className='music-app'>
          <h1>Audio Player:</h1>
            <div>
                <input className="upload-input" type='file' onChange={(e) => setAudioUpload(e.target.files[0])} />
                <button className="upload-button" onClick={uploadAudioHandler}>Upload Audio</button>
            </div>
            <MusicPlayer
                audioFiles={audioFiles}
                currentAudioIndex={currentAudioIndex}
                setCurrentAudioIndex={setCurrentAudioIndex}
            />
            <div>
                <h3 className="playlist-title">Playlist</h3>
                <ul className='audio-list'>
                    {audioFiles.map((audio, index) => (
                        <li key={index}>
                            {audio.name}{' '}
                            <button className="play-button" onClick={() => setCurrentAudioIndex(index)}>Play</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;

