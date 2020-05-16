import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../../service/sockets';

import './style.scss';

function Room() {
  const [ cards, setCards ] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    const room = history.location.pathname.replace('/room/', '');

    socket.emit('goToRoom', room)
  }, [history])

  useEffect(() => {
    socket.on('roomCards', cardsData => {
      console.log(cardsData);
      cardsData.forEach(cardData => {
        setCards(cards.concat(cardData.text))
      })
    })
  }, [cards])
  
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