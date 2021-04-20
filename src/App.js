
import React from 'react'
import { Route, Switch, } from 'react-router-dom';
import SignUp from './components/main/signUp'
import SignIn from './components/main/signIn'
import ErrorAlert from './components/main/errorAlert'
import Terms from './components/common/terms'
import PrivacyPolicy from './components/common/privacypolicy'
import About from './components/common/about'
import Contact from './components/common/contact'
import { useAuth } from './provider/authProvider'
import { useError } from './provider/errorProvider'
import CookieConsent from 'react-cookie-consent'
// utils
import axiosbase from './utils/axiosbase'
import { useTracking } from './utils/useTracking'

import Grid from '@material-ui/core/Grid';

import PrivateRoute from './utils/privateRoute'
import Home from './components/main/home'
import Profile from './components/main/profile'
import Container from '@material-ui/core/Container';
import NotFound from './components/main/notFound'
import Header from './components/main/appBar'
import Footer from './components/main/footer'
import Messages from './components/main/messages'
import Loading from './components/main/loading'
const App = () => {
  const auth = useAuth();
  const error = useError();
  const [loading, setLoading] = React.useState(false)
  const [search, setSearch] = React.useState('')

  useTracking(process.env.REACT_APP_GA_MEASUREMENT_ID)

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

  const handleClickAcceptCookie = () => {
    window.location.reload()
  }

  const handleClickDeclineCookie = () => {
    window.location.reload()
  }
  return (
    loading ? <Loading /> :
      <div className="App">
        <Header search={search}
          setSearch={setSearch}
        />
        <ErrorAlert />
        <Container maxWidth="lg">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={8}>
              <Switch>
                <Route exact path='/' render={() => <Home search={search} />} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <Route path="/terms" component={Terms} />
                <Route path="/privacypolicy" component={PrivacyPolicy} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </Grid>
          </Grid>
        </Container>
        <Messages />
        <CookieConsent
          location="bottom"
          buttonText="OK"
          cookieName={process.env.REACT_APP_GDPR_COOKIE_NAME}
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
        <Footer />

      </div>
  );
}

export default App
