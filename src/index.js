import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './assets/js/App';
import registerServiceWorker from './assets/js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
