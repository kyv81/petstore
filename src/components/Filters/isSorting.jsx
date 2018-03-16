import React from 'react';

export const isSorting = (animals, sortType, asc) => {
  const sortedAnimals = animals.sort((a, b) => {
    if (sortType == 'PriceSort') {
      const price1 = a.get('price');
      const price2 = b.get('price');
      return asc ? price2 - price1 : price1 - price2;
    } else if (sortType == 'DateSort') {
      const date1 = a.get('date');
      const date2 = b.get('date');
      return asc ? date2 - date1 : date1 - date2;
    } else if (sortType == 'NameSort') {
      const name1 = a.get('name').toLowerCase();
      const name2 = b.get('name').toLowerCase();
      if (asc) {
        return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
      } else {
        return name1 > name2 ? -1 : name1 < name2 ? 1 : 0;
      }
    }
  });
  return sortedAnimals;
};
export default isSorting;
