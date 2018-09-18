import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
registerServiceWorker();
