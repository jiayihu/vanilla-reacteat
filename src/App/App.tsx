import './App.css';

import React, { ErrorInfo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Checkout } from '../routes/checkout/Checkout/Checkout';
import { ErrorBoundary } from '../routes/errors/ErrorBoundary/ErrorBoundary';
import { NotFound } from '../routes/errors/NotFound/NotFound';
import { Home } from '../routes/home/Home/Home';
import { Order } from '../routes/orders/Order/Order';
import { Restaurant } from '../routes/restaurant/Restaurant/Restaurant';
import { Search } from '../routes/search/Search/Search';
import { AddressProvider } from '../routes/shared/cart/address-context';
import { CartProvider } from '../routes/shared/cart/cart-context';

export class App extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <ErrorBoundary />;

    return (
      <Router>
        <AddressProvider>
          <CartProvider>
            <div className="app">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path="restaurants/:id" element={<Restaurant />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="orders/:id" element={<Order />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </CartProvider>
        </AddressProvider>
      </Router>
    );
  }
}
