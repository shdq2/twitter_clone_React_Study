import axios from 'axios';
import {config} from './../../share/databaseConfig'
export const Login = async (id,pw)=>{
    var result;
    await axios.post(config.host+':'+config.port+'/user/login',{id:id,pw:pw}).then(res=>{
        if(res.data.err) {
            console.log(res.data.err);
            return;
        }
        result = res.data;        
    });

    return result;
}

export const CreateAccount = async (id,pw)=>{
    var result;
    await axios.post(config.host+':'+config.port+'/user/createAccount',{id:id,pw:pw})
    .then(res=>{
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