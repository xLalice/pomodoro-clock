import React from "react";
import "./Config.css"
import Timer from './Timer'

export default function Config(props){
    const [breakLength, setBreakLength] = React.useState(5)
    const [sessionLength, setSessionLength] = React.useState(25)

    function handleLengthChange(type, action) {
        if (action === "increment") {
            if (type === "break") {
                setBreakLength(breakLength + 1);
            } else {
                setSessionLength(sessionLength + 1);
            }
        } else {
            if (type === "break" && breakLength > 1) {
                setBreakLength(breakLength - 1);
            } else if (type === "session" && sessionLength > 1) {
                setSessionLength(sessionLength - 1);
            }
        }
    }

    return (
        <>
            <div id="lengths">
                <div id="break" class="length">
                    <h2 id="break-label">Break Length</h2>
                    <div class="length-controls">
                        <button id="break-decrement"
                        class="arrow-button" 
                        onClick={() => handleLengthChange("break", "decrement")}
                        >
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                        <h3>{breakLength}</h3>
                        <button 
                        id="break-increment" 
                        class="arrow-button"
                        onClick={() => handleLengthChange("break", "increment")}
                        >
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
                <div id="session" class="length">
                    <h2 id="session-label">Session Length</h2>
                    <div class="length-controls">
                        <button 
                        id="session-decrement" 
                        class="arrow-button"
                        onClick={() => handleLengthChange("session", "decrement")}
                        >
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                        <h3>{sessionLength}</h3>
                        <button 
                        id="session-increment" 
                        class="arrow-button"
                        onClick={() => handleLengthChange("session", "increment")}
                        >
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
                
            </div>
            <Timer breakLength={breakLength} sessionLength={sessionLength}/>
        </>
        
    )
}