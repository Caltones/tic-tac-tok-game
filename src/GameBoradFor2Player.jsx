import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Alert, Typography } from '@mui/material';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function GameBoradFor2Player({ setSetting }) {
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
  const [win, setWin] = useState(false);
  const [open, setOpen] = useState(false);
  const table = { X: 'O', O: 'X' };
  const [round,setRound] = useState(0)
  const checkWinner = (copy) => {
    for (const i of winningPattern) {
      let temp = new Set();
      for (const j of i) {
        temp.add(copy[j]);
      }
      if (!temp.has(' ') && temp.size === 1) {
        return true;
      }
    }
    return false;
  };
  const handleClickFor2Player = (v, i) => {
    if (win) return;
    if (round >=9)return
    if (v !== ' ') return setOpen(true);
    const copy = board.slice();
    copy[i] = turn;
    setRound(round+1)
    setOpen(false);
    setBoard(copy);
    if (checkWinner(copy)) return setWin(true);
    setTurn(table[turn]);
  };
  const [turn, setTurn] = useState('X');
  const reset = () => {
    setSetting(true);
    setBoard([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
  };
  const strHandler = ()=>{
    if (win){
      return `Player ${turn} wins!`
    }
    if(round <9){
      return `It's ${turn}'s turn`
    }
    return "It's a tie"
  }
  return (
    <>
      <Typography variant="h6" component="h6">
        {strHandler()}
      </Typography>
      <Box>
        <Grid
          sx={{
            justifyContent: 'center',
            width: '40vw',
            height: '40vw',
            minWidth: 200,
            minHeight: 200,
          }}
          container
        >
          {board.map((v, i) => (
            <Grid item xs={4} key={i}>
              <Button
                color={v === 'X' ? 'error' : 'primary'}
                variant="outlined"
                sx={{ height: '100%', width: '100%', fontSize: 20 }}
                onClick={() => handleClickFor2Player(v, i)}
              >
                {v}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button
        variant="contained"
        startIcon={<RestartAltIcon />}
        onClick={reset}
      >
        Reset
      </Button>

      <Box sx={{ width: '100%', mt: 'auto' }}>
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Position has been occupied
          </Alert>
        </Collapse>
      </Box>
    </>
  );
}
