import { useState, useEffect } from 'react';
import MainGameBoard from './MainGameBoard';
export default function GameBoradFor1Player({ setSetting, playAs }) {
  const [board, setBoard] = useState([
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
  ]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (playAs === 'O') {
      processingData(board);
    }
  }, []);

  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [win, setWin] = useState(false);
  const [open, setOpen] = useState(false);
  const table = { X: 'O', O: 'X' };
  const checkWinner = (copy) => {
    for (const i of winningPattern) {
      let temp = new Set();
      for (const j of i) {
        temp.add(copy[j]);
      }
      if (!temp.has(' ') && temp.size === 1 ) {
        return true;
      }
    }
    return false;
  };
  const availiableSpot = (tempBoard) => {
    let temp = [];
    for (let i = 0; i < tempBoard.length; i++) {
      if (tempBoard[i] === ' ') {
        temp.push(i);
      }
    }
    return temp;
  };
  const  handleClickFor1Player = async (v, i) => {
    if (win) return;
    if (v !== ' ') return setOpen(true);
    const copy = board.slice();
    copy[i] = turn;
    setOpen(false);
    setBoard(copy);
    if (checkWinner(copy)) return setWin(true);
    if (availiableSpot(copy).length===0) return setWin(true) 
    setTurn(table[turn]);
    processingData(copy)
   
  };
  function  processingData(temp) {
    setLoading(true);
    const worker = new window.Worker('src/minimax_worker.js');
    worker.postMessage({ board: temp, playAs: playAs });
    worker.addEventListener('message', (res) => {
      console.log(res.data);
      const copy = temp.slice();
      copy[res.data[0].index] = res.data[1];
      
      setBoard(copy);
      setLoading(false);
      if (availiableSpot(copy).length===0) return setWin(true) 
      if (checkWinner(copy)) return setWin(true)
      setTurn(table[res.data[1]]);
    });
  }
  const [turn, setTurn] = useState('X');
  const reset = () => {
    setSetting(true);
    setBoard([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
  };

  return (
    <>
      <MainGameBoard
        handleClickFor1Player={handleClickFor1Player}
        open={open}
        board={board}
        loading={loading}
        win={win}
        reset={reset}
        setOpen={setOpen}
        turn={turn}
        availiableSpot = {availiableSpot}
      />
    </>
  );


}
