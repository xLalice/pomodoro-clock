import React from 'react'
import './App.css'
import Config from './Config'
import Timer from './Timer'

function App() {
  const [sessionLength, setSessionLength] = React.useState(25)
  const [breakLength, setBreakLength] = React.useState(5)
  const [isTimeRunning, setIsTimeRunning] = React.useState(false)
  

  function handleLengthChange(type, change){
    if (type === "session"){
      setSessionLength(prevState => change === "increment" ? prevState + 1 : prevState - 1)
    }
    else {
      setBreakLength(prevState => change === "increment" ? prevState + 1 : prevState - 1)
    }
  }


  function handleStartStop() {
    setIsTimeRunning(prevState => !prevState);
  }

  function pause() {
    setIsTimeRunning(false)
  }

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <Config sessionLength={sessionLength} 
        breakLength={breakLength} 
        handleLengthChange={handleLengthChange}
        isTimeRunning={isTimeRunning}/>
      <Timer key={sessionLength}
        sessionLength={sessionLength} 
        breakLength={breakLength}
        isTimeRunning={isTimeRunning}
        handleStartStop={handleStartStop}
        setIsTimeRunning={setIsTimeRunning}
        pause={pause}/>
    </>
  )
}

export default App
