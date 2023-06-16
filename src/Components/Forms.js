import './../App.css';
import React, { useState } from 'react';


const Forms = (props) => {
  
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };

  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="FormsContainer">
      <h1>Ultimate Tic Tac Toe</h1>
      <div className="FormsContent">
        <form onSubmit={handleSubmit} className="FormsForm">
          <label>
            Player 1:
            <input
              type="text"
              value={player1Name}
              onChange={handlePlayer1NameChange}
              className="FormsInput"
            />
          </label>
          <br />
          <label>
            Player 2:
            <input
              type="text"
              value={player2Name}
              onChange={handlePlayer2NameChange}
              className="FormsInput"
            />
          </label>
          <br />
          <p>Player 1 ({player1Name}) is X</p>
          <p>Player 2 ({player2Name}) is O</p>
          <p>'O' is team blue, 'X' is team red</p>
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </div>
    </div>
  );
};

export default Forms;
