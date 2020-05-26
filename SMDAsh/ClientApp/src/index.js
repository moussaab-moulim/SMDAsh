import React from 'react';
import ReactDOM from 'react-dom';

import { Router,BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import '@fortawesome/fontawesome-free/js/all';

import './includes/bootstrap';
import './index.css';
import App from './App';
import configureStore from './redux/configureStore';

const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={hist}>
                <App />
            </Router>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
