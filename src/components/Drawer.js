import React from 'react';
import axios from 'axios';

import AppContext from '../context';
import Info from './Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ items = [], onClose, onDelete, cartSum }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://616d6f856dacbb001794ca43.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://616d6f856dacbb001794ca43.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ :(');
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" onClick={onClose} />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
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
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            image={isOrderComplete ? 'complete-order.jpg' : 'empty-cart.jpg'}
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
