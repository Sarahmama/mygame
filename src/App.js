import './App.css';
import mole from './images/mole.png';
import hole from './images/hole.png';
import hitMole from './images/hitMole.png'; 
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [clicked, setClicked] = useState(new Array(9).fill(false)); // To track clicked state

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
  }, []);

  return (
    <div className="App">
      <h1 className="guac">Guac-A-Mole</h1>

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
          onClick={() => {
            setScore(0);
            setMoles(new Array(9).fill(false));
            setClicked(new Array(9).fill(false));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
