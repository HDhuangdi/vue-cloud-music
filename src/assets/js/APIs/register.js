import axios from 'axios'
import {
    baseURL
} from '../config'

function getMsg(phone) {
    return new Promise(resolve => {
        axios.get(baseURL + "/captcha/sent", {
            params: {
                phone,
                withCredentials: true
            }
        }).then(result => resolve(result.data))
    })
}

function testMsg(phone, captcha) {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + "/captcha/verify", {
            params: {
                phone,
                captcha,
                withCredentials: true
            }
        }).then(result => resolve(result.data)).catch(err => reject(err.data))
    })
}

function existence(phone){
    return new Promise((resolve, reject) => {
        axios.get(baseURL + "/cellphone/existence/check", {
            params: {
                phone,
                withCredentials: true
            }
        }).then(result => resolve(result.data)).catch(err => reject(err.data))
    })
}

export {
    getMsg,
    testMsg,
    existence
}