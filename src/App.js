import React from 'react';
import LoginView from './components/Login/LoginViewTemplate'
import MainView from './components/Main/MainViewTemplate'
import * as userActions from './store/modules/users';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends React.Component {

  state ={
    isLogin : false,
    userList:[],
    socket:null
  }
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
    if(sessionStorage.getItem('id') != null){
      this.switchLogin(true);
    }
  }
  
  switchLogin=(value)=>{
    if(value){
      this.props.userActions.LoginUser();
    }else{
      
      sessionStorage.removeItem('id');
      this.props.userActions.LogoutUser();
    }
  }

  render(){
    const {isLogin} = this.props;
    const {switchLogin,setSocket} = this;

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

export default connect(
  (state)=>({
    isLogin:state.users.get('isLogin')
  }),
  (dispatch)=>({
    userActions : bindActionCreators(userActions,dispatch)})
)(App);
