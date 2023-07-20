import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {

    const description =
      move > 0 ?
        'Go to move #' + move :
        'Go to game start!';

    return (
      <li key={move}>
        {
          move == currentMove ?
            <>You are at move #{move}</> :
            <button onClick={() => setCurrentMove(move)}>{description}</button>
        }
      </li>
    );
  });

  const [ascending, setAscending] = useState(true);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">

        <button
          onClick={() => setAscending(!ascending)}>
          {
            ascending ?
              "Ascending" :
              "Descending"
          }
        </button>

        <ol>{
          ascending ?
            moves :
            moves.slice().reverse()
        }</ol>

      </div>
    </div>
  );
}

