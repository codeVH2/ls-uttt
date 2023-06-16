import React from 'react';
import "../App.css";

function Square({value, chooseSquare}) {  //value = "X" ou "O" ou ""
  // const [value, setValue] = useState('Initial Value');
  // const changeValueText = (newValue) => {
  //   setValue(newValue);
  // }
  return (
    <div className='square' onClick={chooseSquare}>
      {value}
    </div>
  )
}

export default Square
