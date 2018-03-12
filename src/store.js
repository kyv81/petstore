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

import { List, fromJS } from 'immutable';

import { Animals, Auth, Cart, Users } from 'reducers';

const initStore = history => {
  firebase.initializeApp(firebaseConfig);

  const rootReducer = combineReducers({
    routerReducer: routerReducer,
    firebase: firebaseReducer,
    auth: Auth,
    animals: Animals,
    cart: Cart,
    users: Users,
  });

  const cart = localStorage.getItem('cartState')
    ? fromJS(JSON.parse(localStorage.getItem('cartState')))
    : fromJS({ items: List() });

  console.log(cart);

  const initialState = {
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
  };

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
    // найдем живтоного по id
    function findById(array, id) {
      let index = array.findIndex(user => user.id === id);
      return index !== -1;
    }

    let animals = store.getState().animals.animals;
    let cart = store.getState().cart;
    // если животные пришли, то обновляем cart
    if (animals.length) {
      let listAnimalsId = cart.get('items');
      listAnimalsId = listAnimalsId.filter(id => findById(animals, id));
      cart = cart.set('items', listAnimalsId);
    }

    localStorage.setItem('cartState', JSON.stringify(cart.toJS()));
  });

  return store;
};

export default initStore;
