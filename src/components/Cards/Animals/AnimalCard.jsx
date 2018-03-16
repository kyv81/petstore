import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'components';

export class AnimalCard extends React.PureComponent {
  static propTypes = {
    owner: PropTypes.object.isRequired,
    animal: PropTypes.object.isRequired,
    showCartButton: PropTypes.bool,
    showMoreButton: PropTypes.bool,
    onAddToCart: PropTypes.func,
  };

  handleAddToCart = e => {
    e.preventDefault();
    this.props.onAddToCart(this.props.animal);
  };

  render() {
    const { animal, owner, showCartButton, showMoreButton } = this.props;

    const id = animal.get('id');
    const imgUrl = animal.get('imgUrl');
    const name = animal.get('name');
    const date = animal.get('date');
    const price = animal.get('price');
    const description = animal.get('description');
    const salerId = animal.get('salerId');

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
            <Link to={`/user/${salerId}`} href={`/user/${salerId}`}>
              {`${firstName} ${lastName} `}
            </Link>
            <span>Размещено {localisedDate}</span>
            <p>Цена: {price} руб.</p>
            <hr />
            <p>{description}</p>
          </div>
        </div>
        <div className="card-action">
          {showMoreButton && (
            <Link to={`/animal/${id}`} href={`/animal/${id}`}>
              Перейти к товару
            </Link>
          )}
          {showCartButton && (
            <a href="" onClick={this.handleAddToCart}>
              В корзину
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default AnimalCard;
