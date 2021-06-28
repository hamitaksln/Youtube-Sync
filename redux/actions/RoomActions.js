import { SET_USERS, SET_USERNAME } from "./ActionTypes"

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
}
