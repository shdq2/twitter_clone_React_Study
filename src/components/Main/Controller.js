import axios from 'axios';
import {config} from './../../share/databaseConfig'
const getCardList = async ()=>{
    let list = [];
    await axios.get(config.host+':'+config.port+'/card/cardList').then(res=>{
        const data = res.data;
        if(data.err){
            console.log(data.err);
            return;
        }
        list = data.result;
    })
    return list
}
const insertCardList = async (img,msg,user_id)=>{
    var result = {};

    await axios.post(config.host+':'+config.port+'/card/cardInsert',{img:img,msg:msg,user_id:user_id}).then(res=>{
        const data = res.data;
        if(data.err){
            console.log(data.err);
            return;
        }
        result["code"] = true;
    }).catch(err =>{
        console.log(err);
        result["code"] = false;
        result["errcode"] = err;
    });
    return result;
}

const removeCard = async (id)=> {
    var result = {};
    await axios.post(config.host+':'+config.port+'/card/cardDelete',{id:id}).then(res=>{
        if(res.data.err){
            console.log(res.data.err);
            return;
        }

        result["code"] = true;
    }).catch(err =>{
        result["code"] = false;
        result["errcode"] = err;
    });
    
    return result;
}
export {getCardList, insertCardList,removeCard};