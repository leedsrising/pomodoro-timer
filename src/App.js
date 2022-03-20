import './App.css';

import React from 'react';
import { Route, Routes } from "react-router-dom";

import Timer from '../src/components/timer.js'
import Navbar from '../src/components/navbar.js'
import RecordList from '../src/components/recordList.js'

export default function App() {
  return (
    <div style={{"paddingTop": '0px'}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Timer/>}/>
        <Route path="/records" element={<RecordList/>}/>
      </Routes>
    </div>
  );
}

