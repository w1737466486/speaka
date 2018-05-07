import React, { Component } from 'react';
import Home from '@/components/Home';
import Kind from '@/components/Kind';
import User from '@/components/User';
import {Switch,Route,Redirect,NavLink} from 'react-router-dom'
class App extends Component {
    state = {

    };

    render() {
    return (
        <div className="App">
            <div className="container">
                <Switch>
                    <Route path="/home" component={Home}/>
                    
                    <Route path="/kind" component={Kind}/>
                    <Route path="/user" component={User}/>
                    <Redirect to={{pathname:"/home"}}/>
                </Switch>
            </div>
            <footer>
                <ul>
                    <li>
                        <NavLink to="/home" activeClassName="active">
                            <span className="iconfont icon-ziyuan"></span>
                            <p>首页</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/kind">
                            <span className="iconfont icon-fenlei"></span>
                            <p>班级</p>
                        </NavLink>
                    </li>
                    {/*<li>
                        <NavLink to="/cart">
                            <span className="iconfont icon-gouwuche"></span>
                            <p>购物车</p>
                        </NavLink>

                    </li>*/}
                    <li>
                        <NavLink to="/user">
                            <span className="iconfont icon-ziyuan1"></span>
                            <p>我的</p>
                        </NavLink>
                    </li>

                </ul>
            </footer>
        </div>
    );
  }
}

export default App;
