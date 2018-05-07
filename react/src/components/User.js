import React, { Component } from 'react';
import $ from 'jquery'

class Model extends Component {
  
  state = {
    
  };
  go_user(){
  	console.log('111')
  	this.props.history.push('/Calendar')
  }
  render() {
    
    return (
      <div className="box">
        <header>
            用户中心
        </header>
        <div className = "content">
            我的内容
            <button onClick={this.go_user.bind(this)}>
                我的课程表
            </button>
        </div>
      </div>
    )
  }
   
  componentDidMount() {
    
  }
  
}



export default Model;