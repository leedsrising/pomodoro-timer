import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";

import Timer from './components/timer.js'
import Navbar from './components/navbar.js'
import RecordList from './components/recordList.js'

export default function App() {
  return (
    <div sx={{"paddingTop": '0px'}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Timer/>}/>
        <Route path="/records" element={<RecordList/>}/>
      </Routes>
    </div>
  );
}

