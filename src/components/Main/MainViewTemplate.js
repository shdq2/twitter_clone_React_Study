import React from 'react';
import styled from 'styled-components';
import MainView from './MainView'
import axios from 'axios';

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
        this.getCardList();
    }
    getCardList = ()=>{
        axios.get('http://localhost:4000/card/cardList').then(res=>{
            const data = res.data;
            if(data.err){
                console.log(data.err);
                return;
            }
            
            this.setState({
                textList:data.result
            })
        })
    }

    insertCardList = (img,msg,user_id)=>{
        axios.post('http://localhost:4000/card/cardInsert',{img:img,msg:msg,user_id:user_id}).then(res=>{
            const data = res.data;
            if(data.err){
                console.log(data.err);
                return;
            }
            
            this.setState({
                ...this.state,
                typingText:'',
                img:''
            });

            this.getCardList();
        })
    }
    uploadText = () =>{
        const {typingText,textList} = this.state;
        if(typingText == "" || typingText == undefined ||typingText == null){
            return;
        }
        this.insertCardList(this.state.img,this.state.typingText,localStorage.getItem('id'));
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
    handleChangeText = (e)=>{
        this.setState({
            typingText:e.target.value
        });
    }
    render(){
        const {typingText,textList,img} = this.state;
        const {uploadText,handleChangeText,uploadImg} = this;
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
                    img ={img}/>
            </div>
            
        )
    }
}

export default MainViewTemplate;