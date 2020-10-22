import React from 'react';
import styled from 'styled-components';
import LoginView from './LoginView';
import axios from 'axios';
class LoginViewTemplate extends React.Component{
    constructor(props){
        super(props);
    }
    state={
        mode:false,
        userList:[],
        userConfig:{
          id:'',
          pw:''
        }
      }
    
      changeMode = () =>{
        this.setState({
          mode : !this.state.mode
        })
      }
      postLogin = async (id,pw)=>{
        
      }
      Login = (e) => {
        e.preventDefault();
        const {userList,userConfig} = this.state;
        const {id,pw} = userConfig;
        const item = userList.find(item=>item.id == id);
        axios.post('http://localhost:4000/user/login',{id:id,pw:pw}).then(res=>{
            if(res.data.err) {
              console.log(res.data.err);
              return;
            }
            if(res.data.result.length > 0){
              sessionStorage.setItem('id',id);
              //localStorage.setItem('id',id);
              this.setState({
                userConfig:{
                  id:'',
                  pw:''
                }
              })
              this.props.toggleSwitch(true);
              console.log("success login")
            }  else{
              console.log(res.data);
              console.log("failed login")
            }
        });
      }
    
      updateUser = (e)=>{
        e.preventDefault();
        
        const {userList,userConfig} = this.state;
        const {id,pw} = userConfig;
        if(id == '' || pw == '')
          return;
          
          axios.post('http://localhost:4000/user/createAccount',{id:id,pw:pw})
          .then(res=>{
            if(res.data.err){
              console.log(res.data.err);
              return;
            }
            this.setState({
              userConfig:{
                id:'',
                pw:''
              },
              mode:!this.state.mode
            })
            console.log("success Sign in");
          }).catch(err=>{
            console.log(err);
          })
        
      }
      handleChange = (event)=>{
        this.setState({
          userConfig:{
            ...this.state.userConfig,
            [event.target.id]:event.target.value
          }
        })
      }

    render(){
        const {mode,userConfig} = this.state;
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

export default LoginViewTemplate;