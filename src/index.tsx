import './styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { CustomProvider } from 'rsuite';
import { store } from './data/store';
import locales from './locales';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { enGB } from 'rsuite/esm/locales';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <IntlProvider locale="en" messages={locales.en}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CustomProvider locale={enGB}>
            <App />
          </CustomProvider>
        </Provider>
      </QueryClientProvider>
    </IntlProvider>
  </BrowserRouter>
);
