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

import { getAllAnimals, createAnimal, editAnimal, removeAnimal } from 'api';

const requestCreateAnimal = animal => {
  return {
    type: REQUEST_CREATE_ANIMAL,
    animal,
  };
};

const requestGetAnimals = () => {
  return {
    type: REQUEST_GET_ANIMALS,
  };
};

const requestEditAnimal = animal => {
  return {
    type: REQUEST_EDIT_ANIMAL,
    animal,
  };
};

const requestDeleteAnimal = animal => {
  return {
    type: REQUEST_DELETE_ANIMAL,
    animal,
  };
};

const shouldCreateAnimal = state => {
  return !state.getIn(['animals', 'isCreating']);
};

const shouldGetAnimals = state => {
  return !state.getIn(['animals', 'isRequesting']);
};

const shouldEditAnimal = state => {
  return !state.getIn(['animals', 'isEditing']);
};

const shouldDeleteAnimal = state => {
  return !state.getIn(['animals', 'isDeleting']);
};

const createAnimalSuccess = animal => {
  return {
    type: CREATE_ANIMAL_SUCCESS,
    animal,
  };
};

const getAnimalsSuccess = animals => {
  return {
    type: GET_ANIMALS_SUCCESS,
    animals,
  };
};

const editAnimalSuccess = animal => {
  return {
    type: EDIT_ANIMAL_SUCCESS,
    animal,
  };
};

const deleteAnimalSuccess = animal => {
  return {
    type: DELETE_ANIMAL_SUCCESS,
    animal,
  };
};

const createAnimalFailed = error => {
  return {
    type: CREATE_ANIMAL_FAILED,
    error,
  };
};

const getAnimalsFailed = error => {
  return {
    type: GET_ANIMALS_FAILED,
    error,
  };
};

const editAnimalFailed = error => {
  return {
    type: EDIT_ANIMAL_FAILED,
    error,
  };
};

const deleteAnimalFailed = error => {
  return {
    type: DELETE_ANIMAL_FAILED,
    error,
  };
};

const getAnimals = () => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestGetAnimals());

    return new Promise((resolve, reject) => {
      getAllAnimals(getFirebase())
        .then(animals => {
          dispatch(getAnimalsSuccess(animals));
          resolve(animals);
        })
        .catch(error => {
          dispatch(getAnimalsFailed(error));
          reject(error);
        });
    });
  };
};

const create = animal => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestCreateAnimal(animal));

    return new Promise((resolve, reject) => {
      createAnimal(getFirebase(), animal)
        .then(newAnimal => {
          dispatch(createAnimalSuccess(newAnimal));
          resolve(newAnimal);
        })
        .catch(error => {
          dispatch(createAnimalFailed(error));
          reject(error);
        });
    });
  };
};

const edit = animal => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestEditAnimal(animal));

    return new Promise((resolve, reject) => {
      editAnimal(getFirebase(), animal)
        .then(() => {
          dispatch(editAnimalSuccess(animal));
          resolve(animal);
        })
        .catch(error => {
          dispatch(editAnimalFailed(error));
          reject(error);
        });
    });
  };
};

const remove = animal => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestDeleteAnimal(animal));

    return new Promise((resolve, reject) => {
      removeAnimal(getFirebase(), animal)
        .then(() => {
          dispatch(deleteAnimalSuccess(animal));
          resolve(animal);
        })
        .catch(error => {
          dispatch(deleteAnimalFailed(error));
          reject(error);
        });
    });
  };
};

export const tryCreateAnimal = animal => {
  return (dispatch, getState) => {
    if (shouldCreateAnimal(getState())) {
      return dispatch(create(animal));
    }
  };
};

export const tryGetAnimals = () => {
  return (dispatch, getState) => {
    if (shouldGetAnimals(getState())) {
      return dispatch(getAnimals());
    }
  };
};

export const tryEditAnimal = animal => {
  return (dispatch, getState) => {
    if (shouldEditAnimal(getState())) {
      return dispatch(edit(animal));
    }
  };
};

export const tryDeleteAnimal = animal => {
  return (dispatch, getState) => {
    if (shouldDeleteAnimal(getState())) {
      return dispatch(remove(animal));
    }
  };
};
