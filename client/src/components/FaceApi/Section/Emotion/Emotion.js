import React, { useState } from 'react';

import { loadModels } from '../../../../helpers/faceApi';
import { createFaLibrary } from '../../../../helpers/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import Camera from '../Camera/Camera';
import './Emotion.css';

import Header from '../../../Common/Header/Header';
import Footer from '../../../Common/Footer/Footer';
createFaLibrary();
loadModels();

function Emotion() {
    const [mode, setMode] = useState(false); //true = photo mode; false = video mode
    return (
        <>
            <Header />
            <div className="App">
                <header>
                    <div className="App__header">
                        <h1>
                            <span>감정 인식</span>
                        </h1>
                        <div className="App__switcher">
                            <FontAwesomeIcon icon="camera" color={mode ? '#353535' : '#cccccc'} />
                            <Switch
                                onChange={() => setMode(!mode)}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                checked={!mode}
                                className="App__switcher-switch"
                            />
                            <FontAwesomeIcon icon="video" color={!mode ? '#353535' : '#cccccc'} />
                        </div>

                    </div>
                </header>
                <Camera photoMode={mode} />
            </div>
            <Footer />
        </>
    )
}

export default Emotion