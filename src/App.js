import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {
    id: 1,
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    imageUrl: '/img/sneakers/1.jpg',
    price: 12999,
    licked: false,
  },
  {
    id: 2,
    name: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    imageUrl: '/img/sneakers/2.jpg',
    licked: false,
  },
  {
    id: 3,
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    imageUrl: '/img/sneakers/3.jpg',
    licked: true,
  },
  {
    id: 4,
    name: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8499,
    imageUrl: '/img/sneakers/4.jpg',
    licked: true,
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {arr.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              imageUrl={card.imageUrl}
              name={card.name}
              price={card.price}
              licked={card.licked}
              onClick={() => console.log(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
