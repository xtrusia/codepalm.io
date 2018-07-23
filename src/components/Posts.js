import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { withFirestore } from '../utils';

import Post from './Post';
// <NewPost onNewSubmit={onNewSubmit} />
    
const Posts = ({ posts }) => (
  <div>
    {
      posts === undefined
      ? <span>Loading</span>
      : !posts.length
        ? <span>No posts found</span>
        :
          posts.map((post, i) => (
            <Post
              key={`${post.id}-${i}`}
              post={post}
            />
          ))
    }
  </div>
)

Posts.propTypes = {
  posts: PropTypes.array,
  store: PropTypes.shape({
    firestore: PropTypes.object
  })
}

const listenerSettings = {
  collection: 'posts',
  orderBy: ['time', 'desc'],
  limit: 10
}

// Create HOC that loads data and adds it as todos prop
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => err => props.firestore.setListener(listenerSettings)
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      this.props.loadData()
    },
    componentWillUnmount() {
      this.props.firestore.unsetListener(listenerSettings)
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({ // state.firestore
    posts: firestore.ordered.posts, // document data in array
    // todos: firestore.data.todos, // document data by id
  }))
)

export default enhance(Posts)
