import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  reactReduxFirebase,
  firebaseReducer,
  getFirebase,
} from 'react-redux-firebase';
import * as firebase from 'firebase';
import { firebaseConfig } from 'constants';

import { routerReducer, routerMiddleware } from 'react-router-redux';

import User from 'reducers/User';

const initStore = history => {
  firebase.initializeApp(firebaseConfig);

  const rootReducer = combineReducers({
    routerReducer: routerReducer,
    firebase: firebaseReducer,
    user: User,
  });
  const initialState = {
    user: {
      isRequesting: false,
      isLoggedIn: false,
      data: {},
    },
  };

  // логирование при изменении store redux
  // чисто для разработки
  const logger = store => next => action => {
    console.log(action);
    return next(action);
  };

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware.withExtraArgument(getFirebase),
        logger,
      ),
      reactReduxFirebase(firebase, {
        userProfile: 'users',
        enableLogging: false,
      }),
    ),
  );
};

export default initStore;
