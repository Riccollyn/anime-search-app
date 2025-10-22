import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/anime-search-app">
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);