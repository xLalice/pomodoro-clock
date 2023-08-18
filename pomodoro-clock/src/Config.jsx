import React from "react";
import "./Config.css";

function LengthControls({ label, value, onChange, isTimeRunning }) {
    return (
        <div className="length">
            <h2 id={`${label.toLowerCase()}-label`}>{`${label} Length`}</h2>
            <div className="length-controls">
                <button
                    className="arrow-button"
                    onClick={() => onChange("decrement")}
                    disabled={isTimeRunning || value <= 1}
                >
                    <i className="fa-solid fa-arrow-down"></i>
                </button>
                <h3>{value}</h3>
                <button
                    className="arrow-button"
                    onClick={() => onChange("increment")}
                    disabled={isTimeRunning || value >= 60} // Disable if value >= 60
                >
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            </div>
        </div>
    );
}

export default function Config({ sessionLength, breakLength, handleLengthChange, isTimeRunning }) {
    return (
        <div id="lengths">
            <LengthControls
                label="Break"
                value={breakLength}
                onChange={type => handleLengthChange("break", type)}
                isTimeRunning={isTimeRunning}
            />
            <LengthControls
                label="Session"
                value={sessionLength}
                onChange={type => handleLengthChange("session", type)}
                isTimeRunning={isTimeRunning}
            />
        </div>
    );
}
