import React, { useState } from "react";

import redCir from "./red.svg";
import blackCir from "./black.svg";
import whiteCir from "./white.svg";

import { configureStore } from "redux";
import { v4 as uuidv4 } from "uuid";

const ConnectFour = ({ connectFourHidden }) => {
  const [playerTurn, setPlayerTurn] = useState(true); //red is true
  const [gameOver, setGameOver] = useState(false);
  const [whoWon, setWhoWon] = useState("Red");
  const [board, setBoard] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);

  return (
    <div className={`con-four ${connectFourHidden ? "" : "connect-show"}`}>
      <GameStatus
        playerTurn={playerTurn}
        gameOver={gameOver}
        setGameOver={setGameOver}
        setBoard={setBoard}
        whoWon={whoWon}
        setPlayerTurn={setPlayerTurn}
      />
      <Board
        board={board}
        setBoard={setBoard}
        gameOver={gameOver}
        setGameOver={setGameOver}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
        setWhoWon={setWhoWon}
      />
    </div>
  );
};

const Board = ({
  board,
  setBoard,
  gameOver,
  setGameOver,
  playerTurn,
  setPlayerTurn,
  setWhoWon,
}) => {
  const handleMove = (ind) => {
    if (!gameOver) {
      var x = -1;
      for (let i = 7; i >= 0; i--) {
        if (board[ind][i] === "") {
          x = i;
          break;
        }
      }
      if (x !== -1) {
        const newBoard = [...board];
        const newCol = [...newBoard[ind]];
        if (playerTurn === true) newCol[x] = "r";
        else newCol[x] = "b";
        newBoard[ind] = newCol;
        setBoard(newBoard);
        setPlayerTurn(!playerTurn);
        if (checkWinCondition(newCol[x], ind, x)) {
          setGameOver(true);
          if (newCol[x] === "b") {
            setWhoWon("Black");
          }
        }
      }
    }
  };

  const checkWinCondition = (ch, col, row) => {
    // Check horizontally
    if (
      countConsec(ch, col, row, 0, 1) + countConsec(ch, col, row, 0, -1) >=
      3
    ) {
      return true;
    }
    // Check vertically
    if (
      countConsec(ch, col, row, -1, 0) + countConsec(ch, col, row, 1, 0) >=
      3
    ) {
      return true;
    }
    // Check both diagonals
    if (
      countConsec(ch, col, row, 1, 1) + countConsec(ch, col, row, -1, -1) >=
        3 ||
      countConsec(ch, col, row, 1, -1) + countConsec(ch, col, row, -1, 1) >= 3
    ) {
      return true;
    }
    return false;
  };

  const countConsec = (ch, x, y, dx, dy) => {
    let count = 0;
    let r = x + dx;
    let c = y + dy;

    while (
      r >= 0 &&
      c >= 0 &&
      r < board.length &&
      c < board[0].length &&
      board[r][c] === ch &&
      ch !== ""
    ) {
      count++;
      r += dx;
      c += dy;
    }
    return count;
  };

  const songColor = {
    background: "#E78383",
  };

  return (
    <div className="layout">
      <div className="blueEdge" />
      <div className="board" style={songColor}>
        <div className="slot-col" onClick={() => handleMove(0)}>
          {board[0].map((ch, y) => {
            return <Slot ch={ch} x={0} y={y} key={uuidv4()} />;
          })}
        </div>
        <div className="slot-col" onClick={() => handleMove(1)}>
          {board[1].map((ch, y) => {
            return <Slot ch={ch} x={1} y={y} key={uuidv4()} />;
          })}
        </div>
        <div className="slot-col" onClick={() => handleMove(2)}>
          {board[2].map((ch, y) => {
            return <Slot ch={ch} x={2} y={y} key={uuidv4()} />;
          })}
        </div>
        <div className="slot-col" onClick={() => handleMove(3)}>
          {board[3].map((ch, y) => {
            return <Slot ch={ch} x={3} y={y} key={uuidv4()} />;
          })}
        </div>
        <div className="slot-col" onClick={() => handleMove(4)}>
          {board[4].map((ch, y) => {
            return <Slot ch={ch} x={4} y={y} key={uuidv4()} />;
          })}
        </div>
        <div className="slot-col" onClick={() => handleMove(5)}>
          {board[5].map((ch, y) => {
            return <Slot ch={ch} x={5} y={y} key={uuidv4()} />;
          })}
        </div>
        <div className="slot-col" onClick={() => handleMove(6)}>
          {board[6].map((ch, y) => {
            return <Slot ch={ch} x={6} y={y} key={uuidv4()} />;
          })}
        </div>
      </div>
      <div className="blueEdge" />
    </div>
  );
};

const Slot = ({ ch, x, y }) => {
  return (
    <>
      <div className="slot">
        <img src={ch === "" ? whiteCir : ch === "r" ? redCir : blackCir} />
      </div>
    </>
  );
};

const GameStatus = ({
  playerTurn,
  gameOver,
  setGameOver,
  setBoard,
  whoWon,
  setPlayerTurn,
}) => {
  const handleReset = () => {
    setBoard([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]);
    setGameOver(false);
    setPlayerTurn(true);
  };

  return (
    <div className="game-toolbar">
      <div className={"text-status"}>
        <h1>
          {gameOver
            ? "Game Over! " + whoWon + " wins!"
            : playerTurn
            ? "Red's turn"
            : "Black's turn"}
        </h1>
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default React.memo(ConnectFour);
