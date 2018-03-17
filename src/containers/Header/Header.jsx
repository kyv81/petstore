import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { LoginCard, RegisterCard, Button } from 'components';
import { ModalContainer, CartCard } from 'containers';

import { tryLogin, tryRegister, tryLogout, buy, addUser } from 'actions';
import { selectCurrentUserId, selectCartItems } from 'selectors';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
    cartItems: selectCartItems(state),
    userId: selectCurrentUserId(state),
  };
}
@connect(mapStateToProps)
export default class Header extends React.PureComponent {
  state = {
    modal: '',
  };

  static propTypes = {
    dispatch: PropTypes.func,
    cartItems: PropTypes.instanceOf(List),
    isLoggedIn: PropTypes.bool,
    userId: PropTypes.string,
  };

  showCart = e => {
    e.preventDefault();
    this.setState({
      modal: 'cart',
    });
  };

  showLogin = e => {
    e.preventDefault();
    this.setState({
      modal: 'login',
    });
  };

  showRegister = e => {
    e.preventDefault();
    this.setState({
      modal: 'register',
    });
  };

  showError = error => {
    M.toast({
      html: error.toString(),
      classes: 'red',
    });
  };

  onCancel = () => {
    this.setState({ modal: '' });
  };

  onLoginSubmit = (email, password) => {
    const { dispatch } = this.props;
    dispatch(tryLogin(email, password))
      .then(() => {
        this.onCancel();
      })
      .catch(error => {
        this.showError(error);
      });
  };

  onRegisterSubmit = user => {
    const { dispatch } = this.props;
    dispatch(tryRegister(user))
      .then(user => {
        dispatch(addUser(user));
        this.onCancel();
      })
      .catch(error => {
        this.showError(error);
      });
  };

  onCartSubmit = () => {
    const { dispatch } = this.props;

    dispatch(buy());
  };

  logout = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(tryLogout())
      .then(() => {
        this.onCancel();
      })
      .catch(error => {
        this.showError(error);
      });
  };

  render() {
    const { modal } = this.state;
    const { userId } = this.props;
    const animalsInCartCount = this.props.cartItems.size;
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <header>
        <nav className="z-depth-1 blue">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/" href="/">
              Питомник
            </Link>
            <ul className="right">
              <li>
                <Button onClick={this.showCart}>
                  {`Корзина (${animalsInCartCount})`}
                </Button>
              </li>
              <li>
                <Link to="/shop" href="/shop">
                  Магазин
                </Link>
              </li>
              {!isLoggedIn ? (
                <Fragment>
                  <li>
                    <a onClick={this.showLogin}>Вход</a>
                  </li>
                  <li>
                    <a onClick={this.showRegister}>Регистрация</a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link to={`/user/${userId}`} href={`/user/${userId}`}>
                      Профиль
                    </Link>
                  </li>
                  <li>
                    <a href="" onClick={this.logout}>
                      Выход
                    </a>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </nav>
        {modal && (
          <ModalContainer>
            {modal === 'login' && (
              <LoginCard
                onCancel={this.onCancel}
                onSubmit={this.onLoginSubmit}
              />
            )}
            {modal === 'register' && (
              <RegisterCard
                onCancel={this.onCancel}
                onSubmit={this.onRegisterSubmit}
              />
            )}
            {modal === 'cart' && (
              <CartCard onCancel={this.onCancel} onSubmit={this.onCartSubmit} />
            )}
          </ModalContainer>
        )}
      </header>
    );
  }
}
