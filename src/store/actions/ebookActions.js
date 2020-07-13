import { SET_MESSAGE, API_URL } from './types'
import Axios from 'axios'

// Get Data
export const getAllBook = () => async dispatch => {
    return Axios.get(`${API_URL}api/admin/ebook`)
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

// Get Data
export const getBookDetail = (id) => async dispatch => {
    return Axios.get(`${API_URL}api/ebook/${id}`)
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

// Data Update
export const updateData = (data, id) => async dispatch => {
    return Axios.put(`${API_URL}api/ebook/${id}`, data)
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
    return Axios.delete(`${API_URL}api/ebook/${id}`)
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
    return Axios.put(`${API_URL}api/ebook/approve/${id}`)
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
    return Axios.put(`${API_URL}api/ebook/reject/${id}`, data)
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


// Update Cover Photo 
export const updateCoverPhoto = (data, id) => async dispatch => {
    return Axios.put(`${API_URL}api/ebook/cover/photo/${id}`, data)
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
                    message: err.response && err.response.data.message,
                    type: 'error',
                }
            })
            return false
        })
}
