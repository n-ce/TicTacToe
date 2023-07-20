import { useState } from 'react';
import Board from './Board';

const locations = [
  [1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]
];

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

  const moves = history.map((squares, move, arr) => {
    const moveIndex = move ? arr[move-1].findIndex((square, i) => square !== arr[move][i]) : null;
    const [row, col] = move ? locations[moveIndex] : [null, null];
    
    const description =
      move > 0 ?
        `Go to move #${move} at (${row},${col})` :
        'Go to game start!';

    return (
      <li key={move}>
        {
          move == currentMove ?
            <>You are at move #{move} at ({row},{col})</> :
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

