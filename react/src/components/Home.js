import React, { Component } from 'react';
import homeData from '@/api/homeData.js';
import {Link} from 'react-router-dom'
class Model extends Component {
  state = {
      goodlist:[]
  };
  go_user(){
      console.log(this)
      this.props.history.push("/user")
      /*this.props.history.push({
          pathname:"/user"
      })*/

  }
  render() {
    
      return (
          <div className="box">
              <header>
                        首页头部
              </header>
              <div className = "content">
                       首页内容
                  <button onClick={this.go_user.bind(this)}>
                            去用户中心
                  </button>
                  <ul>
                      {
                          this.state.goodlist.map((item,index)=>{
                              return (
                                  <li key={item.tradeItemId}>
                                      <Link to={"/detail/"+item.tradeItemId}>
                                          <img src={item.img} alt="" style={{width:60}}/>
                                          <p>{item.title}</p>
                                          <p>{item.tradeItemId}</p>
                                      </Link>
                                  </li>
                              )
                          })
                      }
                  </ul>
              </div>
          </div>
      )
  }
  
  componentDidMount() {
      homeData.goodsList((data)=>{
          console.log(data);
          this.setState({
              goodlist:data
          })
      })
  }
  
}

export default Model;