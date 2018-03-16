export {
  tryCreateAnimal,
  tryEditAnimal,
  tryDeleteAnimal,
  tryGetAnimals,
} from 'actions/animals';

export { tryLogin, tryRegister, tryLogout } from 'actions/auth';

export { tryGetUsers, tryEditUser } from 'actions/users';

export { addToCart, removeFromCart, buy } from 'actions/cart';

export {
  tryUploadImage,
  uploadImageFailed,
  uploadImageSuccess,
} from 'actions/images';

export { onChangeTextFilter } from 'actions/filter';
