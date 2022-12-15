import './Restaurant.css';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurant } from '../../../services/restaurant.service';
import { Button } from '../../../ui/Button/Button';
import { Icons } from '../../../ui/Icons/Icons';
import { Image } from '../../../ui/Image/Image';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { useCart } from '../../shared/cart/cart-context';
import { CartToast } from '../CartToast/CartToast';
import { MenuItem } from '../MenuItem/MenuItem';
import { Restaurant as IRestaurant } from '../restaurant.types';

export function Restaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const navigate = useNavigate();
  const [cart, cartAPI] = useCart(); // useCart(([cart]) => cart.items)
  const cartItems = cart.items;

  const params = useParams();
  const { id: restaurantId } = params;

  useEffect(() => {
    getRestaurant(restaurantId).then((restaurant) => {
      setRestaurant(restaurant);
      cartAPI.setRestaurant(restaurant);
    });
  }, [restaurantId, cartAPI]);

  const handleCheckout = useCallback(() => navigate('/checkout'), [navigate]);

  return (
    <>
      <div className="container pt-3 pb-5">
        <Placeholder data={restaurant} rows={6}>
          {(restaurant) => (
            <>
              <div className="text-center">
                <Image
                  className="restaurant__cover"
                  src="https://source.unsplash.com/collection/9840313/960x540"
                  alt={restaurant.name}
                  placeholderWidth="100%"
                  placeholderHeight={200}
                />
              </div>

              <h1 className="my-4 text-center">{restaurant.name}</h1>

              <ul className="restaurant__menu">
                {restaurant.menu.items.map((item) => {
                  const count = cartItems.filter((cartItem: any) => cartItem.id === item.id).length;

                  return (
                    <li className="restaurant__menu-item" key={item.id}>
                      <MenuItem {...item} />
                      <div className="d-flex flex-column align-items-center">
                        <Button variant="circle" onClick={() => cartAPI.addItem(item)}>
                          <Icons name="plus" />
                        </Button>
                        <span className="font-weight-bold my-2">{count}</span>
                        {count > 0 ? (
                          <Button variant="circle" onClick={() => cartAPI.removeItem(item)}>
                            <Icons name="dash" />
                          </Button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </Placeholder>
      </div>
      <div className="fixed-bottom container bg-light shadow-lg rounded-top">
        <CartToast menuItems={cartItems} onCheckout={handleCheckout} />
      </div>
    </>
  );
}
