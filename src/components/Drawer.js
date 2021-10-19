import React from 'react';

function Drawer({ items = [], onClose, onDelete, cartSum }) {
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" onClick={onClose} />
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((item, index) => (
                <div key={item.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{item.name}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onDelete(item.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex justify-between align-end">
                  <span>Итого:</span>
                  <div></div>
                  <b>{cartSum} руб.</b>
                </li>
                <li className="d-flex justify-between align-end">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{Math.round(cartSum * 0.05)} руб.</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex flex-column justify-center align-center">
            <img
              className="mb-20"
              height={120}
              width={120}
              src="/img/empty-cart.jpg"
              alt="Empty cart"
            />
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button className="greenButton" onClick={onClose}>
              <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
