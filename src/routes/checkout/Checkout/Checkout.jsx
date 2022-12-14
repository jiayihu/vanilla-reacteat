import './Checkout.css';

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectAddress } from '../../../redux/address/address.reducer';
import { selectCart } from '../../../redux/cart/cart.reducer';
import { postOrder } from '../../../services/orders.service';
import { Button } from '../../../ui/Button/Button';
import { OrderItems } from '../../shared/OrderItems/OrderItems';
import { OrderSummary } from '../../shared/OrderSummary/OrderSummary';

export function Checkout() {
  const cart = useSelector(selectCart);
  const address = useSelector(selectAddress);
  const navigate = useNavigate();

  const handleConfirm = useCallback(() => {
    const order = {
      date: new Date().toISOString(),
      restaurantId: cart.restaurant.id,
      deliveryCharge: cart.restaurant.deliveryCharge,
      address,
      items: cart.items,
    };

    postOrder(order).then((response) => {
      navigate(`/orders/${response.id}`);
    });
  }, [cart, address, navigate]);

  if (!cart.restaurant) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <h1 className="text-center py-5">Checkout</h1>
      <OrderItems items={cart.items} />
      <hr />
      <OrderSummary items={cart.items} deliveryCharge={cart.restaurant.deliveryCharge} />
      <div className="text-center my-5">
        <Button type="button" variant="block" large onClick={handleConfirm}>
          Confirm order
        </Button>
      </div>
    </div>
  );
}
