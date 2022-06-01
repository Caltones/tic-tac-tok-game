onmessage = (props) => {
  console.log(props.data)

  const table = { X: 'O', O: 'X' };
  const huPlayer = props.data.playAs;
  const aiPlayer = table[props.data.playAs];
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
  const availiableSpot = (tempBoard) => {
    let temp = [];
    for (let i = 0; i < tempBoard.length; i++) {
      if (tempBoard[i] === ' ') {
        temp.push(i);
      }
    }
    return temp;
  };
  const checkWinner = (copy, player) => {
    for (const i of winningPattern) {
      let temp = new Set();
      for (const j of i) {
        temp.add(copy[j]);
      }
      if (!temp.has(' ') && temp.size === 1 && temp.has(player)) {
        return true;
      }
    }
    return false;
  };
  const minimax = (newBoard, player) => {
    let availSpots = availiableSpot(newBoard);
    if (checkWinner(newBoard, huPlayer)) {
      return { score: -1 };
    }
    if (checkWinner(newBoard, aiPlayer)) {
      return { score: 1 };
    }
    if (availSpots.length === 0) {
      return { score: 0 };
    }
    let moves = [];

    // loop through available spots
    for (const i of availSpots) {
      //create an object for each and store the index of that spot
      let move = {};
      move.index = i;

      // set the empty spot to the current player
      newBoard[i] = player;

      /*collect the score resulted from calling minimax 
        on the opponent of the current player*/
      if (player == aiPlayer) {
        let result = minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      // reset the spot to empty
      newBoard[i] = ' ';

      // push the object to the array
      moves.push(move);
    }
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if (player === aiPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the moves array
    return moves[bestMove];
  };

  postMessage([minimax(props.data.board, aiPlayer),aiPlayer]);
};
