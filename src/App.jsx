import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';
import "./App.css";
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/Success">
          <Success />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
