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

const initialState = {
  isRequesting: false,
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  animals: [],
};

const Animals = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_ANIMALS:
      return {
        ...state,
        isRequesting: true,
      };
    case GET_ANIMALS_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        animals: action.animals,
      };
    case GET_ANIMALS_FAILED:
      return {
        ...state,
        isRequesting: false,
      };
    case REQUEST_CREATE_ANIMAL:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_ANIMAL_SUCCESS:
      return {
        ...state,
        isCreating: false,
        animals: [state.animals, action.animal],
      };
    case CREATE_ANIMAL_FAILED:
      return {
        ...state,
        isCreating: false,
      };
    case REQUEST_EDIT_ANIMAL:
      return {
        ...state,
        isEditing: true,
      };
    case EDIT_ANIMAL_SUCCESS:
      return {
        ...state,
        isEditing: false,
        animals: state.animals.map(item => {
          return item.id === action.animal.id ? action.animal : item;
        }),
      };
    case EDIT_ANIMAL_FAILED:
      return {
        ...state,
        isEditing: false,
      };
    case REQUEST_DELETE_ANIMAL:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_ANIMAL_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        animals: state.animals.filter(item => {
          return item.id !== action.animal.id;
        }),
      };
    case DELETE_ANIMAL_FAILED:
      return {
        ...state,
        isDeleting: false,
      };
    default:
      return state;
  }
};

export default Animals;
