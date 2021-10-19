import React from 'react';
import axios from 'axios';

import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://616d6f856dacbb001794ca43.mockapi.io/items')
      .then(({ data }) => setItems(data));
    axios
      .get('https://616d6f856dacbb001794ca43.mockapi.io/cart')
      .then(({ data }) => setCartItems(data));
  }, []);

  const onAddToCart = (obj) => {
    axios
      .post('https://616d6f856dacbb001794ca43.mockapi.io/cart', obj)
      .then(({ data }) => setCartItems((prev) => [...prev, data]));
  };

  const onDeleteFromCart = (id) => {
    axios.delete(`https://616d6f856dacbb001794ca43.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios
      .post('https://616d6f856dacbb001794ca43.mockapi.io/favorites', obj)
      .then(({ data }) => setFavorites((prev) => [...prev, data]));
  };

  const calculateCartSum = cartItems.reduce((acc, sum) => acc + sum.price, 0);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          cartSum={calculateCartSum}
          onClose={() => setCartOpened(false)}
          onDelete={onDeleteFromCart}
        />
      )}
      <Header cartSum={calculateCartSum} onClickCart={() => setCartOpened(true)} />

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
            .map((item, index) => (
              <Card
                key={`${item.name}_${index}`}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                onPlus={onAddToCart}
                onFavorite={onAddToFavorite}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
