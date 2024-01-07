
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EreaMap from './../images/GameErea.jpg';
import profil1 from "./../images/sources/profil-01.png";
import profil2 from "./../images/sources/profil-02-01.png";
import profil3 from "./../images/sources/profil-023-01.png";

const Game = () => {
  const words = ['CAT', 'CAR', 'GET', 'BOT', 'A7A'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const [area, setArea] = useState('');
  const [userName, setUserName] = useState('');
  const [activePanel, setActivePanel] = useState('');

  useEffect(() => {
    const chosenArea = localStorage.getItem('area');
    const user = localStorage.getItem('name');
    setArea(chosenArea);
    setUserName(user);
  }, []);

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Clear any previous timers
    if (timer) {
      clearInterval(timer);
    }

    // Set up a new 30-second timer
    let newTimer = setInterval(() => {
      const nextIndex = currentWordIndex + 1;
      if (nextIndex < words.length) {
        setCurrentWordIndex(nextIndex);
      } else {
        // If we've reached the end of words, clear interval
        clearInterval(newTimer);
      }
    }, 30000); // Set timer to 30 seconds

    // Store the timer id for cleanup
    setTimer(newTimer);

    // Cleanup function to clear timer when component unmounts or timer changes
    return () => clearInterval(newTimer);
  }, [words.length, currentWordIndex, timer]);

  // Ensure the timer is cleared if the application no longer needs it
  useEffect(() => {
    return () => timer && clearInterval(timer);
  }, [timer]);

  const currentWord = words[currentWordIndex];
  const wordChars = currentWord.split('');

  const nav = useNavigate();

  const getNextArea = (currentArea) => {
    switch (currentArea) {
      case 'A':
        localStorage.setItem('area', 'B');
        nav('/map');
        return 'B';
      case 'B':
        localStorage.setItem('area', 'C');
        nav('/map');
        return 'C';
      case 'C':
        localStorage.setItem('area', 'D');
        nav('/map');
        return 'D';
      case 'D':
        return 'R';
      // Add more cases as needed
      default:
        return currentArea;
    }
  };

  const [chars, setChars] = useState([]);
  function handleOnDrag(e, id) {
    e.dataTransfer.setData("CHAR:", id);
  }

  function handleOnDrop(e) {
    let char = e.dataTransfer.getData("CHAR:");
    setChars((currentChars) => {
      // Only add more characters if there is room
      if (currentChars.length < wordChars.length) {
        const newChars = [...currentChars, char];

        // Check if we reached the last character, and validate the word
        if (newChars.length === wordChars.length) {
          validateWordAndAdvance(newChars);
        }

        return newChars;
      }

      return currentChars;
    });
  }

  function validateWordAndAdvance(newChars) {
    const isWordCorrect = newChars.join('') === currentWord;
    if (isWordCorrect) {
      // Word is correct, advance and reset chars
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Word is incorrect, increment count and advance
      setIncorrectCount(incorrectCount + 1);
      setCurrentWordIndex(currentWordIndex + 1);
    }
    setChars([]);
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }

  const currentArea = localStorage.getItem('area');
  const moveToNextArea = () => {
    const nextArea = getNextArea(currentArea);
    localStorage.setItem('area', nextArea);

    if (nextArea === 'R') {
      nav('/results'); // Adjust the route based on the project structure
    }
  };
  useEffect(() => {
    if (wordChars.length === chars.length) {
      const isWordCorrect = chars.every((char, index) => char === wordChars[index]);
      if (isWordCorrect) {
        alert("Word is correct!");
      } else {
        alert("Word is incorrect, please try again!");
        setChars([]);  // reset the chars, allowing user to drag again
      }
    }
  }, [chars, wordChars]);

  useEffect(() => {
    // When currentWordIndex changes, check if the game is finished (end of words array)
    if (currentWordIndex + 1 === words.length) {
      // Game finished, print correct and incorrect word counts to the console
      console.log(`Correct words: ${currentWordIndex - incorrectCount}`);
      console.log(`Incorrect words: ${incorrectCount}`);

      // Save the counts to localStorage
      localStorage.setItem('correctCount', currentWordIndex - incorrectCount);
      localStorage.setItem('incorrectCount', incorrectCount);

      // Do any additional end-of-game logic here, such as navigating to a results page
    }
  }, [currentWordIndex, incorrectCount, words.length]);

  const correctCount = currentWordIndex - incorrectCount;
  return (
    <div style={{
      backgroundImage: `url(${EreaMap})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>


      <div className='flex items-center justify-center' style={{width:"70%" ,height:"80vh"}}>
      {activePanel === 'status' &&
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '80%',
          padding: '30px',
          borderRadius: '4px',
          backgroundColor: 'white',
          zIndex: 10
        }}>
          <h1 className='text-green-900 text-4xl'>Your informations : </h1>
          <p className='text-2xl mt-8'>Name: {userName}</p>
          <p className='text-2xl mt-6'>Area: {area}</p>
          <div className='text-2xl mt-6'>Progress Bar</div>
        </div>}
      {activePanel === 'hints' &&
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '75%',
          padding: '20px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 10
        }}>
          <p>Hint: test</p>
        </div>}

      {currentWordIndex < words.length - 1 ?
      <div>
        
      <div className ="flex justify-center"
       style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px',
        // width: '70%',
      }}>
        <h2 style={{
          color: 'green',
          fontSize: '26px',
          textAlign:'center',
          fontWeight:'bold',
          fontFamily: 'Comic Sans MS, cursive, sans-serif',
        }}>
          {`Task number ${currentWordIndex + 1}: ${words[currentWordIndex]}`}
        </h2>
      </div>

      {currentArea === 'A' &&
  <div className=' mt-6 m'>
  <div style={{
    backgroundColor: "rgba(255, 255, 255, 0)",
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '10px',
    margin: '10px'

  }} className=' w-96 h-40 text-center'>
    <div className='text-5xl font-bold text-white border-2 flex justify-center items-center' draggable onDragStart={(e) => handleOnDrag(e, `${currentWord[2]}`)}> <span>{currentWord[2]}</span> </div>
    <div className='text-5xl font-bold text-white border-2 flex justify-center items-center' draggable onDragStart={(e) => handleOnDrag(e, `${currentWord[0]}`)}><span>{currentWord[0]}</span></div>
    <div className='text-5xl font-bold text-white border-2 flex justify-center items-center' draggable onDragStart={(e) => handleOnDrag(e, `${currentWord[1]}`)}><span>{currentWord[1]}</span></div>
  </div>
  <div>
    <div style={{
      margin:"10px",
      border:"2px solid green",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px', 
    }} className=' w-96 h-40 text-center' onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
      {chars.map((char, index) => ( 
        <div className='text-5xl font-bold text-white border-2 flex justify-center items-center' style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}} key={index}>{char}</div>
      ))}
    </div>
  </div>
</div>
}
          {currentArea === 'B' &&
            <div>
              <div>
                <div>{currentWord[2]}</div>
                <div>{currentWord[0]}</div>
                <div>{currentWord[3]}</div>
                <div>{currentWord[1]}</div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          }
          {currentArea === 'C' &&
            <div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          }
          {currentArea === 'D' &&
            <div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          }
        </div>
        :
        <div className="shadow-lg" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '50%',
          padding: '20px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 10
        }}>
         <div className="p-6 rounded-lg  text-center">
  <p className="text-green-600 font-bold text-lg">Congratulations, <b className='text-red-600'>{userName}</b>!</p>
  <p className="text-green-800">You have finished your first chapter.</p>
  <button className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline" onClick={moveToNextArea}>
    Click here to see your results
  </button>
</div>
        </div>
      }
      </div>
      {currentWordIndex < words.length - 1 &&

<div>
<div className="flex flex-col gap-6 items-end justify-center mx-7" style={{ height: "90vh",position:"absolute",top:0,right:0 }}>
    <img width="60" src={profil1} alt="" onClick={() => setActivePanel(activePanel === 'status' ? '' : 'status')} />
    <img width="60" src={profil2} alt="" onClick={() => setActivePanel(activePanel === 'status' ? '' : 'status')} />
    <img width="60" src={profil3} alt="" onClick={() => setActivePanel(activePanel === 'status' ? '' : 'status')} />
  </div>
</div>}
    </div>
  );
};

export default Game;