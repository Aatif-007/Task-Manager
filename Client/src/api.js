import { API_URL } from "./utils"
import axios from 'axios';

export const CreateTask = async (taskObj) => {

    const url =  `${API_URL}/task`
    const options = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(taskObj)
    };
    try {
        const data = fetch(url,options)
        const result = (await data).json()
        console.log(result)
        return result
    } catch (error) {
        return error
    }
}

export const GetAllTask = async () => {
    const url = `${API_URL}/task`;
    
    try {
        // Perform a GET request using Axios
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;  // Return the data from the Axios response
        
    } catch (err) {
        return err;  // Handle any error that occurs
    }
};

export const DeleteTask = async (id) => {
    const url = `${API_URL}/task/${id}`
    
        const option = {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json"
            },
        }
    try {
        const result = await fetch(url,option)
        const data = await result.json()
        return data
    } catch (error) {
        return error
    }
}

export const updateTask =  async(id,reqBody) => {
    const url = `${API_URL}/task/${id}`

    const option = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(reqBody)
    }
    try {
        const response = await fetch(url,option)
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}