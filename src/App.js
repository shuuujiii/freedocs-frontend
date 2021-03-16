
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from './provider/totalProvider'
import PrivateRoute from './components/privateRoute'
import SignUp from './components/signUp'
import SignIn from './components/signIn'
import Home from './components/home'
import ErrorAlert from './components/errorAlert'
import Userpage from './components/userPage'
const App = () => {
  return (
    <Router>
      <div className="App">
        <Provider>
          <ErrorAlert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/userpage" component={Userpage} />
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
