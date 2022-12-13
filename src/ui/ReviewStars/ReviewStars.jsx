import './ReviewStars.css';
import React from 'react';
import PropTypes from 'prop-types';

export function ReviewStars(props) {
  const count = Math.min(5, Math.round(props.value));
  const solidStars = new Array(count)
    .fill(null)
    .map((_, index) => (
      <span className="review-stars__star review-stars__star--solid" key={index}></span>
    ));
  const emptyStars = new Array(5 - count)
    .fill(null)
    .map((_, index) => <span className="review-stars__star" key={index}></span>);

  return (
    <span className="review-stars">
      {solidStars}
      {emptyStars}
      <span className="font-weight-bold mx-1">{props.value}</span>
    </span>
  );
}

ReviewStars.propTypes = {
  value: PropTypes.number.isRequired,
};
