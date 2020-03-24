import axios from 'axios'
import {
    baseURL
} from '../config'

function getList(id){
    return new Promise(resolve=>{
        axios.get(baseURL+'/playlist/detail',{
            params:{
                id,
                withCredentials: true
            }
        }).then(result=>resolve(result.data))
    })
}
export {
    getList
}