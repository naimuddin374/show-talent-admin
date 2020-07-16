import { SET_MESSAGE, API_URL } from './types'
import Axios from 'axios'


// Get Data
export const getPendingCount = () => async dispatch => {
    return Axios.get(`${API_URL}api/admin/pending/count`)
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
