
import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './components/main/signUp'
import SignIn from './components/main/signIn'
import ErrorAlert from './components/main/errorAlert'
import Terms from './components/common/terms'
import PrivacyPolicy from './components/common/privacypolicy'
import Contact from './components/common/contact'
import CookieConsent from 'react-cookie-consent'
// utils
import { useTracking } from './utils/useTracking'

// components
import PrivateRoute from './utils/privateRoute'
import Home from './components/page/Home'
import Profile from './components/main/profile'
import NotFound from './components/main/notFound'
import Header from './components/main/appBar'
import Footer from './components/main/footer'
import Messages from './components/main/messages'
import EmailAuth from './components/main/emailAuth'
import Setting from './components/main/setting'
import ArticlesPage from './components/main/ArticlesPage'
const App = () => {
  const [search, setSearch] = React.useState('')

  useTracking(process.env.REACT_APP_GA_MEASUREMENT_ID)

  const handleClickAcceptCookie = () => {
    window.location.reload()
  }

  const handleClickDeclineCookie = () => {
    window.location.reload()
  }
  return (
    <div className="App">
      <Header search={search}
        setSearch={setSearch}
      />
      <ErrorAlert />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/auth/email/:token" component={EmailAuth} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/contact" component={Contact} />
        {/* <PrivateRoute path='/articles' render={() => <ArticlesPage search={search} />} /> */}
        <PrivateRoute path='/articles' component={ArticlesPage} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/setting" component={Setting} />
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
