import './Home.css';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../../services/orders.service';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { Order } from '../../orders/orders.types';
import type { AddressData } from '../HomeAddressBox/HomeAddressBox';
import { HomeAddressBox } from '../HomeAddressBox/HomeAddressBox';
import { PastOrder } from '../PastOrder/PastOrder';
import coverImg from './cover.jpg';

export function Home() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const handleSubmit = useCallback(
    (data: AddressData) => {
      navigate(`/search?address=${encodeURIComponent(data.address)}`);
    },
    [navigate],
  );

  // effect = () => fetch(...)

  useEffect(() => {
    getOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <div className="home">
      <img className="home__cover" src={coverImg} alt="" />
      <div className="container">
        <HomeAddressBox onSubmit={handleSubmit} />

        <div className="mt-5">
          <div className="h5 text-uppercase mb-3">Order again</div>
          <div className="past-orders">
            <Placeholder data={orders}>
              {(nonNullOrders) =>
                nonNullOrders.map((order) => <PastOrder {...order} key={order.id} />)
              }
            </Placeholder>
          </div>
        </div>
      </div>
    </div>
  );
}
