import { combineReducers } from 'redux'
import { firestoreReducer as firestore } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  form,
  firebase: firebaseReducer,
  firestore,
});

export default rootReducer
