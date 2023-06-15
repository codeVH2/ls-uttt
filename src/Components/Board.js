import React from "react";
import { useState, useEffect } from "react";
import Square from "./Square.js";
import "../App.css";
import { possibilities } from "../Possibilities";

function Board(props) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [result, setResult] = useState({ winner: "none", state: "none" }); //winner = "X" ou "O" ou "none", state = "win" ou "draw" ou "none"
  const Squares = [];

  //----------------------------------------------------------------------------------------------------------//
  useEffect(() => {
    //useEffect() é executado sempre que o valor de board é alterado
    let res = checkWinner(board); //res = 0 jogo incompleto, 1 Alguém ganhou, 2 houve empate
    let Boards = props.doneBoards;
    if (res === 1) {
      //Se alguém ganhou
      Boards[props.index] = props.player === "X" ? 1 : 2; // 1 = ganhou X, 2 = ganhou O
      console.log(Boards);
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

  const handleClickCaptureCard = (event) => {
    //função tirada da ficha 11, faz com que o tabuleiro não seja jogável se o tabuleiro já estiver feito
    if (props.doneBoards[props.index] !== 0) {
      event.stopPropagation();
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
         
          props.setCurrentBoard(square); // faz com que se jogue no board do square jogado
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
    setBoard(["", "", "", "", "", "", "", "", ""]);
    props.setPlayer("O");
  };

  //----------------------------------------------------------------------------------------------------------//
const checkWinnerUltimate = () =>{
    // Verificar se alguma possibilidade de vitória foi alcançada
for (const possibility of possibilities) {
const [a, b, c] = possibility;
if (
  props.doneBoards[a] !== 0 && props.doneBoards[a] !== 3 && 
  props.doneBoards[a] === props.doneBoards[b] &&
  props.doneBoards[a] === props.doneBoards[c]
) {
  console.log("ganhou" + props.doneBoards[a]);
  return props.doneBoards[a]; // Retorna o jogador que ganhou
}
}

// Verificar se ocorreu um empate
if (props.doneBoards.every(board => board !== 0)) {
return 3; // Retorna 3 para indicar empate
}
console.log("ainda n ganhou");
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
    <div
      onClickCapture={handleClickCaptureCard}
      className={`board
      ${props.isWonX ? "wonX" : ""}  
      ${props.isWonO ? "wonO" : ""} 
      ${props.currentBoard === props.index ? "boardSelected" : ""}
       ${props.doneBoards[props.index] !== 0 ? "boardBlock" : ""}`}
    >
      {Squares}
    </div>
  );
}

export default Board;
