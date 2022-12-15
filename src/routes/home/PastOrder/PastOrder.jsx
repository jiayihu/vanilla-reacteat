import './PastOrder.css';

import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurant } from '../../../services/restaurant.service';
import { Image } from '../../../ui/Image/Image';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';

export function PastOrder(props) {
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurant(props.restaurantId).then((restaurant) => setRestaurant(restaurant));
  }, [props.restaurantId]);

  const handleClick = useCallback(() => navigate(`/orders/${props.id}`), [navigate, props.id]);

  return (
    <Placeholder data={restaurant}>
      {(restaurant) => {
        const uniqueNames = Array.from(
          props.items.reduce((set, item) => set.add(item.name), new Set()),
        );

        return (
          <div className="past-order" onClick={handleClick}>
            <Image
              className="past-order__cover"
              src={restaurant.cover}
              alt={restaurant.name}
              placeholderWidth={140}
              placeholderHeight={80}
            />
            <div className="h5 my-2">{restaurant.name}</div>
            <div>{new Date(props.date).toLocaleDateString()}</div>
            <div>{uniqueNames.join(', ')}</div>
          </div>
        );
      }}
    </Placeholder>
  );
}

PastOrder.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
