import axios from 'axios'
import {
    baseURL
} from '../config'
import {
    Dialog
} from 'vant';

function login(phone, password) {
    return new Promise((resolve, reject) => {
        axios.interceptors.response.use(
            response => response,
            error => {
                const {
                    status
                } = error.response;
                if(status == 509) {
                    Dialog.alert({
                        message: '密码错误超过限制,请十分钟后重试'
                    })
                }else if (status == 501){
                    Dialog.alert({
                        message: '帐号不存在'
                    })
                }
                return reject(error);
            }
        );
        axios.get(baseURL + '/login/cellphone', {
            params: {
                phone,
                password,
                withCredentials: true
            }
        }).then(result => resolve(result.data))
    })
}

function getUserInfo(uid) {
    return new Promise(resolve => {
        axios.get(baseURL + '/user/detail', {
            params: {
                uid,
                withCredentials: true
            }
        }).then(result => resolve(result.data))
    })
}
export {
    login,
    getUserInfo
}