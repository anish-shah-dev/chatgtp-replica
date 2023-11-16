import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faRobot } from '@fortawesome/free-solid-svg-icons';

import classes from './Message.module.css';

const Message = ({ message }) => {
    const {
        message: content,
        sender
    } = message;

    const [displayContent, setDisplayContent] = useState("");
    const [completedTyping, setCompletedTyping] = useState(false);

    useEffect(() => {
        setCompletedTyping(false);
        let intervalId;

        if (sender === "ChatGPT") {
            let i = 0;

            intervalId = setInterval(() => {
                setDisplayContent(content.slice(0, i));

                i++;

                if (i > content.length) {
                    clearInterval(intervalId);
                    setCompletedTyping(true);
                }

            }, 20);
        } else {
            setDisplayContent(content);
        }

        return () => clearInterval(intervalId);
    }, [content, sender]);

    return (
        <div className={`${classes['message-container']}`}>
            <div className={`${sender === "you" ? classes.user : classes.chatgpt}`}>
                <div className={classes.message}>
                    <div>
                        <FontAwesomeIcon className={sender === 'you' ? classes["you-svg"] : classes["chatgpt-svg"]} icon={sender === 'you' ? faUserCircle : faRobot} />
                    </div>
                    <div>
                        <span>{sender}</span>

                        <div>
                            {displayContent}

                            {!completedTyping && sender !== "you" && <svg
                                viewBox="8 4 8 16"
                                xmlns="http://www.w3.org/2000/svg"
                                className={classes.cursor}>
                                <rect x="10" y="6" width="4" height="12" fill="#fff" />
                            </svg>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;   