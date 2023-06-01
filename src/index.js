import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import { UserProvider } from './context/usercontext';






const root = ReactDOM.createRoot
(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <UserProvider> 
  
    <App />
   
    </UserProvider>
   </BrowserRouter>
  
);


/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/usercontext';

const root = ReactDOM.createRoot
(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <UserProvider> 
    <App />
    </UserProvider>
   </BrowserRouter>
  
);*/
