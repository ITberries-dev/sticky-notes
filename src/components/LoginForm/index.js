import React, { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import './style.scss';

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [ room, setRoom ] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      history.push(`/room/${room}`)
    }
  }, [room]);

  const onSubmit = data => {
    console.log(data);
    setRoom(data.room)
  }

  return (
    <form className='LoginForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='LoginForm_field'>
        <label>Nick</label>
        <input name='nick' ref={register({ required: true })} />
        {errors.nick && <span className='LoginForm_error'>This field is required</span>}
      </div>
      
      <div className='LoginForm_field'>
        <label>Nazwa pokoju</label>
        <input name='room' ref={register({ required: true })} />
        {errors.room && <span className='LoginForm_error'>This field is required</span>}
      </div>

      <input type='submit' value='Utwórz pokój'/>
    </form>
  );
}

export default LoginForm;
