import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import modulea from './component/modulea/modulea';
import moduleb from './component/moduleb/moduleb';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={App}/>
            <Route path="/a" component={modulea}/>
            <Route path="/b" component={moduleb}/>
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
