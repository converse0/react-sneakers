import React from 'react';

import Card from '../components/Card';

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={onChangeSearchInput}
          />
          {searchValue && (
            <img
              className="clear removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
              onClick={() => setSearchValue('')}
            />
          )}
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item) => (
            <Card
              key={item.id}
              onPlus={onAddToCart}
              onFavorite={onAddToFavorite}
              added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
              loading={false}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
