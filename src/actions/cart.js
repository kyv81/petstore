import { ADD_TO_CART, REMOVE_FROM_CART, BUY } from 'constants';

const addToCartSuccess = id => {
  return {
    type: ADD_TO_CART,
    id: id,
  };
};

const shouldAddToCart = (state, id) => {
  let { cart } = state;
  return cart.toJS().items.includes(id);
};

export const tryAddToCart = id => {
  return (dispatch, getState) => {
    return new Promise((res, rej) => {
      if (!shouldAddToCart(getState(), id)) {
        dispatch(addToCartSuccess(id));
        res();
      }
      rej();
    });
  };
};

export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    id: id,
  };
};

export const buy = () => {
  return {
    type: BUY,
  };
};
