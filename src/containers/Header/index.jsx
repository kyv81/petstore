import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import styles from './index.css';
import RegModal from 'containers/Modals/RegModal';
import AuthModal from '/containers/Modals/AuthModal';
import Button from 'Components/Button';

const display = {
  display: 'block'
};
const hide = {
  display: 'none'
};

export class Header extends React.PureComponent {

  constructor(props) {
    super(props);
    this.toggleAuth = this.toggleAuth.bind(this);
    this.toggleReg= this.toggleReg.bind(this);
    this.toggleClear= this.toggleClear.bind(this);

    this.state = {
      toggle: '',
    }
  };

  toggleAuth(event) {
    this.setState(toggle => ({
      toggle: 'auth'
    }));
  }

  toggleClear(event) {
    this.setState(toggle => ({
      toggle: ''
    }));
  }

  toggleReg(event) {
    this.setState(toggle => ({
      toggle: 'reg'
    }));
  }

  render() {
    const { auth: { isLoggedIn } } = this.props.store.getState();
    const { animals: { length } } = this.props.store.getState().animals;
    console.log( this.props.store.getState(),this.state.toggle, isLoggedIn, length);

    var modal = [];
    modal.push(
      <div className={'modal ' + styles.modal} style={this.state.toggle ? display : hide}>
        <div className="modal-content">
          {this.state.toggle=='reg'&&<RegModal toggleClear={this.toggleClear} /> }
          {this.state.toggle=='auth'&&<AuthModal toggleClear={this.toggleClear} />}
          <Button
            class="modal-action waves-green btn-flat"
            type="submit"
            onClick={this.toggleClear}
          >
            Закрыть
          </Button>
        </div>
      </div>
    );
    console.log(this.props.store.getState(),"isLoggedIn",isLoggedIn);
    return (
      <div className={styles.header}>
        <Link to='/' href='/' className={styles.title}>
          Питомник
        </Link>
        <Link className='btn' to='/shop' href='/shop'>
          Магазин
        </Link>
        <div className={styles.rightmenu}>
          <Link className={'btn ' + styles.cartbtn} to='/cart' href='/cart'>
            Перейти в корзину
              {length}
          </Link >
          {!isLoggedIn ? (
            <Fragment>
              <Button className="btn" onClick={this.toggleAuth}>Авторизация</Button>
              <Button className="btn" onClick={this.toggleReg}>Регистрация</Button>
              {modal}
            </Fragment>
          ) : (
            <Link className='btn' to='/profile' href='/profile'>
              Личный кабинет
            </Link >
          )
          }
        </div>
      </div>
    );
  }
}
export default Header;
