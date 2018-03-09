import { ADD_TO_CART, REMOVE_FROM_CART, BUY } from 'constants';

import { List } from 'immutable';

const initialState = {
  items: List(),
};

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: state.items.push(action.id),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => {
          return item !== action.id;
        }),
      };
    case BUY:
      return {
        ...state,
        items: List(),
      };
    default:
      return state;
  }
};

export default Cart;
