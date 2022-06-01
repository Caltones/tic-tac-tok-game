import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import StartTwoToneIcon from '@mui/icons-material/StartTwoTone';

export default function Setup({
  setSetting,
  setPlayer,
  setPlayAs,
  player,
  playAs,
}) {
  const handleSubmit = () => {
    setSetting(false);
  };
  return (
    <>
      <FormControl>
        <FormLabel>Player no.:</FormLabel>
        <RadioGroup
          row
          name="player-number-btn-gp"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        >
          <FormControlLabel
            value="One Player"
            control={<Radio />}
            label="One Player"
          />
          <FormControlLabel
            value="Two Players"
            control={<Radio />}
            label="Two Players"
          />
        </RadioGroup>
        <FormLabel>Play as:</FormLabel>
        <RadioGroup
          row
          name="start-as-btn-gp"
          value={playAs}
          onChange={(e) => setPlayAs(e.target.value)}
        >
          <FormControlLabel
            disabled={player === 'Two Players'}
            value="X"
            control={<Radio />}
            label="X"
          />
          <FormControlLabel
            disabled={player === 'Two Players'}
            value="O"
            control={<Radio />}
            label="O"
          />
        </RadioGroup>
        <Button
          onClick={handleSubmit}
          variant="contained"
          endIcon={<StartTwoToneIcon />}
        >
          Go
        </Button>
      </FormControl>
    </>
  );
}
