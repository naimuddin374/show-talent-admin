import { SET_MESSAGE, API_URL } from './types'
import Axios from 'axios'

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
export const deleteData = id => dispatch => {
    Axios.delete(`${API_URL}api/user/${id}`)
        .then(res => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: res.data.message,
                }
            })
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: err.response.data.message,
                    type: 'error',
                }
            })
        })
}
