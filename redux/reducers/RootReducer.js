import { combineReducers } from "redux"
import socketReducer from "./SocketReducer"
import roomReducer from "./RoomReducer"

const rootReducer = combineReducers({
    socketReducer,
    roomReducer
})

export default rootReducer
