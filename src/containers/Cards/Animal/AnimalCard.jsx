import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Image } from 'components';

import { addToCart } from 'actions/cart';

@withRouter
@connect()
export default class AnimalCard extends React.Component {
  onAddToCart = () => {
    let { animal: { id }, dispatch } = this.props;
    dispatch(addToCart(id));
  };
  render() {
    let {
      animal: { imgUrl, salerId, id, name, description, date, price },
      owner,
    } = this.props;
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
          <Button onClick={this.onAddToCart} className="btn">
            Добавить в корзину
          </Button>
        </div>
      </div>
    );
  }
}
