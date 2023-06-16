import { possibilities } from '../Possibilities.js';
import Board from './Board.js';
import {useState, useEffect} from 'react';


function UltimateBoard() {
  const [currentBoard, setCurrentBoard] = useState(0); //currentBoard = 0, 1, 2, 3, 4, 5, 6, 7, 8,  board que esta a ser jogada
  const boards = Array(9).fill(null); 
  const [doneBoards, setDoneBoards] = useState(Array(9).fill(0)); // 0 = não acabado, 1 = ganhou X, 2 = ganhou O, 3 = empate
  const [player, setPlayer] = useState("O"); //player = "X" ou "O"
  for(let i = 0; i < 9; i++){
    boards[i] = <Board 
    isWonX = {doneBoards[i] === 1} //isWonX = true se o board i foi ganho por X
    isWonO = {doneBoards[i] === 2} //isWonO = true se o board i foi ganho por O
    isWonDraw = {doneBoards[i] === 3} // isWonDraw = trie se o board i não for ganho por ninguem
    doneBoards = {doneBoards}	
    setDoneBoards = {setDoneBoards}
    player = {player}
    setPlayer = {setPlayer}	
    key={i}
    index = {i}
    currentBoard = {currentBoard}
    setCurrentBoard = {setCurrentBoard}
    checkWinnerUltimate />
  }

 


  return (
    <div className="ultimate-board">
      {boards}
    </div>
  );
}

export default UltimateBoard;
