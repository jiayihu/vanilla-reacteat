import './MenuItem.css';
import React from 'react';
import PropTypes from 'prop-types';
import { toCurrency } from '../../../utils';

export const MenuItem = React.memo(function MenuItem(props) {
  return (
    <div className="menu-item">
      <img
        className="menu-item__cover"
        src="https://source.unsplash.com/collection/251966/400x400"
        alt={props.name}
        width="56"
        height="56"
      />
      <div className="menu-item__info">
        <h4 className="menu-item__name">{props.name}</h4>
        <div className="menu-item__specs">
          {props.weight} {props.type === 'food' ? 'g' : 'ml'}
          <span className="mx-1">|</span>
          {props.kcal} kcal
        </div>
      </div>
      <div>
        <span className="menu-item__price">{toCurrency(props.price)}</span>
      </div>
    </div>
  );
});

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
  kcal: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
