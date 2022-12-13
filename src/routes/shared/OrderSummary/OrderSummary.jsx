import './OrderSummary.css';
import React from 'react';
import PropTypes from 'prop-types';
import { toCurrency } from '../../../utils';

export function OrderSummary(props) {
  const sumPrices = props.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <ul className="order-summary">
      <li className="order-summary__item pt-3 border-top">
        <span>Items total</span>
        <span className="font-weight-bold">{toCurrency(sumPrices)}</span>
      </li>
      <li className="order-summary__item">
        <span>Delivery charge</span>
        <span className="font-weight-bold">{toCurrency(props.deliveryCharge)}</span>
      </li>
      <li className="order-summary__item h4 border-top border-bottom py-3">
        <span className="font-weight-bold">Total</span>
        <span className="font-weight-bold">{toCurrency(sumPrices + props.deliveryCharge)}</span>
      </li>
    </ul>
  );
}

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['food', 'drink']).isRequired,
      kcal: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  deliveryCharge: PropTypes.number.isRequired,
};
