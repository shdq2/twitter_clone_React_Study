import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
class CardTemplate extends React.Component{
// Hook
    
    constructor(props){
        super(props);
        
    }
    shouldComponentUpdate(nextProps,state){
        return nextProps.cardList != this.props.cardList;
    }
    render(){
        const CardItem = styled.div`
            border:1px solid;
            border-radius:10px;
            margin:15px 5px 0 5px;
            
            display:inline-block;
            text-align:left;
            width:calc( 100% - 20px );
            vertical-align:top;
            
            & .ItemHeader{
                padding-left:10px;
                margin-top:5px;
                color:#848484aa
            }

            & .ItemBody{
                word-break:break-all;
                    
                padding-left:20px;
                padding-right:20px;
                margin-bottom:10px;

                & img {
                    width:100%;
                    border-radius:10px;
                    margin-top:10px;
                    margin-bottom:10px;
                }
            }

        `

        const Template = styled.div`
            max-width:1000px;
            @media (max-width:600px){
                width:${props=>props.width}px;
            }

            @media (min-width: 601px){
                width:600px;
            }

            margin-top:20px;
            
        `

        const ItemImg = styled.img`
            display:${props=>props.src == '' ? 'none':'block'};
            max-width:100%;
        `
            
        const Card = ({item})=>{
            try {
                item.card_img = new Buffer(item.card_img.data,'binary').toString('utf-8')
            } catch (error) {
                console.log(error);
            }
            return (
                <CardItem>
                    <div className="ItemHeader">
                        
                        <div style={{width:'100%',position:'relative'}}>
                            {item.user_id}
                            {
                                item.user_id === sessionStorage.getItem('id')
                                ?
                                    <img style={{position:'absolute',right:0,paddingRight:'10px',cursor:'pointer'}} onClick={()=>this.props.removeCard(item.card_id)} src="https://img.icons8.com/small/16/000000/trash--v1.png"/>
                                :
                                    ''
                            }
                        
                        </div>                    
                    </div>
                    <div className="ItemBody">
                        {item.card_msg}
                        <ItemImg src={item.card_img} />
                    </div>
                </CardItem>
            )
        }

        const CardList = ()=> this.props.cardList.map((item,index) =>{
            return <Card item={item} key={index} />
        })
        return (
            <Template >
                <CardList />
            </Template>
        )
    }
    
}

export default CardTemplate;