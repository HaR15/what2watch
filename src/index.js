import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Movie.css';
import PageContainer from './containers/PageContainer/PageContainer.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PageContainer />, document.getElementById('root'));
registerServiceWorker();
