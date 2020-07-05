import Axios from 'axios'

const setAuthToken = token => {
    Axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    if (token) {
        Axios.defaults.headers.common['Authorization'] = token
    } else {
        Axios.defaults.headers.common['Authorization'] = ''
    }
}

export default setAuthToken