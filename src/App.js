
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './provider/totalProvider'
import SignUp from './components/main/signUp'
import SignIn from './components/main/signIn'
import ErrorAlert from './components/main/errorAlert'
import NotFound from './components/main/notFound'
import Terms from './components/common/terms'
import PrivacyPolicy from './components/common/privacypolicy'
import About from './components/common/about'
import Contact from './components/common/contact'
import TemplatePage from './components/main/templatePage'
const App = () => {
  return (
    <Router>
      <div className="App">
        <Provider>
          <ErrorAlert />
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path='/' component={TemplatePage} />
            <Route component={NotFound} />
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
