import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.PureComponent {
  render() {
    return (
      <div className="container is-fluid">
        <Link className={'button'} to="/" href="/">Главная</Link>
        <Link className={'button'} to="/shop" href="/shop">Магазин</Link>
        <Link className={'button'} to="/cabinet" href="/cabinet">Личный кабинет</Link>
      </div>
    );
  }
}

export default Header;
