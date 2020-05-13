import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.scss';

import LoginForm from './components/LoginForm';

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/room/:roomID">
          <h1>aaa</h1>
        </Route>

        <Route path="/">
          <LoginForm />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
