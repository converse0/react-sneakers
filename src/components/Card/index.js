import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({
  id,
  name,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, name, price, imageUrl });
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="100" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="119" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="162" rx="8" ry="8" width="80" height="24" />
          <rect x="114" y="157" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {onFavorite && (
              <img
                onClick={onClickFavorite}
                width={32}
                height={32}
                src={isFavorite ? '/img/heart-licked.svg' : '/img/heart-unlicked.svg'}
                alt="Unlicked"
              />
            )}
          </div>
          <img width="100%" height={130} src={imageUrl} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                width={32}
                height={32}
                src={`/img/${isItemAdded(id) ? 'btn-checked.png' : 'btn-plus.svg'}`}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
