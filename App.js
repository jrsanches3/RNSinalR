import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';

import { View, Alert, YellowBox } from 'react-native';

// redux library 
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// redux scope
import index from './src/store/reducers/index';

// navigation
import useNavigation from './src/navigation/useNavigation';

// socket
import WebSocketSignalR from './src/utilities/WebSocketSignalR'

// utils
YellowBox.ignoreWarnings(['Remote debugger']);


/**
 * @global 
 * @return {redux creation}
 */
const middlewares = [];
middlewares.push(thunk);
if (__DEV__) {
  middlewares.push(logger);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  index,
  composeEnhancers(applyMiddleware(...middlewares)),
);

const App = () => {
  const [socketConnectionReady, setSocketConnectionReady] = useState(false)

  /**
   * @returns {establishes a connection with SignalR to receive events}
   */
  useEffect(() => {
    if (!socketConnectionReady) {
      WebSocketSignalR.initSocketConnection(() => {
        setSocketConnectionReady(true)
      })
    }
  }, [])

  /**
   * @returns {creating navigation}
   */
  const Navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {socketConnectionReady && (
        useNavigation()
      )}
    </View>
  );
};

export default App;
