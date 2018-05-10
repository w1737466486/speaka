import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRedirect,IndexRoute} from 'react-router'
import Calendar from './components/calendar'
import Map from './components/map'
class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return (
            <div>
               {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(<Router history={hashHistory}>
	<Route path="/" component={App}>
		<IndexRedirect to="/map" />
		
		<Route path="/map" component={Map}>
		</Route>
		
		<Route path="/calendar" component={Calendar}></Route>
	</Route>
</Router>,document.getElementById('box'))