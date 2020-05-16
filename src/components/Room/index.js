import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { useHistory } from 'react-router-dom';

import './style.scss';

const ENDPOINT = "http://127.0.0.1:4001";

function Room() {
  const [ cards, setCards ] = useState([]);
  const history = useHistory();

  
  useEffect(() => {
    const room = history.location.pathname.replace('/room/', '');
    const socket = socketIOClient(ENDPOINT);

    socket.emit('goToRoom', room)
  }, [history])
  
  const addCard = () => {
    setCards(cards.concat('a'))
  }

  return (
    <div className="Room">
      <button onClick={addCard}>+</button>
      {cards.map(card => <p>{card}</p>)}
    </div>
  );
}
 

export default Room;
