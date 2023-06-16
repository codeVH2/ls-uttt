import React from "react";
import { useState, useEffect } from "react";
import Square from "./Square.js";
import "../App.css";
import { possibilities } from "../Possibilities";
import Forms from "./Forms.js";

function Board(props) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [result, setResult] = useState({ winner: "none", state: "none" }); //winner = "X" ou "O" ou "none", state = "win" ou "draw" ou "none"
  const Squares = [];

  //----------------------------------------------------------------------------------------------------------//
  useEffect(() => {
    let res = checkWinner(board); //res = 0 jogo incompleto, 1 Alguém ganhou, 2 houve empate
    let Boards = props.doneBoards;
    if (res === 1) {
      //Se alguém ganhou
      Boards[props.index] = props.player === "X" ? 1 : 2; // 1 = ganhou X, 2 = ganhou O
    } else if (res === 2) {
      //Se houve empate
      Boards[props.index] = 3;
    }

    props.setDoneBoards(Boards); //Atualiza o array doneBoards
   

    if (props.player === "X") {
      //Se o player for "X", muda para "O", se não, muda para "X"
      props.setPlayer("O");
    } else {
      props.setPlayer("X");
    }
    let unfinishedBoards = [];
    if(props.doneBoards[props.currentBoard] !== 0){
      
      for(let i = 0; i < props.doneBoards.length; i++){
        if(props.doneBoards[i] === 0) unfinishedBoards.push(props.doneBoards[i]);
      }
      // let board = unfinishedBoards[getRandomInt(unfinishedBoards.length - 1)];
      let board = unfinishedBoards[2];
      props.setCurrentBoard(board);
    }
    checkWinnerUltimate();

  }, [board]);

  //----------------------------------------------------------------------------------------------------------//

  useEffect(() => {
    //useEffect() é executado sempre que o valor de result é alterado
    if (result.state !== "none") {
      //Se o resultado for diferente de "none", mostra o resultado
      alert(`Game Finished! Winning Player: ${result.winner} `);
      restartGame();  
    }
  }, [result]);

  //----------------------------------------------------------------------------------------------------------//

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  
  const handleClickCaptureCard = async (event) => {
    

    // função tirada da ficha 11, faz com que o tabuleiro não seja jogável se o tabuleiro já estiver feito
    if (props.doneBoards[props.index] !== 0) {
      event.stopPropagation();
      if (props.doneBoards[props.currentBoard] !== 0) {

        let unfinishedBoards = [];
        for (let i = 0; i < props.doneBoards.length; i++) {
          if (props.doneBoards[i] === 0) unfinishedBoards.push(props.doneBoards[i]);
        }
        props.setCurrentBoard(unfinishedBoards[getRandomInt(unfinishedBoards.length - 1)]);
  
      }
    }
  };
  //----------------------------------------------------------------------------------------------------------//

  const chooseSquare = (square) => {
    //square = 0, 1, 2, 3, 4, 5, 6, 7, 8
    setBoard(
      board.map((value, index) => {
        //map() percorre o array board
        if (
          index === square &&
          value === "" &&
          props.currentBoard === props.index
        ) {
          //Se o valor do array for vazio, preenche com X ou O~
          // proximo minitab é o dsuqartesquare
          if (props.doneBoards[square] !== 0) 
          return props.player;
         
          props.setCurrentBoard(square); // faz com que se jogue no board do square jogado~
          

          return props.player;
        }
        return value;
      })
    );
  };

  //----------------------------------------------------------------------------------------------------------//

  const checkWinner = (Board_) => {
    let winner = null;

    possibilities.forEach((possibility) => {
      const firstPlayer = Board_[possibility[0]];
      if (firstPlayer === "") return;

      let foundWinner = true;

      possibility.forEach((index) => {
        if (Board_[index] !== firstPlayer) {
          foundWinner = false;
          return; // Retornar antecipadamente da função anônima do forEach interno
        }
      });

      if (foundWinner) {
        winner = firstPlayer;
        return; // Retornar antecipadamente da função anônima do forEach externo
      }
    });

    let allFilled = true;
    Board_.forEach((square) => {
      if (square === "") {
        allFilled = false;
        return; // Retornar antecipadamente da função anônima do forEach
      }
    });

    if (allFilled) {
      return 2; // Indicar empate
    }

    return winner === "X" || winner === "O" ? 1 : 0;
  };

  //----------------------------------------------------------------------------------------------------------//

  const restartGame = () => {
    props.setDoneBoards(["", "", "", "", "", "", "", "", ""]);
    for (let i = 0; i < 9; i++) {
      Squares[i] = (
        <Square
          value={""}
          key={i}
          isSelected={props.currentBoard === props.index}
          chooseSquare={() => chooseSquare(i)}
        />
      );
    }
    props.setPlayer("O");
  };

  //----------------------------------------------------------------------------------------------------------//
const checkWinnerUltimate = () =>{
    // Verificar se alguma possibilidade de vitória foi alcançada
    for (const possibility of possibilities) {
    const [a, b, c] = possibility;
    if (props.doneBoards[a] !== 0 && props.doneBoards[a] !== 3 && 
      props.doneBoards[a] === props.doneBoards[b] &&
      props.doneBoards[a] === props.doneBoards[c]
    ) {
      // Player has won
      const winner = props.doneBoards[a];
      const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popup-message");
  
      // Set the message in the popup based on the winner
      popupMessage.textContent = "Player " + winner + " won!";
  
      // Show the popup
      popup.style.display = "block";
  
      // Play Again button click handler
      const playAgainBtn = document.getElementById("play-again-btn");
      playAgainBtn.addEventListener("click", () => {
        restartGame()
        popup.style.display = "none";
      });
  
      // return winner; // Returns the player who won
      return props.doneBoards[a]; // Retorna o jogador que ganhou
    }
    }

    // Verificar se ocorreu um empate
    if (props.doneBoards.every(board => board !== 0)) {
    return 3; // Retorna 3 para indicar empate
    }
    return 0; // Retorna 0 se ninguém ganhou ainda
}

//----------------------------------------------------------------------------------------------------------//

  for (let i = 0; i < 9; i++) {
    Squares[i] = (
      <Square
        value={board[i]}
        key={i}
        isSelected={props.currentBoard === props.index}
        chooseSquare={() => chooseSquare(i)}
      />
    );
  }
  


  return (
    <>
      {props.currentBoard === props.index && (
        <div className="currentPlayer">Current Player: {props.player}</div>
      )}
      <div
        onClickCapture={handleClickCaptureCard}
        className={`board
          ${props.isWonX ? "wonX" : ""}  
          ${props.isWonO ? "wonO" : ""} 
          ${props.isWonDraw ? "wonDraw" : ""}
          ${props.currentBoard === props.index ? "boardSelected" : ""}
          ${props.doneBoards[props.index] !== 0 ? "boardBlock" : ""}`}
      >
        {Squares}
      </div>
    </>
  );
  
}

export default Board;
