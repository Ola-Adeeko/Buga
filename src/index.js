import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import {  ApolloProvider } from 'react-apollo'

import { store} from './redux/store';

import './index.css';
import App from './App';


const httpLink = createHttpLink({
  uri:'http://localhost:4000/'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache : cache
  });





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
  
  
   
  
);

