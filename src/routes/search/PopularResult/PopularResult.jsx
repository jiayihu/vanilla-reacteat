import './PopularResult.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ReviewStars } from '../../../ui/ReviewStars/ReviewStars';
import { Link } from 'react-router-dom';

export const PopularResult = React.memo(function PopularResult(props) {
  const { restaurant } = props;

  return (
    <div className="popular-result">
      <Link to={`/restaurants/${restaurant.id}`}>
        <img className="popular-result__cover" src={restaurant.cover} alt={restaurant.name} />
      </Link>
      <div className="p-3">
        <h3 className="popular-result__name">
          <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
        </h3>
        <div className="">
          <ReviewStars value={restaurant.reviews.average} />({restaurant.reviews.count} reviews)
        </div>
      </div>
    </div>
  );
});

PopularResult.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    reviews: PropTypes.shape({
      average: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
