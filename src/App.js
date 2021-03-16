
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './provider/totalProvider'
import PrivateRoute from './utils/privateRoute'
import SignUp from './components/main/signUp'
import SignIn from './components/main/signIn'
import Home from './components/main/home'
import ErrorAlert from './components/main/errorAlert'
import Userpage from './components/main/userPage'
import NotFound from './components/main/notFound'
import Account from './components/common/account'
import Profile from './components/common/profile'
import Terms from './components/common/terms'
import PrivacyPolicy from './components/common/privacypolicy'
import About from './components/common/about'
import Contact from './components/common/contact'

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
