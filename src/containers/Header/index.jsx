import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

import styles from './index.css';
import { tryLogout } from 'actions/auth';
import RegModal from 'containers/Modals/RegModal';
import AuthModal from '/containers/Modals/AuthModal';
import Button from 'Components/Button';

const display = {
  display: 'block'
};
const hide = {
  display: 'none'
};

function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
  };
}

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: '',
      animals: null,
    }
  };

  static propTypes = {
    dispatch: func,
  };

  LogOut = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(tryLogout())
      .then(() => {
        this.toggleClear();
      })
      .catch(() => {
        console.log( "Ошбка, невозможно выйти из профиля!");
      });
  };

  toggleAuth = e => {
    this.setState(toggle => ({
      toggle: 'auth',
    }));
  };

  toggleClear = e => {
    this.setState(toggle => ({
      toggle: '',
    }));
  };

  toggleReg = e => {
    this.setState(toggle => ({
      toggle: 'reg',
    }));
  };

  render() {

    const { auth: { isLoggedIn } } = this.props.store.getState();
    const { animals: { length } } = this.props.store.getState().animals;
    console.log("length", this.props.store.getState().animals.animals,"length",length);

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
      </div>,
    );
    return (
      <div className={styles.header}>
        <Link to='/' href='/' className={styles.title}>
          Питомник
        </Link>
        <Link className='btn' to='/shop' href='/shop'>
          Магазин
        </Link>
        <div className={styles.rightmenu}>
          <Link className=" waves-teal btn-flat lime accent-1" to='/cart' href='/cart'>
            Перейти в корзину
            <i class="material-icons right circle">{length}</i>
          </Link>
          {!isLoggedIn ? (
            <Fragment>
              <Button className="btn" onClick={this.toggleAuth}>
                Авторизация
              </Button>
              <Button className="btn" onClick={this.toggleReg}>
                Регистрация
              </Button>
              {modal}
            </Fragment>
          ) : (
            <Fragment>
              <Link className='btn' to='/cabinet' href='/cabinet'>
                Личный кабинет
              </Link>
              <Button className="btn" onClick={this.LogOut}>
                Выйти
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Header);
