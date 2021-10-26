import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import AppContext from './context';
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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://616d6f856dacbb001794ca43.mockapi.io/cart');
      const favoritesResponse = await axios.get(
        'https://616d6f856dacbb001794ca43.mockapi.io/favorites',
      );
      const itemsResponse = await axios.get('https://616d6f856dacbb001794ca43.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://616d6f856dacbb001794ca43.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios
          .post('https://616d6f856dacbb001794ca43.mockapi.io/cart', obj)
          .then(({ data }) => setCartItems((prev) => [...prev, data]));
      }
    } catch (error) {
      alert('Не удалось добавить товар в корзину');
    }
  };

  const onDeleteFromCart = (id) => {
    axios.delete(`https://616d6f856dacbb001794ca43.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    try {
      if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://616d6f856dacbb001794ca43.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios
          .post('https://616d6f856dacbb001794ca43.mockapi.io/favorites', obj)
          .then(({ data }) => setFavorites((prev) => [...prev, data]));
      }
    } catch (error) {
      alert('Не удалось добавить в избранное');
    }
  };

  const calculateCartSum = cartItems.reduce((acc, sum) => acc + sum.price, 0);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            cartSum={calculateCartSum}
            onDelete={onDeleteFromCart}
            onClose={() => setCartOpened(false)}
          />
        )}
        <Header cartSum={calculateCartSum} onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites">
          <Favorites />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
