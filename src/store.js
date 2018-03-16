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
import { fromJS } from 'immutable';
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
      isUploadAvatar: false,
      isEditing: false,
      isRequesting: false,
      users: [],
    },
    filter: {
      text: '',
      minPrice: 0,
      maxPrice: 600000,
      minDate: new Date(0),
      maxDate: new Date(),
      sortType: 'date',
      sortAsc: false,
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

  // логгирование при изменении redux store
  // const logger = store => next => action => {
  //   console.group(action.type);
  //   console.info('dispatching', action);
  //   const result = next(action);
  //   console.log('next state', store.getState());
  //   console.groupEnd(action.type);
  //   return result;
  // };

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware.withExtraArgument(getFirebase),
        //logger,
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
