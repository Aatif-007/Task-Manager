import {toast} from 'react-toastify'

export const notify = (msg,type) => {
    toast[type](msg);
}

export const API_URL = "http://localhost:8000"