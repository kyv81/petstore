export {
  tryCreateAnimal,
  tryEditAnimal,
  tryDeleteAnimal,
  tryGetAnimals,
} from 'actions/animals';

export { tryLogin, tryRegister, tryLogout } from 'actions/auth';

export { tryGetUsers, tryEditUser } from 'actions/users';

export { tryAddToCart, removeFromCart, buy } from 'actions/cart';

export {
  changeFilterText,
  changeFilterPrice,
  changeFilterDate,
  changeFilterSort,
} from 'actions/filter';
