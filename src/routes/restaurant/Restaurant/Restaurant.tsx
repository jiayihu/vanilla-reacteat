import './Restaurant.css';

import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addItem, removeItem, setCartRestaurant } from '../../../redux/cart/cart.actions';
import { selectCartItems } from '../../../redux/cart/cart.reducer';
import { getRestaurant } from '../../../services/restaurant.service';
import { Button } from '../../../ui/Button/Button';
import { Icons } from '../../../ui/Icons/Icons';
import { Image } from '../../../ui/Image/Image';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { CartToast } from '../CartToast/CartToast';
import { MenuItem } from '../MenuItem/MenuItem';

export function Restaurant() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Context -> store -> store.dispatch
  const cartItems = useSelector(selectCartItems); // useCart(([cart]) => cart.items)

  const params = useParams();
  const { id: restaurantId } = params;

  const {
    isLoading,
    error,
    data: restaurant,
  } = useQuery(
    ['restaurant', restaurantId],
    () => (restaurantId ? getRestaurant(restaurantId) : undefined),
    {
      enabled: !!restaurantId,
      onSuccess: (restaurant) => restaurant && dispatch(setCartRestaurant(restaurant)),
    },
  );

  // useEffect(() => {
  //   restaurant && dispatch(setCartRestaurant(restaurant))
  // }, [restaurant, dispatch])

  const handleCheckout = useCallback(() => navigate('/checkout'), [navigate]);

  if (isLoading) {
    console.log({ isLoading, error, restaurant });
    return <div>Loading...</div>;
  }

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
                        <Button variant="circle" onClick={() => dispatch(addItem(item))}>
                          <Icons name="plus" />
                        </Button>
                        <span className="font-weight-bold my-2">{count}</span>
                        {count > 0 ? (
                          <Button variant="circle" onClick={() => dispatch(removeItem(item))}>
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
