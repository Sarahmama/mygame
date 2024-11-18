import './App.css';
import mole from './images/mole.png'; // Image for mole
import hole from './images/hole.png'; // Image for empty hole
import hitMole from './images/hitMole.png'; // Image for hit mole
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS for styling
import { useEffect, useState } from 'react';
import CountDown from './components/CountDown'; // Countdown timer component

function App() {
  // State for keeping track of the score
  const [score, setScore] = useState(0);

  // State for tracking whether each mole is visible (true/false for 9 moles)
  const [moles, setMoles] = useState(new Array(9).fill(false));

  // State for tracking whether a mole has been clicked (true/false for 9 moles)
  const [clicked, setClicked] = useState(new Array(9).fill(false));

  // State to determine if the game is over
  const [gameOver, setGameOver] = useState(false);

  // State to control timer resets by forcing re-renders of the CountDown component
  const [timerKey, setTimerKey] = useState(0);

  // Function to hide a mole at the given index
  const hideMole = (index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = false;
      return newMoles;
    });
  };

  // Function to handle clicking a mole
  const guacMole = (index) => {
    if (!moles[index]) return; // If no mole is present, ignore the click

    // Set the clicked state for the mole
    setClicked((curClicked) => {
      const newClicked = [...curClicked];
      newClicked[index] = true;
      return newClicked;
    });

    hideMole(index); // Hide the mole
    setScore(score + 5); // Increment the score

    // Reset the clicked state after 500ms
    setTimeout(() => {
      setClicked((curClicked) => {
        const newClicked = [...curClicked];
        newClicked[index] = false;
        return newClicked;
      });
    }, 500);
  };

  // Effect to randomly show moles at intervals
  useEffect(() => {
    if (gameOver) return; // Stop the interval if the game is over

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length); // Pick a random index
      setMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[randomIndex] = true; // Show a mole at the random index
        return newMoles;
      });

      // Hide the mole after 800ms
      setTimeout(() => {
        hideMole(randomIndex);
      }, 800);
    }, 1000); // Repeat every second

    return () => {
      clearInterval(interval); // Cleanup on unmount or game over
    };
  }, [moles, gameOver]);

  // Function to reset the game
  const resetGame = () => {
    setScore(0); // Reset score
    setMoles(new Array(9).fill(false)); // Hide all moles
    setGameOver(false); // Resume the game
    setTimerKey((prevKey) => prevKey + 1); // Force the CountDown to reset
  };

  // Function called when the timer runs out
  const handleTimeUp = () => {
    setGameOver(true); // End the game
    resetGame(); // Reset the game state
  };

  return (
    <div className="App">
      <h1 className="guac">Guac-A-Mole</h1>

       {/* Countdown timer with 20 seconds, resets with the timerKey  */}
      <CountDown key={timerKey} initialSeconds={30} onTimeUp={handleTimeUp} />

      {/* Grid of moles and holes */}
      <div className="square">
        {moles.map((isMole, index) => (
          <img
            key={index}
            src={
              clicked[index]
                ? hitMole // Show hit mole image if clicked
                : isMole
                ? mole // Show mole image if mole is visible
                : hole // Otherwise show hole image
            }
            width="160px"
            className="m-3"
            onClick={() => guacMole(index)} // Handle mole click
            alt={isMole ? 'Mole' : 'Hole'} // Accessibility
          />
        ))}
      </div>

      {/* Score display and reset button */}
      <div className="d-flex w-75 justify-content-around m-4">
        <h3>Score: {score}</h3>
        <button
          className="btn btn-danger"
          onClick={resetGame} // Reset game on click
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
