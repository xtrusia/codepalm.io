import React from 'react';
import PropTypes from 'prop-types'
import { compose, flattenProp, withHandlers, pure } from 'recompose'
import { withFirestore } from '../utils';

const Post = ({
  text,
  title,
  owner,
  time
}) => {
  console.log(time);
  return (
    <ul className="post">
      <li className="title">{title}</li>
      <li className="owner">{owner}</li>
    </ul>
  )
};

Post.propTypes = {
  title: PropTypes.string, // from enhancer (flattenProp)
  text: PropTypes.string, // from enhancer (flattenProp)
  owner: PropTypes.string, // from enhancer (flattenProp)
  firestore: PropTypes.shape({
    update: PropTypes.func.isRequired
  })
}

const enhance = compose(
  // Add props.firestore
  withFirestore,
  // Flatten todo prop (creates id, text, owner, done and disabled props)
  flattenProp('post'),
  // Handlers as props
  // withHandlers({
  //   onDoneClick: props => () => {
  //     return props.firestore.update(`todos/${props.id}`, { done: !props.done })
  //   }
  // }),
  // Prevent unnessesary re-renders by doing shallow comparison of props
  pure
)

export default enhance(Post)
