import React from 'react';
import AppContext from '../context';

function Info({ image, title, description }) {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex flex-column justify-center align-center">
      <img className="mb-20" width={120} src={`/img/${image}`} alt="Empty cart" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
      </button>
    </div>
  );
}

export default Info;
