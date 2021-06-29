import { SET_USERS, SET_USERNAME, SET_VIDEO_ID } from "./ActionTypes"

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

export const setVideoId = (videoId) => {
    return {
        type: SET_VIDEO_ID,
        payload: videoId
    }
}
