
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './provider/totalProvider'
import SignUp from './components/main/signUp'
import SignIn from './components/main/signIn'
import ErrorAlert from './components/main/errorAlert'
import Terms from './components/common/terms'
import PrivacyPolicy from './components/common/privacypolicy'
import About from './components/common/about'
import Contact from './components/common/contact'
import TemplatePage from './components/main/templatePage'
import { useAuth } from './provider/authProvider'
import { useError } from './provider/errorProvider'
import axiosbase from './utils/axiosbase'
const App = () => {
  const auth = useAuth();
  const error = useError();
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const authenticate = async () => {
      await axiosbase.post('/users/authenticate')
        .then((res) => {
          error.init()
          if (res.data === 'authenticated') {
            auth.authenticated()
          } else {
            auth.notAuthenticated()
          }
          setLoading(true)
        }).catch(e => {
          // error.setError(e)
          // auth.notAuthenticated()
          setLoading(true)
        })
    }
    authenticate();
    // eslint-disable-next-line
  }, [])
  return (
    <Router>
      <div className="App">
        {/* <Provider> */}
        <ErrorAlert />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path='/' component={TemplatePage} />
        </Switch>
        {/* </Provider> */}
      </div>
    </Router >
  );
}


export default App;
