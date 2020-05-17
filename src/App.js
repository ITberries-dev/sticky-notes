import React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.scss';

import LoginForm from './components/LoginForm';
import Room from './components/Room';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/room/:roomID">
          <Room />
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
