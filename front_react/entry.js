import React from 'react';

import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRedirect,IndexRoute} from 'react-router'
import Calendar from './components/calendar'

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return (
            <div>
               <Calendar/>
            </div>
        )
    }
}
ReactDOM.render(<App/>,document.getElementById('box'))