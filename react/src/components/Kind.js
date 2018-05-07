import React, { Component } from 'react';

class Model extends Component {
  
  state = {
    
  };
  
  render() {
    
    return (
      <div className="box">
        <header>
            班级头部（班级名称）
        </header>
        <div className = "content">
            聊天内容
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    
  }
  
}

export default Model;