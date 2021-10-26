import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://616d6f856dacbb001794ca43.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Не удалось загрузить заказы');
        console.error(error);
      }
    })();
  }, []);

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
          Мои Заказы
        </h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
