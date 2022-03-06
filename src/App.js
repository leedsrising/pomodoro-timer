import './App.css';

import React, {useState, useEffect} from 'react';
import {
  Button,
  Box,
  Flex
} from 'rebass'
import {
  Input,
  Label
} from '@rebass/forms'
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'

import sound from '../src/zapsplat_ringtone.mp3'

const currentTime = {
  seconds: '00',
  minutes: '00',
  hours: '00'
}

function padZeros(number, intendedLength) {
  const numberAsString = number.toString()
  if (numberAsString.length >= intendedLength) return numberAsString
  return "0".repeat(intendedLength - numberAsString.length) + numberAsString
}

function BasicTimer () {
  // const [changeTime, setChangeTime] = useState(false)
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [intendedSecond, setIntendedSecond] = useState(0)
  const [intendedMinute, setIntendedMinute] = useState(0)
  // const [customTime, setCustomTime] = useState(0)

  const start = () => {
    var audio = new Audio(sound)
    audio.type = "audio/mp3";
    console.log("playing")
    audio.play()
  }

  useEffect(() => {
    console.log("hit use effect")
    if (second > 0 || minute > 0) {
      const intervalId = setInterval(() => {
        updateTime()
      }, 1000)
      return () => clearInterval(intervalId)
    }
    if (second == 0 && minute == 0) {
      start()
    }
    return
  }, [second])

  
  
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

  // function setFiveMinute () {
  //   setMinute(4)
  //   setSecond(59)
  // }

  function handleSecondChange (event) {
    setIntendedSecond(event.target.value);
  }

  function handleMinuteChange (event) {
    setIntendedMinute(event.target.value);
  }

  function applyTime () {
    console.log("apply time triggered")
    setSecond(intendedSecond)
    setMinute(intendedMinute)
    console.log("apply time finished")
  }

  return(
    <div class="main-div">
      <Label 
        class="timer-reading"
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
      >
        Start
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
