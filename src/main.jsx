import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './style.css'
import { AppProvider } from './context/contexts.jsx';
// import your context provider if you're using one
// import { StorecontextProvider } from './context/Storecontext'; // optional

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </AppProvider>
  
);
