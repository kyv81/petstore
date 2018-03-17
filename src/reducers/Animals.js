import {
  REQUEST_GET_ANIMALS,
  GET_ANIMALS_SUCCESS,
  GET_ANIMALS_FAILED,
  REQUEST_CREATE_ANIMAL,
  CREATE_ANIMAL_SUCCESS,
  CREATE_ANIMAL_FAILED,
  REQUEST_EDIT_ANIMAL,
  EDIT_ANIMAL_SUCCESS,
  EDIT_ANIMAL_FAILED,
  REQUEST_DELETE_ANIMAL,
  DELETE_ANIMAL_SUCCESS,
  DELETE_ANIMAL_FAILED,
} from 'constants';

import { fromJS } from 'immutable';

const Animals = (state, action) => {
  switch (action.type) {
    case REQUEST_GET_ANIMALS:
      return state.set('isRequesting', true);
    case GET_ANIMALS_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('animals', fromJS(action.animals));
    case GET_ANIMALS_FAILED:
      return state.set('isRequesting', false);
    case REQUEST_CREATE_ANIMAL:
      return state.set('isCreating', true);
    case CREATE_ANIMAL_SUCCESS:
      return state
        .set('isCreating', false)
        .update('animals', animals => animals.push(fromJS(action.animal)));
    case CREATE_ANIMAL_FAILED:
      return state.set('isCreating', false);
    case REQUEST_EDIT_ANIMAL:
      return state.set('isEditing', true);
    case EDIT_ANIMAL_SUCCESS:
      return state.set('isEditing', false).update('animals', animals =>
        animals.map(animal => {
          return animal.get('id') === fromJS(action.animal.id)
            ? fromJS(action.animal)
            : animal;
        }),
      );
    case EDIT_ANIMAL_FAILED:
      return state.set('isEditing', false);
    case REQUEST_DELETE_ANIMAL:
      return state.set('isDeleting', true);
    case DELETE_ANIMAL_SUCCESS:
      return state.set('isDeleting', false).update('animals', animals =>
        animals.filter(animal => {
          return animal.get('id') !== fromJS(action.animal.id);
        }),
      );
    case DELETE_ANIMAL_FAILED:
      return state.set('isDeleting', false);
    default:
      return state;
  }
};

export default Animals;
