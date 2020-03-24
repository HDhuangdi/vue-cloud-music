import axios from 'axios'
import {
    baseURL
} from '../config'

function searchSongs({keywords,offset = 0}) {
    return new Promise(resolve=>{
        axios.get(baseURL + '/search', {
            params: {
                keywords,
                limit: 20,
                type: 1,
                offset,
                withCredentials: true,
            }
        }).then(result=>{
            resolve(result.data)
        })
    })
}

export {
    searchSongs
}