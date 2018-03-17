import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Button, Image } from 'components';

export default class AnimalCardCart extends React.PureComponent {
  static propTypes = {
    animal: PropTypes.instanceOf(Map).isRequired,
    onDeleteAnimal: PropTypes.func.isRequired,
  };

  handleDeleteButton = () => {
    const { onDeleteAnimal, animal } = this.props;
    onDeleteAnimal(animal.get('id'));
  };

  render() {
    const { animal } = this.props;

    const price = animal.get('price');
    const name = animal.get('name');
    const imgUrl = animal.get('imgUrl');

    return (
      <div className="card">
        <div className="card-content">
          <div className="row">
            {animal.has('name') ? (
              <Fragment>
                <div className="col s12 m4">
                  <Image src={imgUrl} />
                </div>
                <div className="col s12 m8">
                  <span className="card-title">Кличка: {name}</span>
                  <p>Цена: {price}</p>
                </div>
              </Fragment>
            ) : (
              <div>Товар отсутствует &#128524;</div>
            )}
          </div>
        </div>
        <div className="card-action">
          <Button onClick={this.handleDeleteButton}>Удалить</Button>
        </div>
      </div>
    );
  }
}
