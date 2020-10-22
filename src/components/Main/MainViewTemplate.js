import React from 'react';
import styled from 'styled-components';
import MainView from './MainView'
import axios from 'axios';
import {getCardList,insertCardList,removeCard} from './Controller';
import * as userActions from './../../store/modules/users';
import * as cardActions from './../../store/modules/card';

import socketIO from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
const socket = socketIO.connect('http://localhost:4000')
class MainViewTemplate extends React.Component{
 
    state={
        socket:null
    }
    constructor(props){
        super(props);
        this.LoadCardList();
    }

    componentDidMount(){
        //this.LoadCardList();
        if(socket !== null){
            socket.on('cardUpdate',(id)=>{
                if(id !== sessionStorage.getItem('id')){
                    this.LoadCardList();
                }
                
            })
        }else{
            console.log("tseset")
            
        }
    } 

    LoadCardList = async () => {
        console.log("etste'");
        const result = await getCardList();
        const {cardAction} = this.props;
        cardAction.CardList(result);
    }

    uploadText = async () =>{
        const {typingText} = this.props;
        if(typingText == "" || typingText == undefined ||typingText == null){
            return;
        }
        var result = await insertCardList(this.props.img,this.props.typingText,sessionStorage.getItem('id'));

        if(result["success"]){

            //this.LoadCardList();
            this.props.cardAction.InsertCard();
            socket.emit('cardUpdate',sessionStorage.getItem('id'));
        }
    }

    uploadImg = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () =>{
            this.props.cardAction.SetImgUrl(reader.result)
        }
        
    }
    handleRemoveCard = async (id,idx) =>{
        var result = await removeCard(id);

        if(result["success"]){
            this.props.cardAction.RemoveCard(id);
            //this.LoadCardList();
        }
    }
    handleChangeText = (e)=>{
        const {cardAction} = this.props;
        cardAction.TypingText(e.target.value);
    }
    render(){
        const {img,typingText,cardList,toggleSwitch} = this.props;
        const {uploadText,handleChangeText,uploadImg,handleRemoveCard} = this;
        return (
            <div>
                <input type="button" value="logOut" onClick ={()=>{toggleSwitch(false)}} />
                
                        <MainView   
                        onChange = {handleChangeText}
                        uploadText = {uploadText}
                        cardList = {cardList}
                        uploadImg = {uploadImg}
                        removeCard = {handleRemoveCard}
                        typingText = {typingText}
                        img ={img}/>
                
            </div>
            
        )
    }
}

export default connect(
    (state)=>({
      socket:state.users.get('socket'),
      typingText:state.card.get('typingText'),
      img:state.card.get('img'),
      cardList:state.card.get('cardList')
    }),
    (dispatch)=>({
      userAction : bindActionCreators(userActions,dispatch),
      cardAction : bindActionCreators(cardActions,dispatch)
    })
  )(MainViewTemplate);