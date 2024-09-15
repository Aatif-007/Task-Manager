import {toast} from 'react-toastify'

export const notify = (msg,type) => {
    toast[type](msg);
}

export const API_URL = "https://task-manager-8yq1jqdho-aatifs-projects-f1d93106.vercel.app"
