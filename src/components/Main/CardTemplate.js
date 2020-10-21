import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultImg from './../../img/default.jpg'
import windowResize from './../../hooks/useWindowResize'
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
                var url = "";
                for(var i = 0 ; i < item.card_img.data.length;i++){
                    url+= String.fromCharCode(item.card_img.data[i]) ;
                }
                item.card_img = url;
            } catch (error) {
                console.log(error);
            }
            return (
                <CardItem>
                    <div className="ItemHeader">
                        {item.user_id}
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