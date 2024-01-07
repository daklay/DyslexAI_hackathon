import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapImage from './../images/startinMap.jpeg'
import { useSpeechSynthesis } from 'react-speech-kit';

function MyComponent() {
    const { speak, voices } = useSpeechSynthesis();
  const nav = useNavigate();
  const containerStyle = {
    display: 'flex',
    width: '100%',
    height: '100vh',
  };

  const imageContainerStyle = {
    width: '75%',
    height: '100%',
  };

  const sidebarStyle = {
    width: '25%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const choiceStyle = {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc', // Change this as needed
    borderRadius: '5px',
    cursor: 'pointer'
  };

  function handleNavigate(area) {
    speak({ text: `You have choosen the area ${area}, Good luck`, voice: voices[2] });
    localStorage.setItem('area', area);
    nav('/game');
  }

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src={MapImage} alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={sidebarStyle}>
        <div style={choiceStyle} onClick={() => handleNavigate('A')}>Area A</div>
        <div style={choiceStyle} onClick={() => handleNavigate('B')}>Area B</div>
        <div style={choiceStyle} onClick={() => handleNavigate('C')}>Area C</div>
        <div style={choiceStyle} onClick={() => handleNavigate('D')}>Area D</div> 
      </div>
    </div>
  );
}

export default MyComponent;