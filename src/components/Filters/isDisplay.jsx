import React from 'react';

export const isDisplay = (
  animals,
  textFilterValue,
  minPriceFilterValue,
  maxPriceFilterValue,
  minDateFilterValue,
  maxDateFilterValue
) => {
  const filteredAnimals = animals.filter(animal => {
    const name = animal.get('name').toLowerCase();
    const date = animal.get('date');
    const price = animal.get('price');
    const dmax = +maxDateFilterValue + 86400000; //костыль
    const dmin = +minDateFilterValue - 10800000; // еще костыль
    const searchtext = textFilterValue.toLowerCase();  //боже, как я люблю костыли!!1!
    return (
      name.indexOf(searchtext) !== -1 &&
      price < +maxPriceFilterValue &&
      price > +minPriceFilterValue &&
      date >= dmin &&
      date <= dmax
    );
  });
  return filteredAnimals;
};
export default isDisplay;
