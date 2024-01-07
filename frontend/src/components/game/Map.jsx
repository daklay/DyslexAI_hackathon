import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapImage from "./../images/startinMap2.png";
<<<<<<< HEAD
import { useSpeechSynthesis } from "react-speech-kit";
import Lottie from 'react-lottie';
import animationData from '../../lotties/lotties.json';
=======
// import MapImage from "./../images/startinMap.jpeg";
import { useSpeechSynthesis } from "react-speech-kit";
>>>>>>> 302fd2ec007e99be93f4ea7331a1ccd838394746

function MyComponent() {
  const { speak, voices } = useSpeechSynthesis();
  const nav = useNavigate();
  const [radius, setRadius] = useState(100); // initial circle radius
  const imgRef = useRef(); // reference to the image
<<<<<<< HEAD
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const lottieContainerStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    pointerEvents: "none", // This line makes sure the Lottie does not interfere with clicks on elements below it
    background: "none", // Make sure there is no background
  };
=======
>>>>>>> 302fd2ec007e99be93f4ea7331a1ccd838394746

  useEffect(() => {
    // Function to update circle radius based on image width
    const updateRadius = () => {
      if (imgRef.current) {
        const newRadius = imgRef.current.offsetWidth * 0.04; // Adjust circle radius to be 4% of image width
        setRadius(newRadius);
      }
    };
<<<<<<< HEAD
    
=======
>>>>>>> 302fd2ec007e99be93f4ea7331a1ccd838394746

    // Call the function once to set initial size
    updateRadius();

    // Set up event listener to update circle size on window resize
    window.addEventListener("resize", updateRadius);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("resize", updateRadius);
    };
  }, []);
  const containerStyle = {
    display: "flex",
    width: "100%",
    height: "100vh",
  };

  const imageContainerStyle = {
    // width: "75%",
    // height: "100%",
    // position: "relative",
    // width: "100vw",
    height: "100vh",
  };

  const sidebarStyle = {
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const choiceStyle = {
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc", // Change this as needed
    borderRadius: "5px",
    cursor: "pointer",
  };

  function handleNavigate(area) {
<<<<<<< HEAD
    if (area === "A") {
      localStorage.setItem("area", area);
      nav("/game");
      speak({
        text: `You have choosen the area ${area}, Good luck`,
        voice: voices[2],
      });
    } else if (area === "B") {
      const AREA = localStorage.getItem("area");
      if (AREA === "B") {
        nav("/game");
        speak({
          text: `You have choosen the area ${area}, Good luck`,
          voice: voices[2],
        });
      } else {
        speak({
          text: `You have choosen the area ${area}, Good luck`,
          voice: voices[2],
        });
        alert("You have to finish area A first");
      }
    } else if (area === "C") {
      const AREA = localStorage.getItem("area");
      if (AREA === "C") {
        nav("/game");
        speak({
          text: `You have to finish area ${area} first, Good luck`,
          voice: voices[2],
        });
      } else {
        speak({
          text: `You have to finish area ${area} first, Good luck`,
          voice: voices[2],
        });
        alert(`You have to finish area ${area} first, Good luck`);
      }
    } else if (area === "D") {
      const AREA = localStorage.getItem("area");
      if (AREA === "D") {
        nav("/game");
        speak({
          text: `You have choosen the area ${area}, Good luck`,
          voice: voices[2],
        });
      } else {
        speak({
          text: `You have to finish area ${area} first, Good luck`,
          voice: voices[2],
        });
        alert("`You have to finish area ${area} first, Good luck`");
      }
    }
=======
    speak({
      text: `You have choosen the area ${area}, Good luck`,
      voice: voices[2],
    });
    localStorage.setItem("area", area);
    nav("/game");
>>>>>>> 302fd2ec007e99be93f4ea7331a1ccd838394746
  }

  return (
    <div style={containerStyle}>
<<<<<<< HEAD
      <div style={lottieContainerStyle}> {/* Add this wrapper around Lottie with the new styles */}
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
      <div style={imageContainerStyle}>
        <img
          src={MapImage}
          alt="Map"
          usemap="#image-map"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <svg
          onClick={() => handleNavigate("C")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <circle
            cx="51.5%"
            cy="40.5%"
            // r="127"
            r={radius}
            fill="green"
            viewBox="0 0 100 100"
          />
        </svg>
        <svg
          onClick={() => handleNavigate("B")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="">
            <circle
              cx="29.5%"
              cy="35.5%"
              // r="127"
              r={radius}
              fill="blue"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
        <svg
          onClick={() => handleNavigate("D")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="#1">
            <circle
              cx="73.5%"
              cy="17.5%"
              // r="127"
              r={radius}
              fill="yellow"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
        <svg
          onClick={() => handleNavigate("A")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="">
            <circle
              cx="45.5%"
              cy="70.5%"
              // r="127"
              r={radius}
              fill="red"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
      </div>
=======
      {/* <div style={imageContainerStyle}>
        <img
          src={MapImage}
          alt="Map"
          usemap="#image-map"
          // style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <svg width="500" height="500">
          <a href="">
            <circle cx="50%" cy="50%" r="50" fill="red" />
          </a>
        </svg>
      </div> */}
      <div style={imageContainerStyle}>
        <img
          src={MapImage}
          alt="Map"
          usemap="#image-map"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="">
            <circle
              cx="51.5%"
              cy="40.5%"
              // r="127"
              r={radius}
              fill="red"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="">
            <circle
              cx="29.5%"
              cy="35.5%"
              // r="127"
              r={radius}
              fill="red"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="#1">
            <circle
              cx="73.5%"
              cy="17.5%"
              // r="127"
              r={radius}
              fill="red"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
        <svg
          style={{ position: "absolute", width: "100%", height: "100%" }}
          width="500"
          height="500"
        >
          <a href="">
            <circle
              cx="45.5%"
              cy="70.5%"
              // r="127"
              r={radius}
              fill="red"
              viewBox="0 0 100 100"
            />
          </a>
        </svg>
      </div>
>>>>>>> 302fd2ec007e99be93f4ea7331a1ccd838394746

      <div style={sidebarStyle}>
        <div style={choiceStyle} onClick={() => handleNavigate("A")}>
          Area A
        </div>
        <div style={choiceStyle} onClick={() => handleNavigate("B")}>
          Area B
        </div>
        <div style={choiceStyle} onClick={() => handleNavigate("C")}>
          Area C
        </div>
        <div style={choiceStyle} onClick={() => handleNavigate("D")}>
          Area D
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
