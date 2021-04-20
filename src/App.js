
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Provider } from './provider/totalProvider'
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
import CookieConsent from 'react-cookie-consent'
// utils
import axiosbase from './utils/axiosbase'
import { getCookieByName } from './utils/cookie'

import Loading from './components/main/loading'
const App = () => {
  const auth = useAuth();
  const error = useError();
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    const authenticate = async () => {
      await axiosbase.post('/users/silent')
        .then((res) => {
          error.init()
          if (res.data.payload.user) {
            auth.authenticated(res.data.payload.user)
          } else {
            auth.notAuthenticated()
          }
          setLoading(false)
        }).catch(() => {
          // error.setError(e)
          // auth.notAuthenticated()
          setLoading(false)
        })
    }
    authenticate();
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    const isAcceptCookie = getCookieByName('GDPRcookie')
    if (isAcceptCookie === 'true') {
      window['ga-disable-G-F4LNQR1YZZ'] = false;
    } else {
      window['ga-disable-G-F4LNQR1YZZ'] = true;
    }
  }, [])

  const handleClickAcceptCookie = () => {
    // window.location.reload()
  }

  const handleClickDeclineCookie = () => {
    // window['ga-disable-G-F4LNQR1YZZ'] = true;
    // window.location.reload()
  }
  return (
    loading ? <Loading /> :
      <Router>
        <div className="App">
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
          <CookieConsent
            location="bottom"
            buttonText="OK"
            cookieName="GDPRcookie"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
            onAccept={() => {
              handleClickAcceptCookie()
            }}
            enableDeclineButton
            declineButtonText="Decline"
            onDecline={() => {
              handleClickDeclineCookie()
            }}
          >
            This website uses cookies to enhance the user experience.
            {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
          </CookieConsent>
        </div>
      </Router >
  );
}


export default App;
