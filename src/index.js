import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; //? +++

import { PersistGate } from 'redux-persist/integration/react' //? with redux-persist
import { persistor } from 'redux/store'; //? +++ persistor - with redux-persist

import { store } from 'redux/store'; //? +++ 

import { App } from 'components/App/App';

import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
