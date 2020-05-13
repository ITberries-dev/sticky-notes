import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import logo from './logo.svg';
import './App.css';

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
  }, []);

  return (
    <div></div>
  );
}

export default App;
