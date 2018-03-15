import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import {
  reactReduxFirebase,
  firebaseReducer,
  getFirebase,
} from 'react-redux-firebase';
import * as firebase from 'firebase';
import { firebaseConfig } from 'constants';

import { routerMiddleware } from 'react-router-redux';

import { toJSON, fromJS } from 'immutable';

import { Animals, Auth, Cart, Router, Users, Filter } from 'reducers';
const initStore = history => {
  firebase.initializeApp(firebaseConfig);

  const cart = localStorage.getItem('cartState')
    ? fromJS(JSON.parse(localStorage.getItem('cartState')))
    : fromJS({ items: [] });

  const initialState = fromJS({
    animals: {
      isRequesting: false,
      isEditing: false,
      isDeleting: false,
      isCreating: false,
      animals: [],
    },
    auth: {
      isRequesting: false,
      isLoggedIn: false,
      data: {},
    },
    cart: cart,
    users: {
      isRequesting: false,
      users: [],
    },
    filter: {
      textFilterValue: '',
      minPriceFilterValue: 0,
      maxPriceFilterValue: 600000,
      minDateFilterValue: new Date(0),
      maxDateFilterValue: new Date(),
    },
    routerReducer: {
      locationBeforeTransitions: null,
    },
  });

  const rootReducer = combineReducers({
    routerReducer: Router,
    firebase: firebaseReducer,
    auth: Auth,
    animals: Animals,
    cart: Cart,
    users: Users,
    filter: Filter,
  });

  // логирование при изменении store redux
  // чисто для разработки
  const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
  };

  const store = createStore(
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

  store.subscribe(() => {
    let cart = store.getState().get('cart');
    localStorage.setItem('cartState', JSON.stringify(cart.toJSON()));
  });

  return store;
};

export default initStore;
