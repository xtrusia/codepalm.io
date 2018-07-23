import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

// validation functions
const required = value => (value == null ? 'Required' : undefined)

export const PostForm = ({pristine, submitting, handleSubmit }) => (
  <form id="form_post" 
    onSubmit={handleSubmit}>
    <ul className="post_panel">
      <li id="title">
        <Field
          name="title"
          component={TextField}
          floatingLabelText="Title"
          fullWidth
          validate={required}
        />
      </li>
      <li id="btn_submit">
        <button className="btn-gradient blue small" type="submit" >Post</button>
      </li>
      <li id="text">
        <Field
          name="text"
          component={TextField}
          floatingLabelText="Text"
          multiLine={true}
          validate={required}
          fullWidth
          rows={20}
          rowsMax={20}
        />
      </li>
    </ul>
  </form>
)

PostForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: 'post'
})(PostForm)