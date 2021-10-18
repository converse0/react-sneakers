import React from 'react';

function Drawer({ items = [], onClose }) {
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" onClick={onClose} />
        </h2>
        <div className="items">
          {items.map((item, index) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">{item.name}</p>
                <b>{item.price} руб.</b>
              </div>
              <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li className="d-flex justify-between align-end">
              <span>Итого:</span>
              <div></div>
              <b>{items.reduce((acc, sum) => acc + sum.price, 0)}</b>
            </li>
            <li className="d-flex justify-between align-end">
              <span>Налог 5%</span>
              <div></div>
              <b>{Math.round(items.reduce((acc, sum) => acc + sum.price, 0) * 0.05)}</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
