import React from 'react';
import { Input, Button } from 'components';

export const isDisplay = (
  animals,
  textFilterValue,
  minPriceFilterValue,
  maxPriceFilterValue,
  minDateFilterValue,
  maxDateFilterValue
  // dateMin,
  // dateMax
) => {
  const filteredAnimals = animals.filter(animal => {
    const name = animal.get('name');
    const date = animal.get('date');
    const price = animal.get('price');
    console.log(minDateFilterValue, maxDateFilterValue);
    return (
      name.indexOf(textFilterValue) !== -1 &&
      price < +maxPriceFilterValue &&
      price > +minPriceFilterValue &&
      date >= minDateFilterValue &&
      date <= maxDateFilterValue
    );
  });
  return filteredAnimals;
};
export default isDisplay;
