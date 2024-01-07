import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.126.78.45:3000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default instance;
