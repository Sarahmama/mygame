import './App.css';
import mole from './images/mole.png';
import hole from './images/hole.png';
import hitMole from './images/hitMole.png'; 
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import CountDown from './components/CountDown';

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [clicked, setClicked] = useState(new Array(9).fill(false)); // To track clicked state
  const [gameOver, setGameOver] = useState(false); // Track game state
  const [timerKey, setTimerKey] = useState(0); // To reset the timer

  const hideMole = (index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = false;
      return newMoles;
    });
  };

  const guacMole = (index) => {
    if (!moles[index])return;
    setClicked((curClicked) => {
      const newClicked = [...curClicked];
      newClicked[index] = true; 
      return newClicked;
    });

    hideMole(index);
    setScore(score + 5);

    
    setTimeout(() => {
      setClicked((curClicked) => {
        const newClicked = [...curClicked];
        newClicked[index] = false;
        return newClicked;
      });
    }, 500); 
  };

  useEffect(() => {
    if (gameOver) return; 
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[randomIndex] = true;
        return newMoles;
      });
      setTimeout(() => {
        hideMole(randomIndex);
      }, 700);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles,gameOver]);

  const resetGame = () => {
    setScore(0);
    setMoles(new Array(9).fill(false));
    setGameOver(false);
    setTimerKey((prevKey) => prevKey + 1); // Increment timerKey to reset CountDown

  };
  const handleTimeUp = () => {
    setGameOver(true); // Stop the game
    resetGame();
  };

  return (
    <div className="App">
      <h1 className="guac">Guac-A-Mole</h1>
      <CountDown key={timerKey} initialSeconds={20} onTimeUp={handleTimeUp}   />
      <div className="square">
        {moles.map((isMole, index) => (
          <img
            key={index}
            src={clicked[index] ? hitMole : isMole ? mole : hole} 
            width="160px"
            className="m-3"
            onClick={() => guacMole(index)}
        
          />
        ))}
      </div>

      <div className="d-flex w-75 justify-content-around m-4">
        <h3>Score: {score}</h3>
        <button
          className="btn btn-danger"
         onClick={resetGame}
        >
          Reset
        </button>
 
      </div>
    </div>
  );
}

export default App;
