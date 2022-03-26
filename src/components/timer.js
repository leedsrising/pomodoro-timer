import React, { useEffect, useState } from "react";

import date from 'date-and-time';
import sound from '../../src/zapsplat_ringtone.mp3'
import {
  Button
} from 'rebass'
import {
  Input,
  Label
} from '@rebass/forms'

function padZeros(number, intendedLength) {
    const numberAsString = number.toString()
    if (numberAsString.length >= intendedLength) return numberAsString
    return "0".repeat(intendedLength - numberAsString.length) + numberAsString
  }
  
const playSound = () => {
    var audio = new Audio(sound)
    audio.type = "audio/mp3";
    audio.play()
}

async function createTimerRecord () {
  const now = new Date();
  const now_formatted = { time: date.format(now, 'YYYY/MM/DD') }

  await fetch("http://localhost:3001/record/add", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(now_formatted),
  })
  .catch(error => {
      window.alert(error);
      return;
  });
}
  
export default function Timer () {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(40)
    const [intendedSecond, setIntendedSecond] = useState(0)
    const [intendedMinute, setIntendedMinute] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
  
    useEffect(() => {
      if (isTimerActive === false) return

      if (second === 0 && minute === 0) {
        playSound()
      }

      const intervalId = setInterval(() => {
        updateTime()
      }, 1000)

      return () => clearInterval(intervalId)

    }, [second, isTimerActive])
  
    function updateTime () {
      // if normal session ending, start break
      if (!isBreak && second === 0 && minute === 0) {
        setSecond(59)
        setMinute(4)
        createTimerRecord()
        setIsBreak(true)
        
      }
      // if break session ending, start normal session
      else if (isBreak && second === 0 && minute === 0) {
        setSecond(0)
        setMinute(40)
        createTimerRecord()
        setIsBreak(false)
        
      }
      // if second = 0 but min != 0, then minute - 1 and second to 59
      else if (second === 0 && minute !== 0) {
        setSecond(59)
        setMinute(minute-1)
      }
      // otherwise, subtract second by 1
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
      setMinute(intendedMinute)
      setSecond(intendedSecond)
      setIsTimerActive(true)
      setIntendedSecond("")
      setIntendedMinute("")
    }
  
    function stopTimer () {
      setIsTimerActive(false)
    }
  
    function resetTimer () {
      setSecond(0)
      setMinute(40)
      setIsTimerActive(false)
    }
  
    function timeToString (time) {
      if (time === 0) return ""
      else return time.toString()
    }
  
    return(
        
        <div className="timer-div">
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
                value={timeToString(intendedMinute)}
                onChange={handleMinuteChange}
                width='30%'
                margin='1px'
                style={{'borderRadius': '5px'}}
                display='inline-block'
            />
            <Input
                id='timer'
                name='timer'
                type='number'
                placeholder='seconds'
                value={timeToString(intendedSecond)}
                onChange={handleSecondChange}
                width='30%'
                margin='1px'
                style={{'borderRadius': '5px'}}
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