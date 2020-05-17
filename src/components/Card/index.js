import React from 'react';

import './style.scss';

function Card(props){
  return (
    <div className="Card">
      <p>{props.text}</p>
    </div>
  )
}

export default Card;