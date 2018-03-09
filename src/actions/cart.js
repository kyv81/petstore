import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  BUY,
} from 'constants';

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id: id,
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
