import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Square from './Components/Square.js';
import { possibilities } from './Possibilities';
import Board from './Components/Board';
import UltimateBoard from './Components/Ultimate';
import Forms from './Components/Forms';
import PopUp from './Components/PopUp';

function App() {
  

  return (
    <div className="App">
      <PopUp/>
      <Forms />
      <UltimateBoard />
    
    </div>
  
    
  );
}

export default App;
