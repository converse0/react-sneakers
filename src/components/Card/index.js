import React from 'react';
import styles from './Card.module.scss';

function Card({ name, price, imageUrl, onPlus, onFavorite }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ name, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ name, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onClickFavorite}
          width={32}
          height={32}
          src={isFavorite ? '/img/heart-licked.svg' : '/img/heart-unlicked.svg'}
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
        <img
          className={styles.plus}
          onClick={onClickPlus}
          width={32}
          height={32}
          src={`/img/${isAdded ? 'btn-checked.png' : 'btn-plus.svg'}`}
          alt="plus"
        />
      </div>
    </div>
  );
}

export default Card;
