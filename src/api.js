export const getAllAnimals = firebaseInstance => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .database()
      .ref('animals')
      .once('value')
      .then(snapshot => {
        // у snapshot есть только foreach
        let animals = [];
        snapshot.forEach(item => {
          animals = [...animals, item.val()];
        });
        resolve(animals);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const createAnimal = (firebaseInstance, animal) => {
  return new Promise((resolve, reject) => {
    const id = firebaseInstance
      .database()
      .ref('animals/')
      .push().key;
    const newAnimal = {
      id: id,
      salerId: animal.salerId,
      imgUrl: animal.imgUrl
        ? animal.imgUrl
        : 'http://via.placeholder.com/150x150',
      name: animal.name,
      description: animal.description,
      date: Date.now(),
      price: animal.price,
    };

    firebaseInstance
      .database()
      .ref('animals/' + id)
      .set(newAnimal)
      .then(() => {
        resolve(newAnimal);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const editAnimal = (firebaseInstance, animal) => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .database()
      .ref('animals/' + animal.id)
      .set(animal)
      .then(() => {
        resolve(animal);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const removeAnimal = (firebaseInstance, animal) => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .database()
      .ref('animals/' + animal.id)
      .remove()
      .then(() => {
        resolve(animal);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const authUser = (firebaseInstance, email, pass) => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(authUser => {
        firebaseInstance
          .database()
          .ref('users/' + authUser.uid)
          .once('value')
          .then(snapshot => {
            const user = snapshot.val();
            resolve(user);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const logoutUser = firebaseInstance => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .auth()
      .signOut()
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const registerUser = (firebaseInstance, user) => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        const id = data.uid;
        const usersRef = firebaseInstance.database().ref('users/' + id);
        const newUser = {
          id: id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        };
        usersRef.push();
        usersRef.set(newUser).then(() => {
          resolve(newUser);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAllUsers = firebaseInstance => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .database()
      .ref('users')
      .once('value')
      .then(snapshot => {
        // у snapshot есть только foreach
        let users = [];
        snapshot.forEach(item => {
          users = [...users, item.val()];
        });
        resolve(users);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const editUser = (firebaseInstance, user) => {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .database()
      .ref('users/' + user.id)
      .set(user)
      .then(() => {
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });
};
