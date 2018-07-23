import { createStore, compose } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'
import { fbConfig, rrfConfig } from './config'
import rootReducer from './reducers/index'

export default function configureStore(initialState, history) {
  const enhancers = []

  firebase.initializeApp(fbConfig)

  // Provide timestamp settings to silence warning about deprecation
  firebase.firestore().settings({ timestampsInSnapshots: true })

  // Dev tools store enhancer
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  const createStoreWithMiddleware = compose(
    // Add redux firestore store enhancer
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    ...enhancers
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  return store
}
