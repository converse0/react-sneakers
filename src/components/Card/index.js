import React from 'react';
import styles from './Card.module.scss';

function Card({ id, name, price, licked, imageUrl, onClick }) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          width={32}
          height={32}
          src={`/img/heart-${licked ? 'licked' : 'unlicked'}.svg`}
          alt="Unlicked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className="button" onClick={onClick}>
          <img width={11} height={11} src="/img/plus.svg" alt="plus" />
        </button>
      </div>
    </div>
  );
}

export default Card;
