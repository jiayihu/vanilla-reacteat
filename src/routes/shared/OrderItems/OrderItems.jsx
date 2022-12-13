import React from 'react';
import PropTypes from 'prop-types';
import { toCurrency } from '../../../utils';

export function OrderItems(props) {
  const uniqueItemIds = new Set();
  const itemById = {};
  const countByItem = {};

  props.items.forEach((item) => {
    uniqueItemIds.add(item.id);
    itemById[item.id] = item;
    countByItem[item.id] = (countByItem[item.id] || 0) + 1;
  });

  const uniqueItems = Array.from(uniqueItemIds).map((itemId) => itemById[itemId]);
  return (
    <div>
      {uniqueItems.map((item) => {
        const count = countByItem[item.id];

        return (
          <div className="checkout-item" key={item.id}>
            <div>
              <span className="checkout-item__count">{count}</span>
            </div>
            <div>
              <div className="font-weight-bold">{item.name}</div>
              <div>
                {item.weight} {item.type === 'food' ? 'g' : 'ml'}
              </div>
            </div>
            <div>{toCurrency(item.price * count)}</div>
          </div>
        );
      })}
    </div>
  );
}

OrderItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['food', 'drink']).isRequired,
      kcal: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ),
};
