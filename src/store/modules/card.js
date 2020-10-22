
import {createAction,handleActions} from 'redux-actions'
import {Map,List,fromJS} from 'immutable'

const TYPINGTEXT = "card/TYPINGTEXT";
const SETIMGURL = "card/IMGURL";
const INSERTCARD = "card/INSERTCARD";
const CARDLIST = "card/CARDLIST";
const REMOVECARD="card/REMOVECARD";

export const TypingText = createAction(TYPINGTEXT,value=>value)
export const SetImgUrl = createAction(SETIMGURL,url=>url);
export const InsertCard = createAction(INSERTCARD);
export const CardList = createAction(CARDLIST,list=>list);
export const RemoveCard = createAction(REMOVECARD,id => id);

const initialState = Map({
    typingText:'',
    img:'',
    cardList:List()
})

export default handleActions({
    [TYPINGTEXT]:(state,{payload:value})=>{
        return state.set('typingText',value);
    },
    [SETIMGURL]:(state,{payload:url})=>{
        return state.set('img',url);
    },
    [INSERTCARD]:(state,payload)=>{
        let item = Map({
            card_id:state.get('cardList').get(0).get('card_id')+1,
            card_msg:state.get('typingText'),
            card_img:state.get('img'),
            user_id:sessionStorage.getItem('id'),
            card_date:new Date()
        });
        let list = new List(state.get('cardList'));
        list = list.unshift(item);

        return state.set('img','').set('typingText','').set('cardList',fromJS(list));
    },
    [CARDLIST]:(state,{payload:list})=>{
        return state.set('cardList',fromJS(list));
    },
    [REMOVECARD]:(state,{payload:id})=>{
        const idx = state.get('cardList').findIndex(item => item.get('card_id') === id);
        var result = state.get('cardList').toJS().slice(0,idx).concat(state.get('cardList').toJS().slice(idx+1));
        
        return state.set('cardList',fromJS(result));
    }
},initialState);