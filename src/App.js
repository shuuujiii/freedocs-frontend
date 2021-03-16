
import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from './provider/totalProvider'
import PrivateRoute from './components/privateRoute'
import SignUp from './components/signUp'
import SignIn from './components/signIn'
import Home from './components/home'
import ErrorAlert from './components/errorAlert'
import Userpage from './components/userPage'
import Account from './components/common/account'
import Profile from './components/common/profile'
import Terms from './components/common/terms'
import PrivacyPolicy from './components/common/privacypolicy'
import About from './components/common/about'
import Contact from './components/common/contact'
import NotFound from './components/notFound'
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
            <Route path="/terms" component={Terms} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <PrivateRoute path="/userpage" component={Userpage} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
