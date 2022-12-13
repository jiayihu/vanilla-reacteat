// First import CSS
import './ui/bootstrap.scss';
// Import after bootstrap
import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App/App';

const root = createRoot(document.getElementById('root'))

root.render(<App />);
