import './App.css';

import React, {useState, useEffect} from 'react';
import {
  Button
} from 'rebass'
import {
  Input,
  Label
} from '@rebass/forms'

import sound from '../src/zapsplat_ringtone.mp3'

function padZeros(number, intendedLength) {
  const numberAsString = number.toString()
  if (numberAsString.length >= intendedLength) return numberAsString
  return "0".repeat(intendedLength - numberAsString.length) + numberAsString
}

const start = () => {
  var audio = new Audio(sound)
  audio.type = "audio/mp3";
  console.log("playing")
  audio.play()
}

function BasicTimer () {
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(40)
  const [intendedSecond, setIntendedSecond] = useState()
  const [intendedMinute, setIntendedMinute] = useState()
  const [isTimerActive, setIsTimerActive] = useState(false)

  useEffect(() => {
    if (isTimerActive === false) return

    if (second > 0 || minute > 0) {
      const intervalId = setInterval(() => {
        updateTime()
      }, 1000)
      return () => clearInterval(intervalId)
    }
    if (second === 0 && minute === 0) {
      start()
    }
    return
  }, [second, isTimerActive])

  function updateTime () {
    // if second = 0 then minute - 1 and second to 59
    if (second === 0 && minute !== 0) {
      setSecond(59)
      setMinute(minute-1)
    }
    else {
      setSecond(second-1)
    }
  }

  function handleSecondChange (event) {
    setIntendedSecond(event.target.value);
  }

  function handleMinuteChange (event) {
    setIntendedMinute(event.target.value);
  }

  function applyTime () {
    if (intendedMinute > 0) {
      setMinute(intendedMinute)
      setSecond(intendedSecond)
    }
    else if (intendedSecond > 0) setSecond(intendedSecond)
    setIsTimerActive(true)
    setIntendedSecond("")
    setIntendedMinute("")
    console.log(intendedSecond)
  }

  function stopTimer () {
    setIsTimerActive(false)
  }

  function resetTimer () {
    setSecond(0)
    setMinute(40)
    setIsTimerActive(false)
  }

  return(
    <div class="main-div">
      <Label
        display='inline-block'
        fontSize='72px'
        marginLeft='155px'
      >
        {padZeros(minute, 2)}:{padZeros(second, 2)}
      </Label>
      <div style={{'padding': '10px'}}>
        <Input
          id='timer'
          name='timer'
          type='number'
          placeholder='minutes'
          onChange={handleMinuteChange}
          width='30%'
          display='inline-block'
        />
        <Input
          id='timer'
          name='timer'
          type='number'
          placeholder='seconds'
          onChange={handleSecondChange}
          width='30%'
          display='inline-block'
        />
      </div>
        <Button
          onClick={applyTime}
          color='white'
          backgroundColor='blue'
          margin='5px'
        >
          Start
        </Button>
        <Button
          onClick={stopTimer}
          color='white'
          backgroundColor='orange'
          margin='5px'
        >
          Pause
        </Button>
        <Button
          onClick={resetTimer}
          color='white'
          backgroundColor='red'
          margin='5px'
        >
          Reset
        </Button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <BasicTimer/>
    </div>
  );
}
