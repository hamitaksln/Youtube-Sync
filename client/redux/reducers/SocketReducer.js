import { INIT_SOCKET } from "../actions/ActionTypes"

const INITIAL_STATE = {
    socket: null
}

const socketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_SOCKET:
            return {
                ...state,
                socket: action.socket
            }
        default:
            return state
    }
}

export default socketReducer
