import React from 'react';
import LoginView from './components/Login/LoginViewTemplate'
import MainView from './components/Main/MainViewTemplate'

import styled from 'styled-components'
class App extends React.Component {

  state ={
    isLogin : false,
    userList:[]
  }
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
    if(localStorage.getItem('id') != null){
      this.switchLogin(true);
    }
  }
  
  switchLogin=(value)=>{
    this.setState({
      isLogin :value
    })
    if(!value){
      localStorage.removeItem('id');
    }
  }

  render(){
    const {isLogin} = this.state;
    const {switchLogin} = this;

    const BodyContainer = styled.div`
      text-align:center;
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      height:100%;
      margin-top:50px;
    `;
    return (
      <BodyContainer>
      {
        isLogin ?
          <MainView toggleSwitch={switchLogin}/>
          :
          <LoginView toggleSwitch={switchLogin}/>
      }
      
      </BodyContainer>
      
    );
  }
  
}

export default App;
