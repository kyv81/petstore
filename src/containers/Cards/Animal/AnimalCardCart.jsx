import React, { Fragment } from 'react';
import { Route } from 'react-router';
import { object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Button, Image } from 'components';

export const AnimalCardCart = ({ animal, onDeleteAnimal }) => {
  const id = animal.get('id');
  const price = animal.get('price');
  const name = animal.get('name');
  const imgUrl = animal.get('imgUrl');
  return (
    <li className='card'>
      <div className='card-content row'>
        {animal.has('name') ? (
          <Fragment>
            <div className='col s12 m4'>
              <Image src={imgUrl} />
            </div>
            <div className='col s12 m8'>
              <span className='card-title'>Кличка:{name}</span>
              <p className=''>Цена:{price}</p>
            </div>
          </Fragment>
        ) : (
          <div>Товара нет в наличии ... &#128524;</div>
        )}
      </div>
      <div className='card-action'>
        <Button
          onClick={() => {
            onDeleteAnimal(id);
          }}
        >
          Удалить
        </Button>
      </div>
    </li>
  );
};
export default AnimalCardCart;
