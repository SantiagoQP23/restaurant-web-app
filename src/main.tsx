import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'nprogress/nprogress.css';

import App from './App';

import { SocketProvider } from './context';
import { store } from './redux';
import { queryClient } from './api/query-client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
