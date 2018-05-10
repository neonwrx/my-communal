import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
const persistor = persistStore(store);

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyC5BRuq5l9kfyN5K2nee38Do1JnQmonVTU',
      authDomain: 'my-communal.firebaseapp.com',
      databaseURL: 'https://my-communal.firebaseio.com',
      projectId: 'my-communal',
      storageBucket: '',
      messagingSenderId: '281294444858'
    };

    firebase.initializeApp(config);
  }


  render() {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
