import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  reactReduxFirebase,
  firebaseReducer,
  getFirebase
} from 'react-redux-firebase';
import * as firebase from 'firebase';
import { firebaseConfig } from 'constants';

import { routerReducer, routerMiddleware } from 'react-router-redux';

const initStore = history => {

  firebase.initializeApp(firebaseConfig);

  const rootReducer = combineReducers({
    routerReducer: routerReducer,
    firebase: firebaseReducer
  });
  const initialState = {};

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware.withExtraArgument(getFirebase)
      ),
      reactReduxFirebase(firebase, {
        userProfile: 'users',
        enableLogging: false
      }),
    ),
  );
};

export default initStore;
