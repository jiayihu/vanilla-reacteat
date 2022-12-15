import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../../../services/orders.service';
import { getRestaurant } from '../../../services/restaurant.service';
import { Icons } from '../../../ui/Icons/Icons';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { OrderItems } from '../../shared/OrderItems/OrderItems';
import { OrderSummary } from '../../shared/OrderSummary/OrderSummary';
import illustrationPng from './illustration.png';
import './Order.css';

export function Order() {
  const [order, setOrder] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const { id: orderId } = useParams();

  useEffect(() => {
    getOrder(orderId).then((order) => {
      setOrder(order);

      getRestaurant(order.restaurantId).then((restaurant) => setRestaurant(restaurant));
    });
  }, [orderId]);

  const data = useMemo(
    () => (order && restaurant ? { order, restaurant } : null),
    [order, restaurant],
  );

  return (
    <div className="container">
      <div className="text-center">
        <img src={illustrationPng} alt="Order" className="w-50" />
      </div>
      <Placeholder data={data}>
        {({ order, restaurant }) => {
          return (
            <div className="order">
              <div className="text-center">
                <div>
                  <Link to={`/restaurants/${restaurant.id}`} className="h3 text-primary">
                    {restaurant.name}
                  </Link>
                </div>
                <div>{restaurant.address}</div>
              </div>
              <div className="border-bottom my-4"></div>
              <div className="order__address">
                <Icons name="geo" />
                <div>
                  <div className="font-weight-bold">Shipping address</div>
                  <div>{order.address}</div>
                </div>
              </div>
              <div className="border-bottom my-4"></div>
              <div>
                <div className="mb-1">{new Date(order.date).toLocaleDateString()}</div>
                <h2 className="order__number">
                  <Icons name="receipt" /> Order id. {order.id}
                </h2>
                <OrderItems items={order.items} />
                <OrderSummary items={order.items} deliveryCharge={restaurant.deliveryCharge} />
              </div>
            </div>
          );
        }}
      </Placeholder>
    </div>
  );
}
