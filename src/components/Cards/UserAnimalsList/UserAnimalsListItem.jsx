import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'components';

export default class UserAnimalsListItem extends React.PureComponent {
  static propTypes = {
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    isEditable: PropTypes.bool,
    animal: PropTypes.object,
  };

  handleEdit = e => {
    const { onEdit, animal } = this.props;
    e.preventDefault();

    onEdit(animal);
  };

  handleRemove = e => {
    const { onRemove, animal } = this.props;
    e.preventDefault();

    onRemove(animal.toJS());
  };

  render() {
    const { isEditable, animal } = this.props;

    const imgUrl = animal.get('imgUrl');
    const name = animal.get('name');
    const description = animal.get('description');
    const date = new Date(animal.get('date')).toLocaleDateString();
    const price = animal.get('price');

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
            <span>Размещено {date}</span>
            <p>Цена: {price} руб.</p>
            <hr />
            <p>{description}</p>
          </div>
        </div>
        {isEditable && (
          <div className="card-action">
            <a href="" onClick={this.handleEdit}>
              Редактировать
            </a>
            <a href="" onClick={this.handleRemove}>
              Удалить
            </a>
          </div>
        )}
      </div>
    );
  }
}
