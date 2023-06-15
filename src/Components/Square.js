import React from 'react';
import "../App.css";

function Square({value, chooseSquare}) {  //value = "X" ou "O" ou ""
  return (
    <div className='square' onClick={chooseSquare}>
      {value}
    </div>
  )
}

export default Square
