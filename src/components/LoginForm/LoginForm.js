import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

// validation functions
const required = value => (value == null ? 'Required' : undefined)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
: undefined

export const LoginForm = ({pristine, submitting, handleSubmit }) => (
  <form id="form_login" 
    onSubmit={handleSubmit}>
    <ul className="user_panel">
      <li id="box_input">
        <Field
          name="email"
          component={TextField}
          floatingLabelText="Email"
          validate={required, email}
        />
        <Field
          name="password"
          component={TextField}
          floatingLabelText="Password"
          type="password"
          validate={required}
        />
      </li>
      <li id="btn_signup">
        <button className="btn-gradient red small">Sign Up</button>
      </li>
      <li id="btn_submit">
        <button className="btn-gradient blue small" type="submit" >Login</button>
      </li>
    </ul>
  </form>
)

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: 'login'
})(LoginForm)