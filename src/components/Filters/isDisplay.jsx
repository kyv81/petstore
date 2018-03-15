import React from 'react';
import { Input, Button } from 'components';

export const isDisplay = (
  animals,
  textFilterValue,
  minPriceFilterValue,
  maxPriceFilterValue,
  minDateFilterValue,
  maxDateFilterValue
) => {
  const filteredAnimals = animals.filter(animal => {
    const name = animal.get('name');
    const date = animal.get('date');
    const price = animal.get('price');
    const dmax = +maxDateFilterValue + 86400000; //костыль
    const dmin = +minDateFilterValue - 10800000; // еще костыль
    return (
      name.indexOf(textFilterValue) !== -1 &&
      price < +maxPriceFilterValue &&
      price > +minPriceFilterValue &&
      date >= dmin &&
      date <= dmax
    );
  });
  return filteredAnimals;
};
export default isDisplay;
