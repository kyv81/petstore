import React from 'react';
import { Link } from 'react-router-dom';
import AuthModal from 'containers/AuthModal';

export class Header extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Link className="btn" to="/" href="/">
          Главная
        </Link>
        <Link className="btn" to="/shop" href="/shop">
          Магазин
        </Link>
        <Link className="btn" to="/cabinet" href="/cabinet">
          Личный кабинет
        </Link>
        <AuthModal />
      </div>
    );
  }
}

export default Header;
