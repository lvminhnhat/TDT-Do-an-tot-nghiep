// index.js
import { registerRootComponent } from 'expo';

import { AppRegistry, Platform } from 'react-native';
import App from './App/App'; // Đảm bảo đường dẫn đúng tới `App.js`


AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}
