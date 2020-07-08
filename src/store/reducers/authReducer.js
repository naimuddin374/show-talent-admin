import { SET_USER } from '../actions/types'
import jwtDecode from 'jwt-decode';

const init = {
    user: {},
    isAuth: false,
}

const authReducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER:
            {
                return {
                    ...state,
                    user: action.payload && Object.keys(action.payload).length ? jwtDecode(action.payload) : {},
                    isAuth: Object.keys(action.payload).length !== 0,
                }
            }
        default:
            return state
    }
}
export default authReducer
