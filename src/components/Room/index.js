import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../../service/sockets';

import './style.scss';

import Card from '../Card';

function Room() {
  const [ cards, setCards ] = useState([]);
  const history = useHistory();
  const room = history.location.pathname.replace('/room/', '');

  
  useEffect(() => {
    socket.emit('goToRoom', room)

    socket.on('roomCards', cardsData => {
      console.log(cardsData);
      let temp = [];
      cardsData.forEach(cardData => {
        temp.push(cardData.text)
      })
      setCards(temp);
    })
  }, [])
  
  const addCard = () => {
    socket.emit("addCard", room, 'tekścik');
    setCards([...cards, 'tekścik']);
  }

  return (
    <div className="Room">
      <button onClick={addCard}>Dodaj</button>
      {cards.map((card, i) => <Card key={i} text={card}/>)}
    </div>
  );
}

export default Room;