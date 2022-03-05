import './App.css';

import React, {useState, useEffect} from 'react';
import {
  Button,
  Box
} from 'rebass'
import {
  Input,
  Label
} from '@rebass/forms'

import sound from '../src/zapsplat_ringtone.mp3'

const currentTime = {
  seconds: '00',
  minutes: '00',
  hours: '00'
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
    <div>
      <Button 
        variant='outline' 
        mr={2}
        // onClick={startTimer}
      >
        {currentTime.hours}:{minute}:{second}
      </Button>
      {/* <Button 
        variant='outline' 
        mr={2}
        onClick={setFiveMinute}
      >
        Set 5 minutes
      </Button> */}
      <Label>Set Minute</Label>
      <Input
        id='timer'
        name='timer'
        type='number'
        placeholder='number of minutes'
        onChange={handleMinuteChange}
      />
      <Label>Set Second</Label>
      <Input
        id='timer'
        name='timer'
        type='number'
        placeholder='number of seconds'
        onChange={handleSecondChange}
      />
      <Button
        onClick={applyTime}
      >
        Submit
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
