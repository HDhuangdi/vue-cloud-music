import axios from 'axios'
import {
    baseURL
} from '../config'

function getBanner() {
    return new Promise(function (resolve, reject) {
        axios.get(baseURL + '/banner', {
            params: {
                type: 2,
                withCredentials: true
            }
        }).then(result => resolve(result.data))
    })
}

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
function getReommendSongs(){
    return new Promise(resolve=>{
        axios.get(baseURL+"/personalized/newsong",{
            params:{
                withCredentials: true
            }
        }).then(result=>resolve(result.data))
    })
}
function getRankList(idx){
    return new Promise(resolve=>{
        axios.get(baseURL+"/top/list",{
            params:{
                idx,
                withCredentials: true
            }
        }).then(result=>resolve(result.data.playlist.tracks))
    })
}
function getReommendFM(){
    return new Promise(resolve=>{
        axios.get(baseURL+"/personalized/djprogram",{
            params:{
                withCredentials: true
            }
        }).then(result=>resolve(result.data))
    })
}
export {
    getBanner,
    getReommendList,
    getReommendSongs,
    getRankList,
    getReommendFM
}