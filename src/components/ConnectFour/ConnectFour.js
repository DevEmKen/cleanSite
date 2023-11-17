import { useState } from "react";

import Board from "./Board";
import GameStatus from "./GameStatus";

const ConnectFour = ({ currSong, connectFourHidden }) => {
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
        currSong={currSong}
      />
    </div>
  );
};

export default ConnectFour;
