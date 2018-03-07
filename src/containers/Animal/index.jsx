import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';

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
      <Fragment>
        <div>
          <img src={imgUrl} alt="фотография животного" />
          {/* если роутер на /shop те рендерим линк  */}
          <Route
            id={id}
            path="/shop"
            render={({ id }) => (
              <Link
                className={'button'}
                to={`/amimal/${id}`}
                href={`/amimal/${id}`}
              >
                Перейти к товару
              </Link>
            )}
          />
        </div>
        <div>
          <h3>{animalName}</h3>
          <div>
            Продавец:{
              <Link className={'button'} to={`/${user}`} href={`/${user}`}>
                {user}
              </Link>
            }
          </div>
          <div>{description}</div>
        </div>
        <div>
          <div>{date}</div>
          <div>{price}</div>
          <button onClick={onAddToCart} className={'button'}>
            Добавить в корзину
          </button>
        </div>
      </Fragment>
    );
  }
}
