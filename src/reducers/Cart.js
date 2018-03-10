import { ADD_TO_CART, REMOVE_FROM_CART, BUY } from 'constants';

import { List, fromJS } from 'immutable';

const initialState = fromJS({
  items: List(),
});

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return fromJS({
        ...state,
        items: state.get('items').includes(action.id)
          ? state.get('items')
          : state.get('items').push(action.id),
      });
    case REMOVE_FROM_CART:
      return fromJS({
        ...state,
        items: state.get('items').filter(item => {
          return item !== action.id;
        }),
      });
    case BUY:
      return fromJS({
        ...state,
        items: List(),
      });
    default:
      return state;
  }
};

export default Cart;
