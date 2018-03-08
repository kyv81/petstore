import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Button, Image } from 'components';

export default class Animal extends React.Component {
  render() {
    let {
      onAddToCart,
      animal: { imgUrl, salerId, id, name, description, date, price },
      owner,
    } = this.props;
    console.log('анимал рендер');
    date = new Date(date);
    date = date.toLocaleDateString();
    return (
      <div className="card horizontal">
        <div className="card-image">
          <Image src={`${imgUrl}`} alt="фотография животного" />
          {/* если роутер на /shop те рендерим линк  */}
          <Route
            path="/shop"
            render={() => (
              <Link className="btn" to={`/animal/${id}`} href={`/animal/${id}`}>
                Перейти к товару
              </Link>
            )}
          />
        </div>
        <div className="card-stacked">
          <h3>{name}</h3>
          <div>
            Продавец:{
              <Link className="btn" to={`/${salerId}`} href={`/${salerId}`}>
                {owner.lastName}
              </Link>
            }
          </div>
          <div>Описание:{description}</div>
        </div>
        <div>
          <div>Дата публикации: {date}</div>
          <div>Цена:{price}</div>
          <Button onClick={onAddToCart} className="btn">
            Добавить в корзину
          </Button>
        </div>
      </div>
    );
  }
}
