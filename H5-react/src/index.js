import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import './index.scss';

import App from '@/components/App';
import registerServiceWorker from '@/registerServiceWorker';
import Calendar from '@/components/Calendar';
ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/Calendar" component={ Calendar } />
            <Route path="/" component={ App }/>
        </Switch>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
