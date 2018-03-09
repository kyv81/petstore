import React from 'react';
import { Route } from 'react-router';
import { object, func } from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Image } from 'components';
import { removeFromCart } from 'actions/cart';

@connect()
export default class AnimalCardCart extends React.Component {
  static propTypes = {
    animal: object,
    dispatch: func,
  };

  onDeleteAnimal = () => {
    let { dispatch, animal: { id } } = this.props;
    dispatch(removeFromCart(id));
  };

  render() {
    const { price, name, imgUrl } = this.props.animal;

    return (
      <li className="collection-item avatar">
        <div className="">
          <Image src={imgUrl} />
        </div>
        <span className="title">Кличка:{name}</span>
        <p className="">Цена:{price}</p>
        <div className="secondary-content">
          <Button onClick={this.onDeleteAnimal}>Удалить</Button>
        </div>
      </li>
    );
  }
}
