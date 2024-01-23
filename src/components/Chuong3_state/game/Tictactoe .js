import React, { useState } from "react";
import "./gameStyle.css";

const win = (cell) => {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (cell[a] && (cell[a] === cell[b]) & (cell[a] === cell[c])) {
      return cell[a];
    }
  }
  return null;
};

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = win(board);
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const handleClickReset = () => {
    setBoard(Array(9).fill(null));
  };
  return (
    <div className="game__ticTacToe">
      <Board cells={board} clicked={handleClick} value={xIsNext}></Board>
      <div className="winner">{winner ? `Winner is ${winner}` : ""}</div>
      <button className="btn__reset" onClick={handleClickReset}>
        Reset
      </button>
    </div>
  );
};

//todo: ---------- Board game ---------
function Board(props) {
  return (
    <div className="game__board">
      {props.cells.map((item, index) => {
        return (
          <Cell
            key={index}
            value={item}
            clicked={() => props.clicked(index)}
            className={`game__cell ${item === "O" ? "x" : ""}`}
          ></Cell>
        );
      })}
    </div>
  );
}

//todo: ------------ cell game -------
function Cell(props) {
  return (
    <div className={props.className} onClick={props.clicked}>
      {props.value}
    </div>
  );
}

export default Tictactoe;
