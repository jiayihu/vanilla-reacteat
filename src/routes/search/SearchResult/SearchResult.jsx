import './SearchResult.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ReviewStars } from '../../../ui/ReviewStars/ReviewStars';
import { Link } from 'react-router-dom';
import { Icons } from '../../../ui/Icons/Icons';
import { toCurrency } from '../../../utils';

export function SearchResult(props) {
  const { restaurant } = props;

  return (
    <div className="search-result">
      <Link to={`/restaurants/${restaurant.id}`}>
        <img
          className="search-result__cover"
          src="https://source.unsplash.com/collection/9840313/400x400"
          alt={restaurant.name}
        />
      </Link>
      <div className="search-result__info">
        <h3 className="h4 font-weight-normal mb-0">
          <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
        </h3>
        <div>
          <ReviewStars value={restaurant.reviews.average} />({restaurant.reviews.count} reviews)
        </div>
        <div>
          <Icons name="truck" className="mr-2" />
          Delivery charge: {toCurrency(restaurant.deliveryCharge)}
        </div>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    deliveryCharge: PropTypes.number.isRequired,
    reviews: PropTypes.shape({
      average: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
