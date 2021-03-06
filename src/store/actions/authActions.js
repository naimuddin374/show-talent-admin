import { SET_MESSAGE, API_URL, SET_USER } from './types'
import Axios from 'axios'
import setAuthToken from '../../util/setAuthToken'


// Login
export const login = data => async dispatch => {
    Axios.post(`${API_URL}api/auth/admin/login`, data)
        .then(res => {
            if (res.data.token) {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: res.data.message,
                        type: 'success',
                    }
                })

                let token = res.data.token
                localStorage.setItem('authToken', JSON.stringify(token))
                setAuthToken(token)
                dispatch({
                    type: SET_USER,
                    payload: token
                })
            }
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
        })
}


// Logout
export const logout = history => dispatch => {
    localStorage.removeItem('authToken')
    history.push('/')
    window.location.reload();
    dispatch({
        type: SET_USER,
        payload: {
            token: {},
            user: {}
        }
    })
    dispatch({
        type: SET_MESSAGE,
        payload: {
            message: 'Logout Successful',
            type: 'success',
        }
    })
}

// Refresh token
export const refreshToken = history => {
    Axios.get(`${API_URL}api/auth/token/refresh`)
        .then(res => {
            if (res.data.token) {
                let token = res.data.token
            } else {
                localStorage.removeItem('authToken')
                history.push('/')
                window.location.reload();
            }
        })
        .catch(err => {
            console.log('err', err.response)
            localStorage.removeItem('authToken')
            history.push('/')
            window.location.reload();
        })
}


