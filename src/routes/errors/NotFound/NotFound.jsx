import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import illustrationPng from './illustration.png';

export function NotFound() {
  const location = useLocation();

  return (
    <div className="container text-center">
      <img src={illustrationPng} alt="Not found" />
      <div className="h4">Cannot found the page "{location.pathname}"</div>
      <div>
        <Link to="/" className="btn btn-primary">
          Go to home
        </Link>{' '}
      </div>
    </div>
  );
}
