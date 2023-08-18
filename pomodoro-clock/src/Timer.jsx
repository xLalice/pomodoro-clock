import React, { useState, useEffect } from "react";
import "./Timer.css";

export default function Timer({ breakLength, sessionLength, isTimeRunning, handleStartStop, pause }) {
    const [isSessionRunning, setIsSessionRunning] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isTimeRunning) {
            const newIntervalId = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(newIntervalId);
                        setIsSessionRunning(prevState => !prevState);
                        const audio = document.getElementById("beep");
                        if (audio) {
                            audio.play();
                        }
                        return !isSessionRunning ? breakLength * 60 : sessionLength * 60;
                    }
                });
            }, 1000);
            setIntervalId(newIntervalId);
        } else {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isTimeRunning, isSessionRunning, breakLength, sessionLength]);

    function reset() {
        pause()
        setIsSessionRunning(true)
        setTimeRemaining(sessionLength * 60);
    }

    return (
        <div id="timer">
            <audio id="beep" src="../public/session.mp3"></audio>
            <h2 id="timer-label">{isSessionRunning ? "Session" : "Break"}</h2>
            <h2 id="time-left">
                {`${Math.floor(timeRemaining / 60)} : ${
                    timeRemaining % 60 < 10
                        ? `0${timeRemaining % 60}`
                        : timeRemaining % 60
                }`}
            </h2>
            <div id="timer-controls">
                <button id="start" onClick={handleStartStop}>
                    <i className={`fa-solid ${isTimeRunning ? "fa-pause" : "fa-play"}`}></i>
                </button>
                <button id="start-stop" onClick={reset}>
                    <i className="fa-solid fa-refresh"></i>
                </button>
            </div>
        </div>
    );
}
