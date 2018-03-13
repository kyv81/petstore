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
    const { dispatch, animal } = this.props;
    const id = animal.get('id');
    dispatch(removeFromCart(id));
  };

  render() {
    const { animal } = this.props;

    const price = animal.get('price');
    const name = animal.get('name');
    const imgUrl = animal.get('imgUrl');

    return (
      <li className="card">
        <div className="card-content row">
          <div className="col s12 m4">
            <Image src={imgUrl} />
          </div>
          <div className="col s12 m8">
            <span className="card-title">Кличка:{name}</span>
            <p className="">Цена:{price}</p>
          </div>
        </div>
        <div className="card-action">
          <Button onClick={this.onDeleteAnimal}>Удалить</Button>
        </div>
      </li>
    );
  }
}
