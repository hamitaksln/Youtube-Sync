import { SET_USERS, SET_USERNAME } from "../actions/ActionTypes"

const INITIAL_STATE = {
    users: [],
    username: ""
}

const roomReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}

export default roomReducer
