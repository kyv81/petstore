export const selectAnimalsList = state => state.getIn(['animals', 'animals']);

export const selectUsersList = state => state.getIn(['users', 'users']);

export const selectCurrentUserId = state => state.getIn(['auth', 'id']);

// ищет Юзера по id юзера
export const selectUserById = (state, id) =>
  state.getIn(['users', 'users']).find(user => user.get('id') === id);

// ищет Животного по id животного
export const selectAnimalById = (state, id) =>
  state.getIn(['animals', 'animals']).find(animal => animal.get('id') === id);

export const selectUserAnimals = (state, id) =>
  state
    .getIn(['animals', 'animals'])
    .filter(animal => animal.get('salerId') === id);

export const selectCartItems = state => state.getIn(['cart', 'items']);
