import React, { Fragment } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Image } from 'components';

import { tryAddToCart } from 'actions/cart';

const mapStateToProps = state => {
  return {
    auth: state.get('auth'),
  };
};

@withRouter
@connect(mapStateToProps)
export class AnimalCard extends React.PureComponent {
  static propTypes = {
    owner: PropTypes.object.isRequired,
    animal: PropTypes.object.isRequired,
    auth: PropTypes.object,
    location: PropTypes.string,
    dispatch: PropTypes.func,
  };

  onAddToCart = e => {
    e.preventDefault();
    const { animal, dispatch } = this.props;
    const id = animal.get('id');

    dispatch(tryAddToCart(id))
      .then(() => {
        M.toast({
          html: 'Добавлено!',
          classes: 'green accent-2',
        });
      })
      .catch(() => {
        M.toast({
          html: 'Уже добавлена в корзину!',
          classes: 'red accent-2',
        });
      });
  };

  render() {
    const { animal, owner, auth, location: { pathname: path } } = this.props;

    const id = animal.get('id');
    const imgUrl = animal.get('imgUrl');
    const name = animal.get('name');
    const date = animal.get('date');
    const price = animal.get('price');
    const description = animal.get('description');
    const salerId = animal.get('salerId');

    const userId = auth.getIn(['data', 'id']);
    const firstName = owner.get('firstName');
    const lastName = owner.get('lastName');

    const localisedDate = new Date(date).toLocaleDateString();

    return (
      <div className="card">
        <div className="card-content row">
          <div className="col s12 m4">
            <div className="center">
              <Image src={`${imgUrl}`} alt="Фотография животного" />
            </div>
          </div>
          <div className="col s12 m8">
            <span className="card-title">{name}</span>
            {salerId === userId ? (
              'ВЫ ВЛАДЕЛЕЦ '
            ) : (
              <Link to={`/user/${salerId}`} href={`/user/${salerId}`}>
                {`${firstName} ${lastName} `}
              </Link>
            )}
            <span>Размещено {localisedDate}</span>
            <p>Цена: {price} руб.</p>
            <hr />
            <p>{description}</p>
          </div>
        </div>
        <div className="card-action">
          {path === '/shop' && (
            <Link to={`/animal/${id}`} href={`/animal/${id}`}>
              Перейти к товару
            </Link>
          )}
          {salerId !== userId && (
            <a href="" onClick={this.onAddToCart}>
              В корзину
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default AnimalCard;
