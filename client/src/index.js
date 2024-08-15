import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import store from './app/store';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <Toaster />
            <App />
        </Router>
    </Provider>
);