export {
  tryCreateAnimal,
  tryEditAnimal,
  tryDeleteAnimal,
  tryGetAnimals,
} from 'actions/animals';

export { tryLogin, tryRegister, tryLogout } from 'actions/auth';

export {
  tryGetUsers,
  tryEditUser,
  tryUploadImage,
  uploadImageFailed,
  uploadImageSuccess,
} from 'actions/users';

export { addToCart, removeFromCart, buy } from 'actions/cart';

export { onChangeTextFilter } from 'actions/filter';
