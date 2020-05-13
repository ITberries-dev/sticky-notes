import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.scss';

import LoginForm from './components/LoginForm';

function App() {
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
