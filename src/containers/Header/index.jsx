import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';
import RegModal from '/containers/Header/RegModal';
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

    this.state = {
      toggle: '',
    }
  };


  toggleAuth(event) {
    this.setState(toggle => ({
      toggle: 'auth'
    }));
  }

  toggleReg(event) {
    this.setState(toggle => ({
      toggle: 'reg'
    }));
  }

  render() {
    const { user: { isLoggedIn } } = this.props.store.getState();
    var modal = [];
    modal.push(
      <div className="modal" style={this.state.toggle ? display : hide}>
        <div className="modal-content">
                {this.state.toggle=='reg'?<RegModal/>:'nope'}
        </div>
      </div>
    );
    return (
      <Fragment>
        <Link to='/' href='/' className='btn'>
          PetShop
        </Link>
        <Link className='btn' to='/shop' href='/shop'>
          Магазин
        </Link>
        {!isLoggedIn ? (
          <div>
            <Button className="btn" onClick={this.toggleAuth}>Авторизация</Button>
            <Button className="btn" onClick={this.toggleReg}>Регистрация</Button>
            {modal}
          </div>
        ) : (null)
        }
      </Fragment>
    );
  }
}
export default Header;
