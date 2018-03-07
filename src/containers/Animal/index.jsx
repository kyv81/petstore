import React from 'react';
import { Link } from 'react-router-dom';

export default class Animal extends React.Component {
  render() {
    let {
      onAddToCart,
      imgUrl,
      animalName,
      saler,
      description,
      date,
      price,
      id,
      user,
    } = this.props;
    return (
      <>
        <div>
          <img src={imgUrl} alt="фотография животного" />
          <Link
            className={'button'}
            to={`/amimal/${id}`}
            href={`/amimal/${id}`}
          />
        </div>
        <div>
          <h3>{animalName}</h3>
          <div>
            Продавец:{
              <Link className={'button'} to={`/${user}`} href={`/${user}`} />
            }
          </div>
          <div>{description}</div>
        </div>
        <div>
          <div>{date}</div>
          <div>{price}</div>
          <button onClick={onAddToCart} className={'button'}>
            Добавить в карзину
          </button>
        </div>
      </>
    );
  }
}
