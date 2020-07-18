import { SET_MESSAGE, API_URL } from './types'
import Axios from 'axios'

// Data Get
export const getAllPage = () => async dispatch => {
    return Axios.get(`${API_URL}api/page`)
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
export const getPageDetail = (id) => async dispatch => {
    return Axios.get(`${API_URL}api/page/${id}`)
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
    return Axios.post(`${API_URL}api/page`, data)
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
    return Axios.put(`${API_URL}api/page/${id}`, data)
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
export const deletePage = id => async dispatch => {
    return Axios.delete(`${API_URL}api/page/${id}`)
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
    return Axios.put(`${API_URL}api/page/approve/${id}`)
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
    return Axios.put(`${API_URL}api/page/reject/${id}`, data)
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

// Data Unpublished
export const pageUnpublished = id => async dispatch => {
    return Axios.put(`${API_URL}api/page/unpublished/${id}`)
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