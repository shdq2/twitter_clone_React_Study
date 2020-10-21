import React from 'react';
import styled,{css} from 'styled-components';
import CardTemplate from './CardTemplate';

const inputField = css`
    &:focus{
        outline:none;
        
    }
    height:45px;    
    border:1px solid #04aaff;
`;

const UploadBtn = styled.input`
    width:45px;
    border-radius:50%;
    position:absolute;
    right:0;
    top:50%;
    transform:translateY(-50%);
    padding:0;
    background-color:#04aaff;
    ${inputField}
    color:white;
`;

const TextFiled = styled.input`
    width:380px;
    border-radius:50px;
    padding:0px 50px 0px 10px;
    ${inputField}
`;
const TextDiv = styled.div`
    position:relative;
    width:450px;
    left:50%;
    transform:translateX(-50%);
`; 

const Preview = styled.img`

    height:100px;
    width:100px;
    position:relative;
    left:50%;
    transform:translate(-50%);
    display:${props=>props.src == '' ? 'none' : 'block'}
`;

const MainView = ({onChange,uploadText,typingText,cardList,uploadImg,img}) =>{
    return (
        <div>
            <TextDiv>            
                <div style={{position:'relative'}}>
                    <TextFiled type="text" value={typingText} onChange={onChange} /> 
                    <UploadBtn type="button" onClick={uploadText} value="->"/>
                </div>
                
                <label style={{cursor:"pointer"}} for="file" >+ Add Image</label>
                <input type="file" id="file" style={{display:'none'}} onChange={uploadImg} accept="image/*"/>
                <br />
                <Preview src={img} />            
            </TextDiv>
                <hr />
            <CardTemplate cardList={cardList} />
        </div>
        
    )
}   

export default MainView;