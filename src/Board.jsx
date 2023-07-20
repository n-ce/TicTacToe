import calculateWinner from './calculateWinner.js';

function Square({ value, onSquareClick, winner }) {
  const classname = "square" + (winner ? " winner" : "");

  return (
    <button
      className={classname}
      onClick={onSquareClick} >
      {value}
    </button >
  );
}

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {

    if (calculateWinner(squares) || squares[i])
      return;

    const nextSquares = squares.slice();

    nextSquares[i] =
      xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  const winInfo = calculateWinner(squares);
  const winner = winInfo ? Object.keys(winInfo)[0] : null;
  const winningSquares = winInfo?.[winner];


  const status = (!squares.includes(null) && !winInfo) ? "DRAW" : winner ?
    'Winner: ' + winner :
    'Next player: ' + (xIsNext ? 'X' : 'O');



  const boardcells = [0, 1, 2].map(i =>
  (<div key={i} className="board-row">{
    [0, 1, 2].map(j => {
      const k = (i * 3) + j;
      return (
        <Square
          key={k}
          winner={winningSquares?.includes(k)}
          value={squares[k]}
          onSquareClick={() => handleClick(k)}
        />
      )
    })
  }</div>)
  );

  return (
    <>
      <div className="status">{status}</div>
      {boardcells}
    </>
  );
}
