    import React from 'react';
    import styled,{css} from 'styled-components';

    const Login_View = styled.div`
    width:300px;

    `;

    const Login_form = css`
        text-align:left;
        border-radius:2em;
        border:1px solid;
        width:90%;
        color:${props=>props.color};
        margin-top:${props=>props.margin_top}px;
        height:30px;
        padding:0 5px 0 10px;
        background-color:${props=>props.back_color};
        &:focus{
            outline:none;
        }
    `;

    const Login_input = styled.input`
        ${Login_form}
    `;

    const Login_btn = styled.input`
        ${Login_form}
        text-align:center;
        position:relative;
        margin-bottom:15px;
        cursor:pointer;
    `;
    const LoginView = ({config,mode,changeEvent,updateUser,Login,changeMode}) =>{
    return (
    <Login_View>
        
        <form onSubmit={mode ? updateUser :Login}>
            <Login_input margin_top="10" color="black" type="text" placeholder="id" id="id" onChange={changeEvent} />
            <Login_input margin_top="10" color="black" type="password" placeholder="pw" id="pw" onChange={changeEvent} />
            {
                mode ?
                    <Login_btn margin_top="15" color="white" back_color="#04aaff" type="submit" value="Create Account"/>
                :
                    <Login_btn margin_top="15" color="white" back_color="#04aaff"  type="submit" value="Sign in"/>

            }
        </form>
        

        <hr />
        <div onClick={changeMode} style={{textDecoration:'underline',cursor:"pointer"}}>
            {mode ? 'Sign in' : 'Create Account'}
        </div>
    </Login_View>
    )
    }

    export default LoginView;