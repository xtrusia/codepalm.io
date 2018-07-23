import React from 'react';
import PropTypes from 'prop-types'
import { withHandlers, pure, compose } from 'recompose'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { withFirestore } from '../utils'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PostForm from './PostForm'

import history from '../history'

const NewPost = ({ doPost }) => (
  <div>
    <MuiThemeProvider>
          <PostForm onSubmit={doPost} />
    </MuiThemeProvider>
  </div>
)

NewPost.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  pure,
  // add redux store (from react context) as a prop
  withFirestore,
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    doPost: props => newPost => {
      props.firestore.add('posts', {
        ...newPost,
        owner: props.auth.email,
        time: props.firestore.FieldValue.serverTimestamp()
      })
      history.push('/');
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({ // state.firestore
    posts: firestore.ordered.posts, // document data in array
    // todos: firestore.data.todos, // document data by id
  }))
)(NewPost)

// const enhance = compose(
//   withStateHandlers(({
//     initialInputValue = null
//   }) => ({
//     inputValue: initialInputValue
//   }), {
//     onInputChange: (state) => (e) => ({
//       inputValue: get(e, 'target.value', null)
//     })
//   }),
//   withHandlers({
//     onNewClick: props => () => {
//       // Submit new todo
//       props.onNewSubmit({
//         text: props.inputValue,
//         done: false
//       })
//       // Reset input
//       props.onInputChange()
//     }
//   })
// )

// export default enhance(NewPost)
