import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale/ru_RU';
import 'antd/dist/antd.min.css';

import { store } from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <ConfigProvider locale={ruRu}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </ConfigProvider>
);
