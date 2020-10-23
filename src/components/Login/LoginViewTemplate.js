import React from 'react';
import styled from 'styled-components';
import LoginView from './LoginView';
import axios from 'axios';
import socketIO from 'socket.io-client';
import * as userActions from './../../store/modules/users'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as controller from './Controller';
class LoginViewTemplate extends React.Component{
    constructor(props){
        super(props);
    }
    state={
        mode:false
      }
    
      changeMode = () =>{
        const {userActions} = this.props;

        userActions.SetMode();
        // this.setState({
        //   mode : !this.state.mode
        // })
      }

      Login = async (e) => {
        e.preventDefault();
        const {userActions,userConfig} = this.props;
        const {id,pw} = userConfig;
        var result = await controller.Login(id,pw);
        if(result.result.length > 0){
          sessionStorage.setItem('id',id);
          userActions.LoginUser();
          console.log("success login")
        }else{
          console.log(result.data);
          console.log("failed login")
        }
      }
    
      updateUser = async (e)=>{
        e.preventDefault();
        
        const {userConfig,userActions} = this.props;
        const {id,pw} = userConfig;
        if(id == '' || pw == '')
          return;
        
        var result = await controller.CreateAccount(id,pw);
          
        if(result["code"]){
          userActions.CreateUser();
        }
      }
      handleChange = (event)=>{
        const {userActions} = this.props;
        userActions.ChangeUserConfig({id:event.target.id,value:event.target.value});
      }

    render(){
        const {mode,userConfig} = this.props;
        const {handleChange,updateUser,Login,changeMode} = this;
        return(
            <LoginView
                config={userConfig}
                mode={mode} 
                changeEvent={handleChange}
                updateUser={updateUser}
                Login={Login}
                changeMode={changeMode}/>
        )
    }
}

export default connect(
  (state)=>({
    isLogin:state.users.get('isLogin'),
    userConfig:state.users.get('userConfig'),
    socket:state.users.get('socket'),
    mode:state.users.get('mode')
  }),
  (dispatch)=>({
    userActions : bindActionCreators(userActions,dispatch)})
)(LoginViewTemplate);