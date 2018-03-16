export const filterAnimals = (animals, filter) => {
  const text = filter.get('text');
  const minPrice = filter.get('minPrice');
  const maxPrice = filter.get('maxPrice');
  const minDate = filter.get('minDate');
  const maxDate = filter.get('maxDate');

  const millisecsInDay = 86400000;

  return animals.filter(animal => {
    const name = animal.get('name');
    const price = animal.get('price');
    const date = new Date(animal.get('date'));
    return (
      price >= minPrice &&
      price <= maxPrice &&
      date >= minDate &&
      date <= new Date(+maxDate + millisecsInDay) &&
      (name.indexOf(text) !== -1 || !text)
    );
  });
};

export const sortAnimals = (animals, sortType, sortAsc) => {
  return animals.sort((a, b) => {
    let result;
    if (sortType === 'price') {
      result = a.get('price') - b.get('price');
    } else if (sortType === 'date') {
      result = new Date(a.get('date')) - new Date(b.get('date'));
    } else if (sortType === 'name') {
      result = a.get('name').localeCompare(b.get('name'));
    }

    if (!sortAsc) {
      result *= -1;
    }
    return result;
  });
};
