import './SearchFilters.css';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export function SearchFilters(props) {
  return (
    <div className="search-filters">
      {props.categories.map((category) => {
        const className = classnames('search-filters__option', {
          'search-filters__option--selected': props.selected.includes(category),
        });

        return (
          <button
            type="button"
            className={className}
            onClick={() => props.onFilter(category)}
            key={category}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

SearchFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilter: PropTypes.func.isRequired,
};
