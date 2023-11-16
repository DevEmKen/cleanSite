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

export default GameStatus;
