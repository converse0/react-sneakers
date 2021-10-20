import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
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
    axios
      .get('https://616d6f856dacbb001794ca43.mockapi.io/favorites')
      .then(({ data }) => setFavorites(data));
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
    console.log(obj);
    if (favorites.find((item) => item.id === obj.id)) {
      axios.delete(`https://616d6f856dacbb001794ca43.mockapi.io/favorites/${obj.id}`);
    } else {
      axios
        .post('https://616d6f856dacbb001794ca43.mockapi.io/favorites', obj)
        .then(({ data }) => setFavorites((prev) => [...prev, data]));
    }
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

      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites">
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
