import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Correct import for BrowserRouter
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
