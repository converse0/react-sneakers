import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

function Favorites({ items, onAddToFavorite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="d-flex">
          <Link to="/">
            <img
              className="mr-20"
              width={35}
              height={35}
              src="/img/back-arrow.svg"
              alt="Back Arrow"
            />
          </Link>
          Мои Закладки
        </h1>
      </div>
      {items.length > 0 ? (
        <div className="d-flex flex-wrap">
          {items.map((item, index) => (
            <Card key={item.id} favorited={true} onFavorite={onAddToFavorite} {...item} />
          ))}
        </div>
      ) : (
        <div className="favorites">
          <h2>Закладок нет :(</h2>
          <p className="opacity-4 mb-50">Вы ничего не добавляли в закладки</p>
          <Link to="/">
            <button to="/" className="greenButton mt-20">
              <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
