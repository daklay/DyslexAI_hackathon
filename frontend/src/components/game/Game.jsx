import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EreaMap from './../images/GameErea.jpg';
import profil from "./../images/sources/profil-01.png"

const Game = () => {
  const words = ['apple', 'banana', 'grapes', 'orange', 'pineapple', 'kiwi', 'peach', 'mango', 'watermelon', 'lemon'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [area, setArea] = useState('');
  const [userName, setUserName] = useState('');
  const [activePanel, setActivePanel] = useState('');

  useEffect(() => {
    const chosenArea = localStorage.getItem('area');
    const user = localStorage.getItem('name');
    setArea(chosenArea);
    setUserName(user);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < words.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(timer);
          return prevIndex;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [words.length]);

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

  const moveToNextArea = () => {
    const currentArea = localStorage.getItem('area');
    const nextArea = getNextArea(currentArea);
    localStorage.setItem('area', nextArea);

    if (nextArea === 'R') {
      nav('/results'); // Adjust the route based on the project structure
    }
  };

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
      {currentWordIndex < words.length - 1 &&
        <>
          <div className="flex flex-col gap-6 items-end justify-center mx-7" style={{ height: "90vh" }}>
            <img width="60" src={profil} alt="" onClick={() => setActivePanel(activePanel === 'status' ? '' : 'status')} />
            <img width="60" src={profil} alt="" onClick={() => setActivePanel(activePanel === 'status' ? '' : 'status')} />
            <img width="60" src={profil} alt="" />
            <img width="60" src={profil} alt="" />
          </div>
        </>}
        {activePanel === 'status' &&
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '75%',
          padding: '20px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 10
        }}>
          <p>Name: {userName}</p>
          <p>Area: {area}</p>
          <div>Progress Bar</div>
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
        <>
          <p>Task number {currentWordIndex + 1}: {words[currentWordIndex]}</p>
          {wordChars.map((char, index) => (
            <div
              key={index}
              style={{
                margin: '5px',
                width: '100px',
                height: '100px',
                backgroundColor: 'lightgray',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
            >
              {char}
            </div>
          ))}
        </>
        :
        <div style={{
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
          <p>Congratulations, {userName}!</p>
          <p>You have finished your first chapter.</p>
          <button onClick={moveToNextArea}>Click here to see your results</button>
        </div>
      }
    </div>
  );
};

export default Game;
