import React, { useState, useEffect } from "react";
import "./Timer.css";

export default function Timer({ breakLength, sessionLength }) {
    const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);

    const sessionAudio = new Audio("./assets/session.mp3");
    const breakAudio = new Audio("./assets/break.mp3");

    const startTimer = () => {
        if (timerRunning && timeRemaining > 0) {
            return setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        stopTimer();
                        if (isSession) {
                            setIsSession(false);
                            setTimeRemaining(breakLength * 60);
                            startTimer(); 
                            playAudio(breakAudio); 
                        } else {
                            setIsSession(true);
                            setTimeRemaining(sessionLength * 60);
                            playAudio(sessionAudio);
                        }
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return null;
    };

    const stopTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        stopTimer();
        setIsSession(true);
        setTimeRemaining(sessionLength * 60);
    };

    const playAudio = audioElement => {
        audioElement.currentTime = 0;
        audioElement.play();
    };

    useEffect(() => {
        let interval = startTimer();

        return () => {
            clearInterval(interval);
        };
    }, [timerRunning, timeRemaining, isSession, sessionLength, breakLength]);

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const handleStartPauseClick = () => {
        setTimerRunning(prevRunning => !prevRunning);
    };

    const handleRestartClick = () => {
        resetTimer();
    };

    return (
        <div id="timer">
            <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
            <h2 id="time-left">{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</h2>
            <div id="timer-controls">
                <button id="start-stop" onClick={handleStartPauseClick}>
                    <i className={`fa-solid ${timerRunning ? "fa-pause" : "fa-play"}`}></i>
                </button>
                <button id="start-stop" onClick={handleRestartClick}>
                    <i className="fa-solid fa-refresh"></i>
                </button>
            </div>
        </div>
    );
}
