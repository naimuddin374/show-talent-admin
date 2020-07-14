import { SET_MESSAGE, API_URL } from './types'
import Axios from 'axios'


// Get Data
export const getAllPost = () => async dispatch => {
    return Axios.get(`${API_URL}api/admin/post`)
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

// Get Detail Data
export const getPostDetail = (id) => async dispatch => {
    return Axios.get(`${API_URL}api/post/${id}`)
        .then(res => {
            console.log('res', res.data)
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

// Data Update
export const updateData = (data, id) => async dispatch => {
    return Axios.put(`${API_URL}api/post/${id}`, data)
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
    return Axios.delete(`${API_URL}api/post/${id}`)
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

// Data Approve
export const approveData = id => async dispatch => {
    return Axios.put(`${API_URL}api/post/approve/${id}`)
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

// Data Reject
export const rejectData = (id, data) => async dispatch => {
    return Axios.put(`${API_URL}api/post/reject/${id}`, data)
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
