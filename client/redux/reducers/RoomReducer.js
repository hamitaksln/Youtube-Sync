import { SET_USERS, SET_USERNAME, SET_VIDEO_ID } from "../actions/ActionTypes"

const INITIAL_STATE = {
    users: [],
    username: "",
    videoId: null
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
        case SET_VIDEO_ID:
            return {
                ...state,
                videoId: action.payload
            }
        default:
            return state
    }
}

export default roomReducer
