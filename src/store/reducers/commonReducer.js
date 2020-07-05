import * as Types from '../actions/types'

const init = {
    message: null,
    type: null,
    time: null,
}

const commonReducer = (state = init, action) => {
    switch (action.type) {
        case Types.SET_MESSAGE:
            {
                return {
                    ...state,
                    message: action.payload.message,
                    type: action.payload.type || 'success',
                    time: new Date().toLocaleString(),
                }
            }
        default:
            return state
    }
}
export default commonReducer
