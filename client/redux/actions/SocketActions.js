import { INIT_SOCKET } from "./ActionTypes"
import openSocket from "socket.io-client"
import { SERVER_URL } from "../../constants"

export const initSocket = () => {
    return (dispatch) => {
        dispatch({ type: INIT_SOCKET, socket: openSocket(SERVER_URL) })
    }
}
