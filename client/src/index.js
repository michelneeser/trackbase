import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from 'react-global-configuration';

config.set({ apiBaseUrl: 'http://localhost:5000/api/stats' });

ReactDOM.render(<App />, document.getElementById('root'));