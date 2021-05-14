
import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './components/page/SignUp'
import SignIn from './components/page/SignIn'
import ErrorAlert from './components/common/ErrorAlert'
import Terms from './components/page/Terms'
import PrivacyPolicy from './components/page/PrivacyPolicy'
import CookieConsent from 'react-cookie-consent'
// utils
import { useTracking } from './utils/useTracking'

// components
import PrivateRoute from './utils/privateRoute'
import Home from './components/page/Home'
import Profile from './components/page/Profile'
import NotFound from './components/page/NotFound'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Messages from './components/common/Messages'
import EmailAuth from './components/page/EmailAuth'
import Setting from './components/page/Setting'
import ArticlesPage from './components/page/ArticlesPage'
// import MyArticle from './components/page/MyArticle'
const App = () => {
  if (window.location.hostname !== 'localhost') {
    useTracking(process.env.REACT_APP_GA_MEASUREMENT_ID)
  }

  const handleClickAcceptCookie = () => {
    window.location.reload()
  }

  const handleClickDeclineCookie = () => {
    window.location.reload()
  }
  return (
    <div className="App">
      <Header />
      <ErrorAlert />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/auth/email/:token" component={EmailAuth} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        {/* <Route path="/contact" component={Contact} /> */}
        {/* <PrivateRoute path='/articles' render={() => <ArticlesPage search={search} />} /> */}
        <Route path='/lists/tags/:tag' component={ArticlesPage} />
        <Route path='/lists/user/:user' component={ArticlesPage} />
        <Route path='/lists' component={ArticlesPage} />
        <Route path="/profile/:username" component={Profile} />
        <PrivateRoute path="/setting" component={Setting} />
        {/* <PrivateRoute path="/mylist" component={MyArticle} /> */}
        <Route component={NotFound} />
      </Switch>
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
        This website uses cookies to enhance the user experience.See <Link style={{ color: 'white' }} to="/privacypolicy">PrivacyPolicy</Link>
      </CookieConsent>
      <Footer />

    </div>
  );
}

export default App
