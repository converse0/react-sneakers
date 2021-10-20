import React from 'react';
import { Link } from 'react-router-dom';

function Header({ onClickCart, cartSum }) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img className="mr-15" width={40} height={40} src="/img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img className="mr-15" width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span>{cartSum} руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/favorite.svg" alt="Favorite" />
          </Link>
        </li>
        <li className="cu-p">
          <img width={18} height={18} src="/img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
