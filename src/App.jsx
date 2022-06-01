import Setup from './Setup';
import './App.css';
import { useState } from 'react';
import GameBoradFor2Player from './GameBoradFor2Player';
import GameBoradFor1Player from './GameBoradFor1Player';
function App() {
  const [setting, setSetting] = useState(true);
  const [player, setPlayer] = useState('One Player');
  const [playAs, setPlayAs] = useState('X');
  const onePlayerOrTwo = () => {
    if (player === 'Two Players') {
      return (
        <GameBoradFor2Player
          setSetting={setSetting}
        />
      );
       
    }
    return <GameBoradFor1Player playAs={playAs} setSetting={setSetting}/>
  };
  return (
    <div className="App">
      {setting ? (
        <Setup
          player={player}
          setPlayer={setPlayer}
          playAs={playAs}
          setPlayAs={setPlayAs}
          setSetting={setSetting}
        />
      ) : onePlayerOrTwo()}
    </div>
  );
}

export default App;
