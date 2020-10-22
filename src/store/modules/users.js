import {createAction,handleActions} from 'redux-actions'
import {Map,List} from 'immutable'
import socketIO from 'socket.io-client';

const LOGIN = "users/LOGIN";
const LOGOUT= "users/LOGOUT";
const CHANGEUSERCONFIG = "users/CHANGEUSERCONFIG";
const SETMODE = "users/SETMODE";
const CREATEUSER = "users/CREATEUSER";

export const LoginUser = createAction(LOGIN);
export const LogoutUser = createAction(LOGOUT);
export const ChangeUserConfig = createAction(CHANGEUSERCONFIG,data=>data);
export const SetMode = createAction(SETMODE);
export const CreateUser = createAction(CREATEUSER);

const initialState = Map({
    isLogin:false,
    userConfig:{
        id:'',
        pw:''
    },
    mode:false
})

export default handleActions({
    [LOGIN]:(state,payload) =>{
        return state.set('isLogin',true);
    },
    [LOGOUT]:(state,payload)=>{
        return state.set('isLogin',false);  
    },
    [CHANGEUSERCONFIG]:(state,payload)=>{
        const config = state.get('userConfig');
        config[payload.payload.id] = payload.payload.value;
        return state.set('userConfig',config);
    },
    [SETMODE]:(state,payload)=>{
        return state.set('mode',!state.get('mode'));
    },
    [CREATEUSER]:(state,payload)=>{
        return state.set('mode',false);
    }
},initialState);