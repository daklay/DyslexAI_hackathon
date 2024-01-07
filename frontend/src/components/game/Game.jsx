import React, { useEffect, useState } from "react";
import EreaMap from "./../images/GameErea.jpg";
import profil from "./../images/sources/profil-01.png"
//import { BrowserRouter ,Routes,Route,Link} from "react-router-dom";

const Game = () => {
  const words = [
    "apple",
    "banana",
    "grapes",
    "orange",
    "pineapple",
    "kiwi",
    "peach",
    "mango",
    "watermelon",
    "lemon",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [area, setArea] = useState("");
  const [userName, setUserName] = useState("");
  const [activePanel, setActivePanel] = useState("");

  useEffect(() => {
    const chosenArea = localStorage.getItem("area");
    const user = localStorage.getItem("name");
    setArea(chosenArea);
    setUserName(user);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((currentWordIndex) => currentWordIndex + 1);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  if (currentWordIndex >= words.length) setCurrentWordIndex(0);

  return (
    <div
      style={{
        backgroundImage: `url(${EreaMap})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
      }}
    >

  <div className="flex flex-col gap-6 items-end justify-center mx-7" style={{ height: "90vh"}}>
        <img width="60" src={profil} alt="" onClick={() => setActivePanel(activePanel === 'status' ? '' : 'status')}/>
        <img width="60" src={profil} alt=""  onClick={() => setActivePanel(activePanel === 'hints' ? '' : 'hints')} />
        <img width="60" src={profil} alt="" />
        <img width="60" src={profil} alt="" />
    </div>
      <div>
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
        <p>Task number {currentWordIndex + 1}: {words[currentWordIndex]}</p>
      </div>
    </div>
  );
};

export default Game;