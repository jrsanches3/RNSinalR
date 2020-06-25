/**
 * @format
 */

// GLOBAL UTILITIES
import React from 'react';

import { AppRegistry } from 'react-native';
import App, { store } from './App';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';

const Main = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Main);
