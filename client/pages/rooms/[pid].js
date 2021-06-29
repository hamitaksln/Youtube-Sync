import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import Room from "../../components/room"
import Header from "../../components/header"
import { initSocket } from "../../redux/actions/SocketActions"
import { setVideoId } from "../../redux/actions/RoomActions"
import Router from "next/router"
import Head from "next/head"

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

        return () => dispatch(setVideoId(""))
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
        <div className="site-container">
            <Head>
                <title>Youtube SYNC</title>
                <meta
                    name="viewport"
                    content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <main className="w-full h-full flex flex-col">
                <div className="w-full h-16">
                    <Header></Header>
                </div>

                {isRoomFound ? (
                    <div className="w-full h-full bg-gray-500">
                        <Room pid={pid}></Room>
                    </div>
                ) : (
                    <div className="text-white">Room not found.</div>
                )}
            </main>
        </div>
    )
}

export default Rooms
