import axios from 'axios'
import {baseURL} from '../config'

function getURL(id){
    return new Promise(resolve=>{
        axios.get(baseURL + "/song/url",{
            params:{
                id,
                withCredentials: true
            }
        }).then(result=>resolve(result.data))
    })
}
export{
    getURL
}