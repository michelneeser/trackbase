import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import config from 'react-global-configuration';
import moment from 'moment';
import 'moment/locale/de';

function initConfig() {
  config.set({ apiBaseUrl: 'http://localhost:5000/api' });
}

function setLocale() {
  let localeToSet = 'en';
  if (window.navigator.language) {
    const userLang = window.navigator.language.slice(0, 2);
    if (userLang === 'de') {
      localeToSet = userLang;
    }
  }
  moment.locale(localeToSet);
}

initConfig();
setLocale();

ReactDOM.render(<App />, document.getElementById('root'));