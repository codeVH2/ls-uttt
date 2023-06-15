import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Square from './Components/Square.js';
import { possibilities } from './Possibilities';
import Board from './Components/Board';
import UltimateBoard from './Components/Ultimate';

function App() {
  

  return (
    <div className="App">
      <UltimateBoard />
    </div>
  );
}

export default App;
