import { SET_MESSAGE, API_URL } from './types'
import Axios from 'axios'

// Data Get
export const getAllUsers = () => async dispatch => {
    return Axios.get(`${API_URL}api/user`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
            return false
        })
}

// Data Get
export const getUserDetail = (id) => async dispatch => {
    return Axios.get(`${API_URL}api/user/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
            return false
        })
}

// Data Store
export const storeData = data => async dispatch => {
    return Axios.post(`${API_URL}api/user`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            return true
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
            return false
        })
}


// Data Update
export const updateData = (data, id) => async dispatch => {
    return Axios.put(`${API_URL}api/user/${id}`, data)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            return true
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
            return false
        })
}

// Data Delete
export const deleteData = id => async dispatch => {
    return Axios.delete(`${API_URL}api/user/${id}`)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
            return true
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
            return false
        })
}
