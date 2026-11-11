import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './editorial.css';
import './landing-refinement.css';
import './gallery-timeline-polish.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
