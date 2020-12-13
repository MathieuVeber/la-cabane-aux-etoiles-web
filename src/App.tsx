import React from 'react';
import { Router } from 'react-router-dom';
import history from './history';
import AppLayout from './AppLayout';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppLayout />
      </Router>
    </Provider>
  );
}

export default App;
