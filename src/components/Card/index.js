import React from 'react';
import Draggable from 'react-draggable';
import { socket } from '../../service/sockets';

import './style.scss';

class Card extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props.position)
    
    this.state = {
      position: this.props.position
    }

    this.handleDrag = this.handleDrag.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  handleDrag(e, ui){
    const {x, y} = this.state.position;
    this.setState({
     position: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  }

  handleStop(){
    socket.emit("moveCard", this.props.room, this.props.id, this.state.position)
  }

  render(){
    return (
      <Draggable
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        position={this.state.position}
        >
        <div className="Card">
          <p>{this.props.text}</p>
        </div>
      </Draggable>
    )
  }
}

export default Card;