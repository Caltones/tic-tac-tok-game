import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Alert, Typography, Skeleton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function MainGameBoard({
  win,
  handleClickFor1Player,
  open,
  board,
  reset,
  setOpen,
  turn,
  loading,
  availiableSpot
}) {
  const str = ()=>{
    if (availiableSpot(board).length === 0) return "It's a draw!"
    if (win) return `Player ${turn} wins!`
    return `It's ${turn}'s turn...`
  }
  return (
    <>
      <Typography variant="h6" component="h6">
        {loading ? <Skeleton width={'8rem'} height={'2rem'} /> : str()}
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
            {loading?   <Skeleton width={'100%'} height={'100%'} sx={{minHeight:200,minWidth:200}} />:board.map((v, i) => (
              <Grid item xs={4} key={i}>
                <Button
                  color={v === 'X' ? 'error' : 'primary'}
                  variant="outlined"
                  sx={{ height: '100%', width: '100%', fontSize: 20 }}
                  onClick={() => handleClickFor1Player(v, i)}
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
