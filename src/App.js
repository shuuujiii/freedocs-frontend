
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SignUp from './components/signUp'
import Home from './components/home'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
