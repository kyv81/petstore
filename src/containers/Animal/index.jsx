import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Button, Image } from 'components';

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
      <div className="card horizontal">
        <div className="card-image">
          <Image src={`${imgUrl}`} alt="фотография животного" />
          {/* если роутер на /shop те рендерим линк  */}
          <Route
            id={id}
            path="/shop"
            render={() => (
              <Link className="btn" to={`/animal/${id}`} href={`/animal/${id}`}>
                Перейти к товару {id}
              </Link>
            )}
          />
        </div>
        <div className="card-stacked">
          <h3>{animalName}</h3>
          <div>
            Продавец:{
              <Link className="btn" to={`/${user}`} href={`/${user}`}>
                {user}
              </Link>
            }
          </div>
          <div>{description}</div>
        </div>
        <div>
          <div>{date}</div>
          <div>{price}</div>
          <Button onClick={onAddToCart} className="btn">
            Добавить в корзину
          </Button>
        </div>
      </div>
    );
  }
}
