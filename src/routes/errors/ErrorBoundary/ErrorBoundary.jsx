import React, { useCallback } from 'react';
import { Button } from '../../../ui/Button/Button';
import illustrationPng from './illustration.png';

export function ErrorBoundary() {
  const handleReload = useCallback(() => (window.location.href = '/'), []);

  return (
    <div className="container text-center">
      <img src={illustrationPng} alt="Error" />
      <div className="h5">Ooops there was an unexpected error</div>
      <div>
        <Button large block onClick={handleReload}>
          Reload the application
        </Button>{' '}
      </div>
    </div>
  );
}
