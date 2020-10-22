import React from 'react';
import styled from 'styled-components';
import MainView from './MainView'
import axios from 'axios';
import {getCardList,insertCardList,removeCard} from './Controller';
class MainViewTemplate extends React.Component{
    state={
        typingText:'',
        img:'',
        textList:[]
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.LoadCardList();
    } 

    LoadCardList = async () => {
        const result = await getCardList();
        this.setState({
            textList:result
        })
    }

    uploadText = async () =>{
        const {typingText,textList} = this.state;
        if(typingText == "" || typingText == undefined ||typingText == null){
            return;
        }
        var result = await insertCardList(this.state.img,this.state.typingText,sessionStorage.getItem('id'));

        if(result["success"]){
            this.LoadCardList();
            this.setState({
                ...this.state,
                typingText:'',
                img:''
            });
        }
    }

    uploadImg = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () =>{
            this.setState({
                ...this.state,
                img:reader.result
            });
        }
        
    }
    handleRemoveCard = async (id) =>{
        var result = await removeCard(id);

        if(result["success"]){
            this.LoadCardList();
        }
    }
    handleChangeText = (e)=>{
        this.setState({
            typingText:e.target.value
        });
    }
    render(){
        const {typingText,textList,img} = this.state;
        const {uploadText,handleChangeText,uploadImg,handleRemoveCard} = this;
        const {toggleSwitch} = this.props;
        return (
            <div>
                <input type="button" value="logOut" onClick ={()=>{toggleSwitch(false)}} />
                <MainView 
                    onChange = {handleChangeText}
                    uploadText = {uploadText}
                    typingText = {typingText}
                    cardList = {textList}
                    uploadImg = {uploadImg}
                    removeCard = {handleRemoveCard}
                    img ={img}/>
            </div>
            
        )
    }
}

export default MainViewTemplate;