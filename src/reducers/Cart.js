import { ADD_TO_CART, REMOVE_FROM_CART, BUY } from 'constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  items: [],
});

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state.update(
        'items',
        items =>
          items.includes(fromJS(action.id))
            ? items
            : items.push(fromJS(action.id)),
      );
    case REMOVE_FROM_CART:
      return state.update('items', items =>
        items.filter(item => {
          return item !== fromJS(action.id);
        }),
      );
    case BUY:
      return state.set('items', fromJS([]));
    default:
      return state;
  }
};

export default Cart;
