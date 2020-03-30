import axios from 'axios'
import {
    baseURL
} from '../config'

function getReommendList() {
    return new Promise(resolve => {
        axios.get(baseURL + "/personalized",{
            params:{
                limit:10,
                withCredentials: true
            }
        }).then(result=>resolve(result.data))
    })

}

function getLikeList(uid) {
    return new Promise(resolve => {
        axios.get(baseURL + '/user/playlist',{
            params:{
                uid,
                withCredentials: true
            }
        }).then(result=>resolve(result.data))
    })
}

export{
    getReommendList,
    getLikeList
}