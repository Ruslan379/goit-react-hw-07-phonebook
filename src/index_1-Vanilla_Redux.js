import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; //?

import store from 'redux/store'; //?

import { App } from 'components/App/App';

import './index.css';


//? +++++++++++++++++++++++++++++++++++++++
// import store from 'redux/store'; //?
// import { myAction, myAction_2 } from 'redux/actions'; //?

// console.log("store:", store); //?
// console.log("store.getState(): ", store.getState()); // { a: 15 }
// console.log("store.dispatch(myAction):", store.dispatch(myAction));
// store.dispatch(myAction(5));
// store.dispatch(myAction("Mango", "021-54-76"));
// store.dispatch(myAction_2);

//? +++++++++++++++++++++++++++++++++++++++


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
