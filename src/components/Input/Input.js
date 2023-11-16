import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faCoffee } from '@fortawesome/free-solid-svg-icons';

import classes from './Input.module.css';

const Input = (props) => {

    const {
        handleSendRequest,
        prompt,
        setPrompt,
        isTyping
    } = props;

    return (
        <div className={classes["input-container"]}>
            <div>
                <p>{isTyping && 'ChatGPT is typing...'}</p>
            </div>
            <div>
                <input
                    type="text"
                    value={prompt}
                    placeholder="Message me"
                    onChange={(e) => setPrompt(e.target.value)} />
                <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={handleSendRequest} />
            </div>
        </div>
    )
}

export default Input;