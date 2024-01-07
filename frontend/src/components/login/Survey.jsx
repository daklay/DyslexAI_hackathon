import React, { useState } from "react";
import backgroundImage from "../images/back.jpg";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import "../style.css";
import girl1 from "../images/sources/bgRightLoginV2-01.png";

const LoginForm = () => {
  const nav = useNavigate();
  const { speak, voices } = useSpeechSynthesis();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      localStorage.setItem("name", name);
      localStorage.setItem("age", age);
      speak({ text: `Good job ${name}`, voice: voices[2] });

      axios
        .get(`/user/name/${name}`)
        .then((response) => {
          // handle your response here
          console.log(response.data);
          nav("/map");
        })
        .catch((error) => {
          // handle your error here
          alert("Network error! Pleqse try again later")
          console.error(error);
        });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "40px",
            width: "50%",
            borderRadius: "5px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
          }}
        >
          <div id="p1" className="flex justify-between">
            <div className="w-2/4">
              <div className="mb-3">
                <label for="name" className="form-label child-friendly-label">
                  your name
                </label>
                <input
                  type="text"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="write your name"
                />
              </div>
              <div className="mb-3">
                <label for="age" className="form-label child-friendly-label">
                  your age
                </label>
                <input
                  type="number"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-600"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="write your age"
                  min={1}
                />
              </div>
              <button
                style={{ backgroundColor: "#13aa52" }}
                className="button-37"
                type="submit"
              >
                Submit
              </button>
            </div>

            <div id="p2">
              <img
                src={girl1}
                width="236"
                className="image-frame"
                alt="Kids playing"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
