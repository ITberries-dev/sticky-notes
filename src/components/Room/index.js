import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../../service/sockets';

import './style.scss';

import Card from '../Card';

function Room() {
  const [ cards, setCards ] = useState([]);
  const history = useHistory();
  const room = history.location.pathname.replace('/room/', '');

  socket.on('cardID', cardData => {
    console.log('dodano', cardData);
    setCards([...cards, { id: cardData._id, text: cardData.text, position: cardData.position }]);
  })

  socket.on('cardMoved', (cardID, newPosition) => {
    let temp = cards;
      temp.forEach(card => {
        if(card.id == cardID){
          card.position = newPosition;
        }
        return
      })
      setCards(temp);
  })

  useEffect(() => {
    socket.emit('goToRoom', room)

    socket.on('roomCards', cardsData => {
      console.log(cardsData);
      let temp = [];
      cardsData.forEach(cardData => {
        temp.push({ id: cardData._id, text: cardData.text, position: cardData.position })
      })
      setCards(temp);
    })
  }, [])
  
  const addCard = () => {
    socket.emit("addCard", room, 'tekścik');
  }

  return (
    <div className="Room">
      <button onClick={addCard}>Dodaj</button>
      {cards.map((card, i) => <Card key={i} id={card.id} text={card.text} position={card.position} room={room}/>)}
    </div>
  );
}

export default Room;