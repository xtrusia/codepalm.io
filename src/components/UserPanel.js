import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers, pure, compose } from 'recompose'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginForm from './LoginForm'

// import GoogleButton from 'react-google-button' // optional

export const UserPanel = ({ auth, emailLogin, Logout }) => (
  <div id="user_panel">
    {
      !isLoaded(auth)
      ? <span>Loading...</span>
      : isEmpty(auth)
        ?
        <MuiThemeProvider>
          <LoginForm onSubmit={emailLogin} />
        </MuiThemeProvider>
        :
        <ul className="user_panel">
          <li id="btn_post"><Link to="/post" className="btn-gradient purple small">POST</Link></li>
          <li id="detail">{auth.email}</li>
          <li id="btn_submit"><button onClick={Logout} className="btn-gradient blue small">Logout</button></li>
        </ul>
    }
  </div>
)

UserPanel.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  pure,
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    emailLogin: ({firebase}) => creds => {
      firebase.login(creds).catch( (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        console.log(error.message);
      });
    },
    Logout: ({firebase}) => () => firebase.logout()
  })
)(UserPanel)