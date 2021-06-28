import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import Room from "../../components/room"
import Header from "../../components/header"
import { initSocket } from "../../redux/actions/SocketActions"
import { setUsers } from "../../redux/actions/RoomActions"
import Router from "next/router"

const Rooms = () => {
    const socket = useSelector((state) => state.socketReducer.socket)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isRoomFound, setIsRoomFound] = useState(false)
    const { pid } = router.query

    useEffect(() => {
        if (socket === null) {
            dispatch(initSocket())
        }
    }, [])

    useEffect(() => {
        if (isRoomFound) {
        }
    }, [isRoomFound])

    useEffect(() => {
        if (socket && pid) {
            console.log(socket, pid)

            socket.on("check-if-room-exists", (isRoomFound) => {
                console.log(isRoomFound)
                if (isRoomFound) {
                    socket.emit("join-room", pid)
                }
                setIsRoomFound(isRoomFound)
            })

            if (!isRoomFound) {
                socket.emit("check-if-room-exists", pid)
            }
        }
    }, [socket, pid])

    return (
        <div className="w-full h-full flex flex-col">
            <Header><div onClick={() => Router.push("/")}>home</div></Header>
            {isRoomFound ? (
                <Room pid={pid}></Room>
            ) : (
                <div className="text-white">Room not found.</div>
            )}
        </div>
    )
}

export default Rooms
