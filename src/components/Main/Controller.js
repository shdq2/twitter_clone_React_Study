import axios from 'axios';

const getCardList = async ()=>{
    let list = [];
    await axios.get('http://localhost:4000/card/cardList').then(res=>{
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
    await axios.post('http://localhost:4000/card/cardInsert',{img:img,msg:msg,user_id:user_id}).then(res=>{
        const data = res.data;
        if(data.err){
            console.log(data.err);
            return;
        }
        result["success"] = true;
    }).catch(err =>{
        result["success"] = false;
        result["errcode"] = err;
    });
    return result;
}

const removeCard = async (id)=> {
    var result = {};
    await axios.post('http://localhost:4000/card/cardDelete',{id:id}).then(res=>{
        if(res.data.err){
            console.log(res.data.err);
            return;
        }

        result["success"] = true;
    }).catch(err =>{
        result["success"] = false;
        result["errcode"] = err;
    });
    
    return result;
}
export {getCardList, insertCardList,removeCard};