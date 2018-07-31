import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css'; 
import Routing from './Routing';

ReactDOM.render(<Routing />, document.getElementById('root'));
registerServiceWorker();
