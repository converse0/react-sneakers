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
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={onAddToCart}
        onFavorite={onAddToFavorite}
        loading={isLoading}
        {...item}
      />
    ));
  };

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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
