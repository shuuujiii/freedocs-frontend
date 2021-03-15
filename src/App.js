
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from './provider/totalProvider'
import SignUp from './components/signUp'
import Home from './components/home'
import ErrorAlert from './components/errorAlert'
const App = () => {
  return (
    <Router>
      <div className="App">
        <Provider>
          <ErrorAlert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
