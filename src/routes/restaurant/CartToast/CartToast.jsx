import './CartToast.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../ui/Button/Button';
import { Icons } from '../../../ui/Icons/Icons';
import { toCurrency } from '../../../utils';

export function CartToast(props) {
  const sumPrices = props.menuItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <div>
        <div>Price</div>
        <div className="cart__sum">{toCurrency(sumPrices)}</div>
      </div>
      <div>
        <Button className="cart__checkout" disabled={sumPrices === 0} onClick={props.onCheckout}>
          <Icons name="basket2-fill" className="align-text-bottom" />
          <span className="ml-3">Go to Payment</span>
        </Button>
      </div>
    </div>
  );
}

CartToast.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['food', 'drink']).isRequired,
      kcal: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onCheckout: PropTypes.func.isRequired,
};
