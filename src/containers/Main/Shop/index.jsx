import React from 'react';
import Animal from 'containers/Animal';

export class Shop extends React.Component {
  render() {
    return (
      <Animal
        onAddToCart={() => {}}
        imgUrl="https://picsum.photos/100/100"
        animalName="tosha"
        saler="sasha"
        description="Это собака"
        date="21.21.21"
        price="не продается"
        id="3232"
        user="user3232"
      />
    );
  }
}

export default Shop;
