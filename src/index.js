import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Components/Movie.css'
import App from './Components/App/App.js';
import MovieContainer from './Components/MovieContainer.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MovieContainer />, document.getElementById('root'));
registerServiceWorker();
