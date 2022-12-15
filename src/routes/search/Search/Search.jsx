import './Search.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setAddress } from '../../../redux/address/address.actions';
import { getPopularResults, getSearchResults } from '../../../services/search.service';
import { Placeholder } from '../../../ui/Placeholder/Placeholder';
import { PopularResult } from '../PopularResult/PopularResult';
import { SearchFilters } from '../SearchFilters/SearchFilters';
import { SearchResult } from '../SearchResult/SearchResult';

const categories = ['burgers', 'salad', 'pizza', 'pasta', 'kebab', 'sushi', 'chinese'];

export function Search() {
  const [searchResults, setSearchResults] = useState(null);
  const [popularResults, setPopularResults] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();

  const location = useLocation();
  const address = new URLSearchParams(location.search).get('address');

  useEffect(() => {
    if (address) {
      getSearchResults({ address }).then((results) => setSearchResults(results));
      getPopularResults({ address }).then((results) => setPopularResults(results));

      dispatch(setAddress(address));
    }
  }, [address, dispatch]);

  const handleFilter = useCallback(
    (category) => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((x) => x !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    },
    [selectedCategories],
  );

  const data = useMemo(
    () =>
      searchResults !== null && popularResults !== null ? { searchResults, popularResults } : null,
    [searchResults, popularResults],
  );

  if (!address) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container pt-3 mb-3">
      <Placeholder data={data}>
        {({ searchResults, popularResults }) => (
          <>
            <h2 className="h5 text-uppercase">Popular</h2>
            <div className="search__popular">
              {popularResults.map((restaurant) => (
                <PopularResult restaurant={restaurant} key={restaurant.name} />
              ))}
            </div>

            <h2 className="h5 text-uppercase mt-3 mb-0">Nearby</h2>
            <SearchFilters
              categories={categories}
              selected={selectedCategories}
              onFilter={handleFilter}
            />
            <div className="search__nearby">
              {searchResults
                .filter((result) =>
                  selectedCategories.length > 0
                    ? result.categories.some((x) => selectedCategories.includes(x))
                    : true,
                )
                .map((restaurant) => (
                  <SearchResult restaurant={restaurant} key={restaurant.name} />
                ))}
            </div>
          </>
        )}
      </Placeholder>
    </div>
  );
}
